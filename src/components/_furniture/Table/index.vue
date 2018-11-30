<template>
  <div
      class="table"
      :class="{
        vertical
      }"
      :style="{
        top: top,
        left: left
      }"
  >
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
