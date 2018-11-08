<template>
  <div
      class="tile"
      :style="mapPosition"
  >
    {{x}}_{{y}}
  </div>
</template>

<script>
  import _MapObjectMixin from '../_MapObjectMixin';

  export default {
    components: {
    },
    props: {
    },
    mixins: [_MapObjectMixin],
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
