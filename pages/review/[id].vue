<template>
  <div>
    <NuxtLayout>
      <p>{{ taskid }}</p>
      <div class="flex items-center">
        <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Internal Review
      </div>
      <p>{{ grpname }}</p>
      <div v-for="t in task" :key="t.id">
        <p>{{ t.permalink.split("/open.htm?id=").slice(-1)[0] }}</p>
        <p><a :href="t.permalink">{{ t.title }}</a></p>
        <p v-for="r in responsible" :key="r.id">
          {{ r.firstName }} {{ r.lastName }}
        </p>
        <p v-for="u in user_api" :key="u.id">
          {{ u.firstName }} {{ u.lastName }}
        </p>
        <p>{{brand}}</p>
        <ComboBox 
          :options="options" 
          :placeholder="`Type of QA`"
          class="w-[300px]"
          @selectedid="selectedqaid" 
        />
      </div>
      <div class="w-10/12 mx-auto my-3">
        <Metrics 
          :taskid="taskid" 
          :responsibleId="responsible.map(i => i.id)[0]"
          :brand="brand.toString()"
          :selectedid="selectedid" 
          :selectedarr="selectedarr" 
        />
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import axiosClient from '~~/axios';
  import store from '../../store';

  export default {
    data() {
      return {}
    },
    setup() {
      // const url = "http://localhost:3000/review/IEADVMHZKQ44CHFC"
      // const strs = url.split('/');
      // const taskid = strs.at(-1)
      // console.log(taskid)
      // const taskid = useRoute().query.taskid
      // const route = useRoute();
      // const taskid = route.params.id
      // console.log('id')
      // console.log(route.params.id)
      const route = useRoute();
      const taskid = route.params.id;
      console.log(useRoute())
      const user_api = computed(() => store.state.userAPI.data);
      const user_grpId = computed(() => store.state.grp.data);
      const task = ref([]);
      const responsible = ref([]);
      const grpname = ref();
      const folder = ref([]);
      const brand = ref([]);

      Promise.resolve(store.dispatch('getTask', taskid)).then(r => {
        const data = r.data.data;
        task.value = data;
        const superparent = data.map((s) => s.superParentIds)[0];
        const parent = data.map((p) => p.parentIds)[0];
        const responsibleid = data.map((r) => r.responsibleIds)

        if (superparent.length == 0 && parent != "IEADVMHZI7777777") {
          Promise.resolve(store.dispatch('getFolder', parent)).then(r => {
            folder.value = r.data.data;
            brand.value = r.data.data.map((c) => c.customFields)[0].filter((i) => i.id == 'IEADVMHZJUABUJGM').map((v) => v.value)[0];
          })
        } else {
          Promise.resolve(store.dispatch('getFolder', superparent)).then(r => {
            folder.value = r.data.data;
            brand.value = r.data.data.map((c) => c.customFields)[0].filter((i) => i.id == 'IEADVMHZJUABUJGM').map((v) => v.value)[0];
          })
        }

        axiosClient.get(`/contacts/${responsibleid}`).then((r) => {
          responsible.value = r.data.data
          console.log(r.data.data)
        })
      })
      const grp = store.dispatch('getGroup', store.state.user.group_id)
      Promise.resolve(grp).then(r => {
        grpname.value = r.data.data.map((t) => t.title)[0]
        console.log(r.data.data)
      })

      const qadesmg = store.state.qadesmg.data;
      const grpid = store.state.user.group_id;
      const options = ref([]);
      const selectedid = ref();
      const selectedarr = ref([]);

      if(grpid === 'KX724M7F') {
        console.log('motion')
        options.value = qadesmg.parent.filter(c => c.default != 1)
      } else if (grpid === 'KX724M7I') {
        console.log('designers')
        options.value = qadesmg.parent.filter(c => c.default != 1 && c.id == 5 )
      } else if (grpid === 'KX724IUQ') {
        console.log('dev')
      }

      function selectedqaid(id) {
        selectedid.value = id
        const def = qadesmg.parent.filter(i => i.default === 1)
        const sel = qadesmg.parent.filter(i => i.id === id)
        selectedarr.value = def.concat(sel)
        console.log(def.concat(sel))
      }

      return { 
        taskid, 
        task, 
        responsible, 
        user_api,
        user_grpId,
        grpname,
        folder,
        brand,
        qadesmg,
        grpid,
        options,
        selectedqaid,
        selectedid,
        selectedarr
      }
    }
  }
</script>

<style></style>