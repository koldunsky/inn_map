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
  import mapObject from '../../../componentMixins/mapObject';
  import draggableObject from '../../../componentMixins/draggableObject';

  export default {
    mixins: [mapObject, draggableObject],
    data() {
      return {

      }
    },
    components: {
    },
    props: [
      'vertical',
    ],
    computed: {
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
