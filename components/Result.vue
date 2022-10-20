<template>
  <div>
    <Modal>
      <template #btntitle>
        <span>
          <svg class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </span>
      </template>
      <template #modalbody>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black"></h3>
        <!-- {{ taskid }} -->
        <!-- {{ task }} -->
        <!-- {{ taskapi }} -->
        <div v-for="t in taskapi" :key="t.id">
          {{ t.title }}
        </div>
        <div v-for="u in userapi" :key="u.id">
          {{ u.firstName }} {{ u.lastName }}
        </div>
        <div v-for="e in evaluatorapi" :key="e.id">
          {{ e.firstName }} {{ e.lastName }}
        </div>
        <div v-for="r in filtered" :key="r.id" class="p-4 border-b p-2">
          <template v-for="q in qadesmg.parent.filter(i => i.id == r.id)" :key="q.id">
              <span class="font-medium">{{ q.title }}</span>
            <div >
              <div v-for="i in r.child.map(i => i.cid)" :key="i" class="flex justify-between items-end">
                <div v-for="c in q.children.filter(c => c.id === i)" :key="c.id" class="px-4">
                  {{c.title}}
                </div>
                <div v-if="filtered.some(i => i.id == 3 || i.id == 4)">
                  {{ r.child.filter(c => c.cid == i).map(v => v.val)[0] }}
                </div>
                <div v-else>
                  <Ratingresult 
                    class="" 
                    :grade="r.child.filter(c => c.cid == i).map(v => v.val)[0]" 
                    :maxstars="5" 
                    :hascounter="false" 
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <!-- <template #savebtn>
        <button @click.prevent="saveUser" 
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
        Re-evaluate
        </button>
      </template> -->
    </Modal>
  </div>
</template>

<script>
  import store from '~~/store';
  import axios from 'axios';

  export default {
    name: "Result",
    data() {
      return {}
    },
    props: {
      taskid: String,
      checker: String,
      result: Object,
    },
    setup(props) {
      const task = ref([]);
      const taskapi = ref([]);
      const userapi = ref([]);
      const evaluatorapi = ref([]);

      const qadesmg = store.state.qadesmg.data;

      store.dispatch('getQAinDB').then((r) => {
        task.value = r.data.filter(i => i.ticket_id == props.taskid)
        console.log(r.data.filter(i => i.ticket_id == props.taskid))
      });

      store.dispatch('getTask', props.taskid).then((r) => {
        taskapi.value = r.data.data

        const resId = r.data.data.map(i => i.responsibleIds)[0];
        store.dispatch('getUserData', resId).then((r) => {
          userapi.value = r.data.data
        });
      });

      store.dispatch('getUserData', props.checker).then((r) => {
        evaluatorapi.value = r.data.data
      });

      // const taskid = props.result.map(i => i.id)
      // const filtered = new Map(props.result.map(i => [i.id,i]));
      // console.log([...filtered.values()]);

      console.log(props.result)
      console.log(props.result.length)

      const filtered = props.result.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);

        if(!x) {
          current.child = [current.child]
          acc.push(current);
        } else {
          x.child.push(current.child);
        }
        return acc;
      }, []);
      console.log('filtered')
      console.log(filtered)

      return { task, taskapi, userapi, evaluatorapi, qadesmg, filtered }
    },
    computed: {
      // filteredtask() {
      //   const taskid = this.result.reduce((p, c) => {
      //     p[c.id] = c;
      //     return p;
      //   }, {});
      //   return Object.values(taskid).sort((a, b) => a.id.localeCompare(b.id));
      // },
    },
    methods: {}
  }
</script>