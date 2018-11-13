<template>
  <div class="field">
    <div class="inner" :style="{
      transform: `rotateX(${dimensions.x}deg) rotateY(${dimensions.y}deg) rotateZ(${dimensions.z}deg) `
    }">
      <div
          class="tile"
          v-for="t in tiles"
          :key="`${t.y}_${t.x}`"
          :style="{
          top: t.y * fieldMeasure.step + 'rem',
          left: t.x * fieldMeasure.step + 'rem',
          width: fieldMeasure.step + 'rem',
          height: fieldMeasure.step + 'rem'
        }"
      >

      </div>
    </div>
    <div class="controls">
      <label
          v-for="(dim, i) in dimensions"
          :key="i"
      >
        {{i}}
        <input class="controls__input" type="range" :name="i" min="-180" max="180" :value="dim" @input='updateAxis' step=".2">
      </label>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        dimensions: {
          x: -49.6,
          y: -12.4,
          z: -47.8,
        }
      }
    },
    props: ['tiles'],
    methods: {
      updateAxis(e) {
        const {name, value} = e.target;
        this.dimensions[name] = value;
      },
    },
    computed: {
      ...mapState(['fieldMeasure'])
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
