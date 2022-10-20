<template>
  <div class="rating">
    <ul class="list flex">
      <li @click="rate(star)" 
        v-for="star in maxstars"
        :key="star.stars"
        :class="{ 'active' : star <= stars }"
        class="star"
      >
        <svg 
          class="block h-6 w-6" 
          :class="star <= stars ? 'fill-blue': 'fill-grey'" 
          :fill="star <= stars ? 'teal': 'transparent'"  
          :stroke="star <= stars ? 'teal': 'teal'"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      </li>
    </ul>
    <div v-if="hascounter" class="info counter">
      <span class="score-rating">{{ stars }}</span>
      <span class="divider">/</span>
      <span class="socre-max">{{ maxstars }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Rating',
    props: ['grade', 'maxstars', 'hascounter'],
    data() {
      return {
        stars: this.grade
      }
    },
    methods: {
      rate(star) {
        if( typeof star === 'number' && star <= this.maxstars && star >= 0) {
          this.stars = this.stars === star ? star - 1 : star;
          this.$emit("rate", this.stars)
        }
      }
    }
  }
</script>

<style></style>