<template>
  <div>
    <NuxtLayout :users="users" >
      <div class="relative">
        <div class="flex justify-end items-center pb-4 bg-white">
          <Listbox :options="datearr" @selectedarr="selectedarr" />
          <ComboBox :options="querybrands" :placeholder="`Brands`" @selectedtitle="fetchbranch" class="w-[250px]" />
          <button @click.prevent="filter(branchid, selecteddate)" 
          type="submit" 
          class="text-white 
            bg-teal-700 
            hover:bg-teal-800 
            focus:ring-2 
            focus:outline-none 
            focus:ring-teal-300 
            font-medium 
            rounded-lg 
            text-sm 
            px-5 
            py-2.5 
            mt-2
            mx-3
            text-center 
            dark:bg-teal-600 
            dark:hover:bg-teal-700 
            dark:focus:ring-teal-500"
        >
          Filter
        </button>
        </div>
        <Tasks :users="users" :iatasks="iatasks" :tasksorted="tasksorted" :qadb="qadb" :grpName="grpName" :user_brands="user_brands" :nofound="nofound" />
        <div class="text-center p-4 text-base text-gray-500">{{nofound}}</div>
        <!-- <NuxtLink :to="`/review/${user_id}`" class="font-medium text-purple-600 dark:text-purple-500 hover:underline">Review</NuxtLink> -->
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '../../store';
  import { computed } from 'vue';
  import axiosClient from '~~/axios';
  import moment from 'moment';
  
  export default {
    layout: 'default',
    name: 'UserList',
    data() {
      return {
        users: [],
        iatasks: [],
        tasksorted: [],
        cf: [],
        folders: [],
        timer: "",
        nofound: "",
        grpName: "",
        week_start_date: "",
        week_end_date: "",
        selecteddate: [],
        branchid: "",
      };
    },
    props: {
      userdb: Object,
    },
    setup() {
      //db datas
      const user_id = computed(() => store.state.user.id);
      const user_grpId = computed(() => store.state.user.group_id);
      const user_role = computed(() => store.state.user.role);
      const user_brands = computed(() => store.state.user.brands); 

      const dateOptions = [
        { title: 'Today' },
        { title: 'This Week' },
        { title: 'This Month' },
        // { title: 'Later than this month' },
      ];
      console.log(dateOptions)

      const qadb = ref([]);
      onMounted(async () => {
        const res = await axios.get('http://localhost:8000/review');
        qadb.value = res.data.filter(i => i.group_id === store.state.user.group_id);
      });

      const querybrands = computed(() => {
        console.log(store.state.user.brands.split(','));
        const brand = store.state.user.brands.split(',');
        const brandArr = [];
        for(let i = 0; i < brand.length; i++) {
          const obj = {
            id: i,
            title: brand[i]
          };
          brandArr.push(obj)
        }
        console.log(brandArr)
        return brandArr
      })

      const today = new Date().toISOString().slice(0, 10);
      const montharr = [];
      const datearr = ref([]);
        for(let i = 0; i < 12; i++) {
          const obj = {
            title: moment().format('MMMM') == moment().subtract([i], 'month').format('MMMM') ? 'This month' : moment().subtract([i], 'month').format('MMMM'),
            start: moment().startOf('month').subtract([i], 'month').format('YYYY-MM-DD'),
            end: moment().subtract([i], 'months').endOf('month').format('YYYY-MM-DD')
          };
          montharr.push(obj)
        }
        const current = [{title: 'Today', start: today, end: ''}];
        const currentweek = [{title: 'This week', start: moment().startOf('week').format('YYYY-MM-DD'), end: moment().endOf('week').format('YYYY-MM-DD')}];
        datearr.value = current.concat(currentweek, montharr);
        console.log('month')
        console.log(datearr.value)

      return { 
        user_id, 
        user_grpId, 
        user_role, 
        user_brands, 
        dateOptions,
        qadb,
        querybrands,
        datearr
      }
    },
    created() {
      this.thisweek();
      this.fetchTasks();
      this.timer = setInterval(this.fetchTasks, 50000);
    },
    mounted() {},
    computed: {
      // querybrands() {
      //   console.log(this.user_brands.split(','));
      //   const brand = this.user_brands.split(',');
      //   const brandArr = [];
      //   for(let i = 0; i < brand.length; i++) {
      //     const obj = {
      //       id: i,
      //       title: brand[i]
      //     };
      //     brandArr.push(obj)
      //   }
      //   console.log(brandArr)
      //   return brandArr
      // },
    },
    watch: {
      // selecteddate() {
      //   this.selecteddate;
      //   console.log('watch')
      //   console.log(this.selecteddate)
      // }
    },
    methods: {
      selectedarr(arr) {
        // return this.selecteddate = arr;
        console.log('selectedarr')
        // console.log(arr)
        this.selecteddate = arr;
        if(arr.title != 'Today') {
              console.log('not today ' + arr.title)
              console.log(this.selecteddate)
            } else {
              console.log('today '  + arr.title)
              this.fetchTasks();
            }
      },
      selectbrand(id) {
        console.log(this.tasksorted.filter(c => c.customFields.some(v => v.value.includes(id))))
        this.tasksorted = this.tasksorted.filter(c => c.customFields.some(v => v.value.includes(id)))
      },
      thisweek() {
        const today = moment();
        const from_date = today.startOf('week').format('YYYY-MM-DD');
        const to_date = today.endOf('week').format('YYYY-MM-DD');

        const from_month = today.startOf('month').format('YYYY-MM-DD');
        const to_month = today.endOf('month').format('YYYY-MM-DD');

        this.week_start_date = from_date;
        this.week_end_date = to_date;
        console.log({
          from_month: from_month.toString(),
          today: moment().toString(),
          to_month: to_month.toString(),
        });
      },
      fetchbranch(id){
        console.log(id)
        this.branchid = id
      },
      fetch(brid, query) {
        // if(enddate == '') {
        //   this.query = `tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate=${today}&customStatuses=["IEADVMHZJMBRONOY"]`;
        //   console.log(startdate, 'start')
        // } else {
        //   this.query = `tasks?responsibles=[${userid}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate={"start":"${startdate}","end":"${enddate}"}&customStatuses=["IEADVMHZJMBRONOY"]`;
        //   console.log('enddate')
        // }
        axiosClient.get(query)
            .then((res) => {
              const taskId = res.data.data.map((i) => i.id);
              console.log(res.data.data)

              if(res.data.data.length === 0) {
                this.nofound = "No task to review."
              } else {
                store.dispatch('getTask', taskId)
                  .then((res) => {
                    const tasks = res.data.data;
                    // this.iatasks = tasks.filter((s) => s.customStatusId === "IEADVMHZJMBRONOY");
                    this.iatasks = res.data.data;
                    if(this.iatasks.length === 0) {
                      this.nofound = "No task to review."
                    }
                    console.log('iatasks')
                    console.log(this.iatasks)
                    // console.log(this.iatasks.map((sp) => sp.superParentIds))

                    const folderIds = this.iatasks.map((sp) => sp.superParentIds);
                    // const folderIdsnull = this.iatasks.filter((sp) => sp.superParentIds == "");
                    const parent = this.iatasks.map((sp) => sp.parentIds);
                    const FolderArr = [];
                    const sampleArr = [];
                    for (let f = 0; f < folderIds.length; f++) {
                      if(folderIds[f].length == 0 && parent[f] != "IEADVMHZI7777777") {
                        // console.log(parent[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${parent[f]}` || `tasks/${parent[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      } else {
                        // console.log(folderIds[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${folderIds[f]}` || `tasks/${folderIds[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      }
                    }
                    Promise.all(FolderArr).then((res) => {
                      if(brid != '') {
                        console.log('jhdsfjhdsf')
                        this.folders = res.flat();
                        const cf = this.folders.filter(c => c.customFields != ("" || undefined || null));
                        const br = this.user_brands.split(',');
                        const BrandSorted = [];
                        for(let b = 0; b < br.length; b++) {
                          BrandSorted.push(cf.filter(c => c.customFields.some(v => v.value.includes(br[b]))))
                        }
                        Promise.all(BrandSorted).then((res) => {
                          if(brid == ("" || undefined || null)) {
                            this.tasksorted = res.flat();
                            if(this.tasksorted == 0) {
                              this.nofound = "No task to review."
                            } else {
                              this.nofound = ""
                            }
                          } else {
                            this.tasksorted = res.flat().filter(c => c.customFields.some(v => v.value.includes(brid)));
                            if(this.tasksorted == 0) {
                              this.nofound = "No task to review."
                            } else {
                              this.nofound = ""
                            }
                          }
                          console.log('tasksorted')
                          console.log(this.tasksorted)
                        })
                      } else {
                        this.tasksorted = res.flat();
                        if(this.tasksorted == 0) {
                          this.nofound = "No task to review."
                        } else {
                          this.nofound = ""
                        }
                      }
                    })
                  })
                }
              })
      },
      filter(id, arr) {
        console.log('filter')
        console.log(arr.title)

        if(arr.title == 'Today') {
          // this.fetchTasks();
          console.log(arr)
        } else {
          console.log(this.users.map((i) => i.id))
          const userids = this.users.map((i) => i.id);
          const query = `tasks?responsibles=[${userids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate={"start":"${arr.start}","end":"${arr.end}"}&customStatuses=["IEADVMHZJMBRONOY"]`;

          this.fetch(id, query);
        }
      },
      fetchTasks() {
        store.dispatch('getGroup', this.user_grpId).then((r) => {
          this.grpName = r.data.data.map((t) => t.title).toString();
          const userIds = r.data.data.map((id) => id.memberIds).flat();
          const roleDB = this.userdb.filter((i) => i.user_id === this.user_id).map((r) => r.role);
          const teamlead = this.userdb.filter((i) => i.group_id === this.user_grpId && i.role === 2 ).map((i) => i.user_id)[0];
          
          if(userIds.indexOf(this.user_id) !== -1 && roleDB == 2) { //tl
            userIds.splice(userIds.indexOf(this.user_id), 1)
          } else if (userIds.indexOf(this.user_id) !== -1 && roleDB == 3) {
            userIds.splice(userIds.indexOf(teamlead), 1)
          }

          const UserArr = [];
          for (let u = 0; u < userIds.length; u++) {
            UserArr.push(
              store.dispatch('getUserData', userIds[u])
                .then((r) => new Promise((res) => res(r.data.data))
              )
            );
          }
          Promise.all(UserArr).then((r) => {
            this.users = r.flat();
            console.log(this.users.map((i) => i.id))
            const ids = this.users.map((i) => i.id);
            const today = new Date().toISOString().slice(0, 10);
            const startDate = '2022-09-01'; //yy-mm-dd
            const endDate = today;
            const query = `tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate=${today}&customStatuses=["IEADVMHZJMBRONOY"]`;

            this.fetch(null, query);
            

            // axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate={"start":"${startDate}","end":"${endDate}"}&customStatuses=["IEADVMHZJMBRONOY"]`)
            // axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate=${today}&customStatuses=["IEADVMHZJMBRONOY"]`)
            //   .then((res) => {
            //     const taskId = res.data.data.map((i) => i.id);
            //     console.log(res.data.data)

            //     if(res.data.data.length === 0) {
            //       this.nofound = "No task to review."
            //     } else {
            //       axiosClient.get(`tasks/${taskId}`)
            //       .then((res) => {
            //         const tasks = res.data.data;
            //         // this.iatasks = tasks.filter((s) => s.customStatusId === "IEADVMHZJMBRONOY");
            //         this.iatasks = res.data.data;
            //         if(this.iatasks.length === 0) {
            //           this.nofound = "No task to review."
            //         }
            //         console.log('iatasks')
            //         console.log(this.iatasks)
            //         // console.log(this.iatasks.map((sp) => sp.superParentIds))

            //         const folderIds = this.iatasks.map((sp) => sp.superParentIds);
            //         // const folderIdsnull = this.iatasks.filter((sp) => sp.superParentIds == "");
            //         const parent = this.iatasks.map((sp) => sp.parentIds);
            //         const FolderArr = [];
            //         const sampleArr = [];
            //         for (let f = 0; f < folderIds.length; f++) {
            //           if(folderIds[f].length == 0 && parent[f] != "IEADVMHZI7777777") {
            //             // console.log(parent[f])
            //             FolderArr.push(
            //               axiosClient.get(`folders/${parent[f]}` || `tasks/${parent[f]}`)
            //                 .then((r) => new Promise((res) => res(r.data.data[0])))
            //             )
            //           } else {
            //             // console.log(folderIds[f])
            //             FolderArr.push(
            //               axiosClient.get(`folders/${folderIds[f]}` || `tasks/${folderIds[f]}`)
            //                 .then((r) => new Promise((res) => res(r.data.data[0])))
            //             )
            //           }
            //         }
            //         Promise.all(FolderArr).then((res) => {
            //           this.tasksorted = res.flat();
            //           // const cf = this.folders.filter(c => c.customFields != ("" || undefined || null));
            //           // // console.log('folders')
            //           // // console.log(this.folders)
            //           // // console.log(cf)
            //           // const br = this.user_brands.split(',');
            //           // // const br = this.sbrand;
            //           // const BrandSorted = [];
            //           // for(let b = 0; b < br.length; b++) {
            //           //   BrandSorted.push(cf.filter(c => c.customFields.some(v => v.value.includes(br[b]))))
            //           // }
            //           // Promise.all(BrandSorted).then((res) => {
            //           //   if(brId == ("" || undefined || null)) {
            //           //     this.tasksorted = res.flat();
            //           //     if(this.tasksorted == 0) {
            //           //       this.nofound = "No task to review."
            //           //     } else {
            //           //       this.nofound = ""
            //           //     }
            //           //   } else {
            //           //     this.tasksorted = res.flat().filter(c => c.customFields.some(v => v.value.includes(brId)));
            //           //     if(this.tasksorted == 0) {
            //           //       this.nofound = "No task to review."
            //           //     } else {
            //           //       this.nofound = ""
            //           //     }
            //           //   }
            //           //   console.log('tasksorted')
            //           //   console.log(this.tasksorted)
            //           // })
            //         })
            //       })
            //     }
            //   })
          });
        });
      },
      cancelAutoUpdate(){
        clearInterval(this.timer);
      },
    },
    beforeUnmount() {
      this.cancelAutoUpdate();
    }
  }
  </script>

<style>

</style>