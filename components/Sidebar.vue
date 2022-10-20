<template>
  <aside aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 h-screen">
      <a href="https://flowbite.com/" class="flex items-center pl-2.5 mb-5">
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-7" alt="Flowbite Logo" /> -->
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
      </a>
      <ul class="space-y-2">
        <!--dashobard-->
        <li>
          <NuxtLink  to="/" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900 
              rounded-lg 
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
            >
            <svg 
              aria-hidden="true" 
              class="w-6 
                h-6 
                text-gray-500 
                transition 
                duration-75 
                dark:text-gray-400 
                group-hover:text-gray-900 
                dark:group-hover:text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
          </NuxtLink>
        </li>
        <!--qa-->
        <li>
          <NuxtLink to="/task" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900 
              rounded-lg 
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
            <svg 
              aria-hidden="true" 
              class="flex-shrink-0 
                w-6 
                h-6 
                text-gray-500 
                transition 
                duration-75 
                dark:text-gray-400 
                group-hover:text-gray-900 
                dark:group-hover:text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">QA</span>
          </NuxtLink>
        </li>
        <!--approved-->
        <li>
          <NuxtLink to="/review" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900 
              rounded-lg 
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
            <svg class="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path fill-rule="evenodd" 
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Approved</span>
          </NuxtLink>
        </li>
        <!--users-->
        <!-- <li v-if="role === 3"> -->
        <li>
          <NuxtLink to="/users" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900 
              rounded-lg 
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
            <svg 
              aria-hidden="true" 
              class="flex-shrink-0 
                w-6 
                h-6 
                text-gray-500 
                transition 
                duration-75 
                dark:text-gray-400 
                group-hover:text-gray-900 
                dark:group-hover:text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <!--user profile-->
    <div v-for="u in userapi" 
      :key="u.id" 
      class="inset-x-0 
        bottom-8 
        h-16 w-48 
        sticky 
        mx-auto 
        py-4 mt-4 
        space-y-2 
        border-t 
        border-gray-200 
        dark:border-gray-700"
      >
      <div class="flex items center">
        <div class="flex 
          max-w-xs 
          items-center 
          rounded-full 
          bg-gray-800 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-white 
          focus:ring-offset-2 
          focus:ring-offset-gray-800"
        >
          <img :src="u.avatarUrl"
            class="h-9 w-9 rounded-full" 
            alt="" 
          />
        </div>
        <div class="flex 
          items-center 
          p-2 
          text-base 
          font-normal 
          text-gray-900 
          rounded-lg 
          dark:text-white 
          hover:bg-gray-100 
          dark:hover:bg-gray-700"
        >
          {{u.firstName}} {{u.lastName}} {{u.role}}
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  import store from '~~/store';

  export default {
    props: {},
    setup() {
      const role = store.state.user.role;
      const userapi = ref([]);
      store.dispatch('getUserData', store.state.user.id).then((r) => {
        userapi.value = r.data.data
      });

      return { role, userapi }
    },
    created() {}
  }
</script>

<style>
  /* home route and active route will show in bold as it matches / and /about */
a.router-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.router-link-exact-active {
  color: #00c58e;
}
a.router-link-exact-active svg {
  fill: #00c58e;
}
</style>