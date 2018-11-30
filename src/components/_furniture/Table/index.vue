<template>
  <div
      class="table"
      :style="{
        top: top,
        left: left,
        position
      }"
  >
    <img :src="src" alt="" class="image">
  </div>
</template>

<script>
  import draggableObject from '../../../componentMixins/draggableObject';

  export default {
    mixins: [draggableObject],
    data() {
      return {

      }
    },
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
