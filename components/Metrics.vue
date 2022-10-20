<template>
  <div>
    <div v-if="selectedid && selectedid != 5" class="m-auto"> 
      {{selectedid}}
      <div class="grid mb-8 rounded-lg shadow-sm md:mb-2 md:grid-cols-2">
        <figure v-for="qa in qadesmg.parent.filter(c => c.default == 1)"
          :key="qa.id" 
          class="flex justify-center items-center p-5 text-center bg-white rounded-t-lg border border-gray-200"
          :class="`pointer-events-${qa.pen}`"
        >
          <blockquote class="w-full mx-auto max-w-2xl text-gray-500">
            <h3 class="text-lg font-semibold text-gray-900">{{qa.title}}</h3>
            <ul class="my-4 font-light">
              <li v-for="c in qa.children"
                :key="c.id" 
                class="border-b border-gray-200 last:border-b-0 py-3"
              >
                {{c.title}}
                <RadioGroup 
                  :options="defchoices" 
                  @checked="checkeddef($event, qa.id, c.id)" 
                />
              </li>
            </ul>
          </blockquote>  
        </figure>
        <figure v-for="qa in qadesmg.parent.filter(i => i.id === selectedid)"
          :key="qa.id" 
          class="flex justify-center items-center p-5 text-center bg-white rounded-t-lg border border-gray-200"
          :class="`pointer-events-${qa.pen}`"
        >
          <blockquote class="w-full mx-auto max-w-2xl text-gray-500">
            <h3 class="text-lg font-semibold text-gray-900">{{qa.title}}</h3>
            <ul class="my-4 font-light">
              <li v-for="c in qa.children"
                :key="c.id" 
                class="border-b border-gray-200 last:border-b-0 py-3"
              >
                {{c.title}}
                <RadioGroup 
                  :options="defchoices" 
                  class="m-auto" 
                  @checked="checkeddef($event, qa.id, c.id)" 
                />
              </li>
            </ul>
          </blockquote>  
        </figure>
      </div>
      <div class="flex justify-between">
        <button @click.prevent="savegrade" 
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
            text-center 
            dark:bg-teal-600 
            dark:hover:bg-teal-700 
            dark:focus:ring-teal-800"
        >
          Save
        </button>
        Total: {{Math.round(total)}}
      </div>
    </div>
    <div v-if="selectedid == 5">
      {{selectedid}}
      <div class="grid mb-8 rounded-lg shadow-sm md:mb-2 md:grid-cols-3">
        <template v-for="qa in qadesmg.parent.filter(c => c.id == 5)"
          :key="qa.id" 
        >
          <figure v-for="c in qa.children"
            :key="c.id" 
            class="flex justify-center items-center p-5 text-center bg-white rounded border border-gray-200"
          >
            <blockquote class="w-full mx-auto max-w-2xl text-gray-500">
              <h3 class="text-lg font-semibold text-gray-900">{{c.title}}</h3>
              <ul class="my-4 font-light">
                <li v-for="ch in c.children"
                  :key="ch.id" 
                  class="border-b border-gray-200 last:border-b-0 py-3"
                >
                  {{ch.title}}
                  <div class="flex">
                    <Rating 
                      class="m-auto" 
                      :grade="grade" 
                      :maxstars="maxstars" 
                      :hascounter="true" 
                      @rate="checkrate($event, c.id, ch.id)" 
                    />
                  </div>
                </li>
              </ul>
            </blockquote>  
          </figure>
        </template>
      </div>
      <div class="flex justify-between">
        <button @click.prevent="savegrade" 
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
            text-center 
            dark:bg-teal-600 
            dark:hover:bg-teal-700 
            dark:focus:ring-teal-800"
        >
          Save
        </button>
        Total: {{Math.round(total)}}
      </div>
    </div>
    <!-- {{opsarr}} -->
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '~~/store';

  export default {
    props: {
      taskid: String,
      responsibleId: String,
      brand: String,
      selectedid: Number,
      selectedarr: Object
    },
    setup(props) {
      const user_id = store.state.user.id;
      const user_grpId = store.state.user.group_id;

      const qadesmg = store.state.qadesmg.data;
      const opsarr = ref({"ops":[]}); 
      const defchoices = [
        { id: 0, title: "Yes" },
        { id: 1, title: "No" },
        { id: 2, title: "N/A" },
      ];
      const checkedops = ref([]);
      const total = ref(0);
      const value = ref(3);

      const maxstars = ref(5);
      const grade = ref(0);
      const ratearr = ref({"ops":[]});
      // 100-((maxstars-val)*7.5)
      function checkrate(val, pcid, chid) {
        const totalper = props.selectedarr.filter(i => i.id === 5).map(ch => ch.children)[0].filter(c => c.id == pcid).map(t => t.total)[0];
        const childlen = props.selectedarr.filter(i => i.id === 5).map(ch => ch.children)[0].filter(c => c.id == pcid).map(child => child.children.length)[0];
        console.log(((totalper/childlen)/maxstars.value)*val)
        if(opsarr.value.ops.map(i => i.id).includes(pcid)) {
          if(opsarr.value.ops.filter(i => i.id == pcid).map(ch => ch.child).map(c => c.cid).includes(chid)) {
            console.log(opsarr.value.ops.filter(i => i.id == pcid).map(ch => ch.child).filter(c => c.cid == chid && (c.val = val) && (c.per = (((totalper/childlen)/maxstars.value)*val))))
          } else {
            console.log(opsarr.value.ops.push({id: pcid, child: {cid: chid, val: val, per: (((totalper/childlen)/maxstars.value)*val)}}))
          }
        } else {
          console.log(opsarr.value.ops.push({id: pcid, child: {cid: chid, val: val, per: (((totalper/childlen)/maxstars.value)*val)}}))
        }
        total.value = opsarr.value.ops.map(ch => ch.child).reduce((acc, o) => acc + (o.per), 0)
        console.log(opsarr.value)
      }

      function checkeddef(val, pid, chid) {
        const totalper = props.selectedarr.filter(i => i.id === pid).map(t => t.total)[0];
        const childlen = props.selectedarr.filter(i => i.id == pid).map(c => c.children.length)[0]
        console.log(totalper)
        console.log(childlen)

        if(opsarr.value.ops.map(i => i.id).includes(pid)) {
          if(opsarr.value.ops.filter((i) => i.id == pid).map(ch => ch.child).map(c => c.cid).includes(chid)) {
            opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.cid == chid && (c.val = val))

            if(val == 'Yes') {
              opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.cid == chid && (c.val = val) && (c.per = (totalper/childlen)))
            } else if(val == 'No') {
              opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.cid == chid && (c.val = val) && (c.per = 0))
            } else if (val == 'N/A') {
                opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.cid == chid && (c.val = val) && (c.per = (totalper/childlen)))
            }
          } 
          else {
            if(val == 'Yes') {
              opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: (totalper/childlen)}})
            } else if (val == 'No') {
              opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: 0}})
            } else if (val == 'N/A') {
              opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: (totalper/childlen)}})
            }
          }
        } else {
          if(val == 'Yes') {
            opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: (totalper/childlen)}})
          } else if (val == 'No') {
            opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: 0}})
          } else if (val == 'N/A') {
            opsarr.value.ops.push({id: pid, child: {val: val, cid: chid, per: (totalper/childlen)}})
          }
        }
        console.log(opsarr.value)
        const nacount = opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.val == 'N/A').length
        console.log(nacount)
        if(nacount == childlen) {
          opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.val == 'N/A' && (c.per = 0))
          props.selectedarr.filter(i => i.id != pid && (i.total = ((i.total/(100-totalper)*100))))
        } else {
          opsarr.value.ops.filter(i => i.id == pid).map(ch => ch.child).filter(c => c.cid == chid && c.val == 'N/A' && (c.per = (totalper/childlen)))
        }
        total.value = opsarr.value.ops.map(ch => ch.child).reduce((acc, o) => acc + (o.per), 0)
        console.log(props.selectedarr)
      }

      const route = useRoute();
      console.log(route.params.id)

      const savegrade = async() => {
        const router = useRouter();
        const data = {
          ticket_id: route.params.id,
          responsibleIds: props.responsibleId,
          checker: user_id,
          group_id: user_grpId,
          brand: props.brand,
          grade_array: JSON.stringify(opsarr.value),
          qatype_id: props.selectedid,
          date: new Date()
        };

        const datalog = {
          ticket_id: route.params.id,
          // changed_from: "-",
          grade_array: JSON.stringify(opsarr.value),
          responsibleIds: user_id,
          date: new Date()
        }

        try{
          await axios.post(`http://localhost:8000/review/${route.params.id}`, data, datalog);
          // await axios.post(`http://localhost:8000/review/${route.params.id}`, datalog);
          console.log('savelog');
          router.push('/task');
        } catch(err) {
          console.log(err);
        }

        // try{
        //   await axios.post(`http://localhost:8000/review/${route.params.id}`, datalog);
        //   console.log('save');
        //   router.push('/task');
        // } catch(err) {
        //   console.log(err);
        // }
        
        console.log('save');
      }

      return { 
        user_id,
        user_grpId,
        qadesmg,
        defchoices,
        checkeddef,
        checkedops,
        opsarr,
        total,
        value,
        checkrate,
        maxstars,
        grade,
        savegrade,
        ratearr
      }
    }
  }
</script>

<style></style>