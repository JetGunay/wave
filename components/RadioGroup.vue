<template>
  <div class="p-2">
    <RadioGroup v-model="selected" @update:modelValue="check">
      <RadioGroupOption as="template"
        v-for="o in props.options"
        :key="o.title"
        :value="o"
        v-slot="{ active, checked }"
      >
        <div :class="[
            active
              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400'
              : '',
            checked ? 'bg-teal-900 bg-opacity-75 text-white' : 'bg-white',
          ]"
          class="relative 
            inline-flex 
            items-center 
            mr-3 
            cursor-pointer 
            rounded-lg 
            px-4 
            py-3 
            shadow-md 
            focus:outline-none"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-white' : 'text-gray-900'"
                  class="font-medium rg-lbl"
                >
                  {{ o.title }}
                </RadioGroupLabel>
              </div>
            </div>
            <div v-show="checked" class="shrink-0 text-white ml-1">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                  fill="#fff"
                  fill-opacity="0.2"
                />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@headlessui/vue';

  const props = defineProps({
    options: { type: Object },
    disabled: { type: Boolean }
  });
  const selected = ref(props.options);

  const emit = defineEmits(['checked'])
  const check = () => {
    // console.log(selected.value.percentage)
    emit('checked', selected.value.title)
  }
</script>

<style>

</style>