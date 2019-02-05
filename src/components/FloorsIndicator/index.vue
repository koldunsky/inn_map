<template>
  <div class="floorsIndicator">
    <button
        v-for="(floor, i) in floors"
        class="floorIndicator"
        @click="() => {floor.scrollIntoView({block: 'center', behavior: 'smooth'})}"
    >
      {{floors.length - i}}
    </button>
    <div class="viewportImitator">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        floors: []
      };
    },
    mounted() {
      this.floors = Array.prototype.slice.call(document.querySelectorAll('.floor'));
    },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
