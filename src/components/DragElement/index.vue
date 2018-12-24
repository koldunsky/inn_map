<template>
  <div
      class="dragElement"
      :style="{
        top: top,
        left: left
      }"
  >
  </div>
</template>

<script>
  import draggableObject from '../../componentMixins/draggableObject';

  export default {
    mixins: [draggableObject],
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
