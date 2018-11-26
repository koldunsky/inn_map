<template>
  <div
      class="table"
      :class="{
        vertical
      }"
      :style="styles"
  >
  </div>
</template>

<script>
  import mapObject from '../../../componentMixins/mapObject';

  export default {
    mixins: [mapObject],
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
      styles() {

        return this.mapCssPosition;
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
