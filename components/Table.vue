<template>
  <div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-600">
        <!-- <tr>
          <th scope="col" class="py-3 px-6">Date</th>
          <th scope="col" class="py-3 px-6">{{ grpName }}</th>
          <th scope="col" class="py-3 px-6">Ticket</th>
          <th scope="col" class="py-3 px-6">Brand</th>
          <th scope="col" class="py-3 px-6">Status</th>
          <th scope="col" class="py-3 px-6">Action</th>
        </tr> -->
        <slot name="theader"></slot>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
        <!-- <template 
          v-for="t in iatasks" 
          :key="t.id"
          ref="root"
        >
          <tr 
            v-for="task in filteredtask.filter((i) => i.id == t.parentIds || i.id == t.superParentIds)" :key="task.id"
            class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 text-gray-500"
          >
            <td class="py-4 px-6">
              {{ date(t.dates.start) }}
            </td>
            <th 
              v-for="tr in t.responsibleIds"
              :key="tr"
              scope="row" 
              class="flex items-center py-4 px-6 text-gray-700 whitespace-nowrap"
            >
              <span v-for="u in users.filter((i) => i.id === tr)" :key="u.id" class="flex items-center">
                <img class="w-8 h-8 rounded-full" :src="u.avatarUrl" alt="" />
                <div class="pl-3">
                  <div class="font-semibold">{{u.firstName}} {{u.lastName}}</div>
                </div>
              </span>
            </th>
            <td class="py-4 px-6">
              <a :href="t.permalink" class="has-tooltip hover:text-purple-600 hover:dark:text-purple-500">
                {{ task.permalink.split("/open.htm?id=").slice(-1)[0] }} - {{ t.title }}
              </a>
            </td>
            <td class="py-4 px-6">
              {{ task.customFields.filter((id) => id.id === 'IEADVMHZJUABUJGM').map((v) => v.value)[0]}}
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Internal Review
              </div>
            </td>
            <td class="py-4 px-6">
              <div v-if="qadb.filter(i => i.ticket_id == t.id).length == 0">
                <NuxtLink :to="`review/${t.id}`" class="font-medium text-purple-600 dark:text-purple-500 hover:underline">Review</NuxtLink>
              </div>
              <div v-else>
                [approved]
              </div>
            </td>
          </tr>
        </template> -->
      </tbody>
    </table>
  </div>
</template>