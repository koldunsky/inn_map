<template>
  <div class="field">
    <div class="dummy" :style="{
    top: `${dummy.y}px`,
    left: `${dummy.x}px`
    }">{{dummy.top}}</div>
    <div class="inner" :style="{
      transform: `rotateX(${dimensions.x}deg) rotateY(${dimensions.y}deg) rotateZ(${dimensions.z}deg) `
    }">
      <div
          class="tile"
          v-for="t in tiles"
          :key="`${t.y}_${t.x}`"
          @click="onTileClick"
          :style="{
          top: t.y * fieldMeasure.step * 2 + 'rem',
          left: t.x * fieldMeasure.step * 2 + 'rem',
          width: fieldMeasure.step * 2 + 'rem',
          height: fieldMeasure.step * 2 + 'rem'
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
        },
        dummy: {
          x: 0,
          y: 0
        }
      }
    },
    props: ['tiles'],
    methods: {
      updateAxis(e) {
        const {name, value} = e.target;
        this.dimensions[name] = value;
      },
      onTileClick(e) {
        const {x, y} = e.target.getBoundingClientRect();
        this.dummy = {
          x,
          y,
        };
        console.info(x, y);
      }
    },
    computed: {
      ...mapState(['fieldMeasure'])
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
