<template>
  <div>
    <button v-on:click="toggleModal()"
      type="button" 
      data-modal-toggle="authentication-modal"
    >
      <slot name="btntitle"></slot>
    </button>
    <div v-if="showModal" 
      id="authentication-modal" 
      tabindex="-1"
      aria-modal="true" 
      role="dialog"
      class="overflow-y-auto 
        overflow-x-hidden 
        fixed 
        top-0 
        right-0 
        left-0 
        z-50 
        w-full 
        md:inset-0 
        h-modal 
        md:h-full 
        justify-center 
        items-center 
        flex" 
    >
      <div class="relative 
        p-4 
        w-full 
        max-w-lg 
        h-full 
        md:h-auto"
      >
        <!--content-->
        <div class="border-0 
          rounded-lg 
          shadow-lg 
          relative 
          flex 
          flex-col 
          w-full 
          bg-white 
          outline-none 
          focus:outline-none"
        >
          <div class="relative bg-white rounded-lg shadow">
            <button 
              v-on:click="toggleModal()"
              type="button" 
              data-modal-toggle="authentication-modal" 
              class="absolute 
                top-3 
                right-2.5 
                text-gray-400 
                bg-transparent 
                hover:bg-gray-200 
                hover:text-gray-900 
                rounded-lg 
                text-sm 
                p-1.5 
                ml-auto 
                inline-flex 
                items-center 
                dark:hover:bg-gray-800 
                dark:hover:text-white" 
            >
              <svg 
                aria-hidden="true" 
                class="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <slot name="modalbody" />
              <div class="flex justify-between py-4">
                <div class="flex items-start">
                  <button type="submit" 
                    class="text-white 
                      bg-red-700 
                      hover:bg-blue-800 
                      focus:ring-2 
                      focus:outline-none 
                      focus:ring-red-300 
                      font-medium 
                      rounded-lg 
                      text-sm 
                      px-5 
                      py-2.5 
                      text-center 
                      dark:bg-red-600 
                      dark:hover:bg-red-700 
                      dark:focus:ring-red-800" 
                      v-on:click="toggleModal()"
                  >
                  Cancel
                  </button>
                </div>
                <slot name="savebtn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="showModal" 
      class="opacity-25 
        fixed 
        inset-0 
        z-40 
        bg-black"
      ></div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "large-modal",
    data() {
      return {
        showModal: false,
      }
    },
    props: {},
    computed: {},
    methods: {
      toggleModal(){
        this.showModal = !this.showModal;
      },
    }
  }
</script>