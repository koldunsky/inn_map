<template>
  <div class="field">
    <div class="dummy" :style="{
    top: `${dummy.y}px`,
    left: `${dummy.x}px`
    }">{{dummy.top}}
    </div>
    <div
        class="inner"
        :style="{
          transform: `rotateX(${dimensions.x}deg) rotateY(${dimensions.y}deg) rotateZ(${dimensions.z}deg) `
        }">
      <div
          class="tile"
          v-for="t in tiles"
          :key="`${t.y}_${t.x}`"
          :data-x="t.x"
          :data-y="t.y"
          @click="onTileClick"
          :class="`tile_${t.y}_${t.x}`"
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
        <input class="controls__input" type="range" :name="i" min="-180" max="180" :value="dim" @input='updateAxis'
               step=".2">
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
          //   x: -49.6,
          //   y: -12.4,
          //   z: -47.8,
          x: 48.6,
          y: 4.2,
          z: 47,

          // transform: rotateX(47.6deg) rotateY(3.8deg) rotateZ(47deg);
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
        const {x, y} = e.target.dataset;

        console.info(e.target.getBoundingClientRect());
        this.placeDummy(x, y);
      },

      coordsToBoundingClientRect(x, y) {
        return this.$el.querySelector(`.tile_${y}_${x}`).getBoundingClientRect();
      },

      placeDummy(x, y) {
        const parentRect = this.$el.getBoundingClientRect();
        const tileRect = this.coordsToBoundingClientRect(x, y);
        this.dummy = {
          x: tileRect.x - parentRect.x,
          y: tileRect.y - parentRect.y,
        };
      }
    },
    computed: {
      ...mapState(['fieldMeasure'])
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
