<template>
  <div>
    <NuxtLayout>
      <Table>
        <template #theader>
          <tr>
            <th scope="col" class="py-3 px-6">Date Reviewed</th>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Ticket</th>
            <th scope="col" class="py-3 px-6">Brand</th>
            <th scope="col" class="py-3 px-6"></th>
            <th scope="col" class="py-3 px-6">Status</th>
            <th></th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="q in qadb" 
            :key="q.idtr" 
            class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 text-gray-500"
          >
            <td class="py-4 px-6">
              {{ date(q.date) }}
            </td>
            <td scope="row" 
              class="flex items-center py-4 px-6 text-gray-700 whitespace-nowrap"
            >
              <!-- {{q.responsibleIds}} -->
              <img class="w-8 h-8 rounded-full" :src="[...new Set(users.filter((i) => i.id === q.responsibleIds).map(n => n.avatarUrl))].toString()" alt="" />&nbsp;
              {{[...new Set(users.filter((i) => i.id === q.responsibleIds).map(n => n.firstName))].toString()}}
              {{[...new Set(users.filter((i) => i.id === q.responsibleIds).map(n => n.lastName))].toString()}}
              <!-- <span v-for="u in users.filter((i) => i.id === q.responsibleIds)" :key="u.id" class="flex items-center">
                <img class="w-8 h-8 rounded-full" :src="u.avatarUrl" alt="" />&nbsp;
                {{ u.firstName }} {{ u.lastName }}
              </span> -->
            </td>
            <td class="py-4 px-6">
              <!-- {{q.ticket_id}} -->
              <span v-for="t in tasks.filter(i => i.id == q.ticket_id)" :key="t.id">
                {{ t.title }}
              </span>
            </td>
            <td class="py-4 px-6">
              {{q.brand}}
            </td>
            <td class="py-4 px-6">
              {{ Math.round(JSON.parse([q.grade_array]).ops.map(ch => ch.child).reduce((acc, o) => acc + (o.per), 0)) }}%
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-teal-400 mr-2"></div> Approved
              </div>
            </td>
            <td>
              <Result :taskid="q.ticket_id" :checker="q.checker" :result="JSON.parse([q.grade_array]).ops" />
            </td>
          </tr>
        </template>
      </Table>
      <div class="text-center p-4 text-base text-gray-500">{{ nofound }}</div>
      <!-- {{qadb}} -->
    </NuxtLayout>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import store from '../../store';

  export default {
    setup () {
      const qadb = ref([]);
      const nofound = ref("");
      const tasks = ref([]);
      const users = ref([]);
      // onMounted(async () => {
      //   const res = await axios.get('http://localhost:8000/review');
      //   qadb.value = res.data;
      // });
      store.dispatch('getQAinDB').then((r) => {
        qadb.value = r.data.filter(i => i.group_id == store.state.user.group_id)
        
        const taskarr = [];
        const taskid = qadb.value.map(i => i.ticket_id)
        for(let i = 0; i < taskid.length; i++) {
          taskarr.push(store.dispatch('getTask', taskid[i]).then((r) => new Promise((res) => res(r.data.data))));
        }
        Promise.all(taskarr).then((r) => {
          tasks.value = r.flat();
          console.log(r.flat())
        });

        const userarr = [];
        const userid = qadb.value.map(i => i.responsibleIds)
        for(let i = 0; i < userid.length; i++) {
          userarr.push(store.dispatch('getUserData', userid[i]).then((r) => new Promise((res) => res(r.data.data))));
        }
        Promise.all(userarr).then((r) => {
          users.value = r.flat();
        })

        if(qadb.value == 0) {
          nofound.value = "No task."
        }
      });

      function date(datetime) {
        return moment(datetime).format("MMM Do YYYY");
      }

      console.log(moment('2022-10-14 06:46:57').fromNow())

      return { qadb, nofound, date, tasks, users }
    },
    methods: {
      // date(datetime) {
      //     const date = moment(datetime).format("MMM Do YYYY");
      //     return date;
      //   },
    }
  }
</script>

<style>

</style>