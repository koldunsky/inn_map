<template>
  <div class="tileField">
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
    <!--<div class="controls">-->
      <!--<label-->
          <!--v-for="(dim, i) in dimensions"-->
          <!--:key="i"-->
      <!--&gt;-->
        <!--{{i}}-->
        <!--<input class="controls__input" type="range" :name="i" min="-180" max="180" :value="dim" @input='updateAxis'-->
               <!--step=".2">-->
      <!--</label>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        dimensions: {
          x: 48.6,
          y: 4.2,
          z: 47,
        },
        dummy: {
          x: 0,
          y: 0
        }
      }
    },
    props: ['tiles', 'floor'],
    methods: {
      updateAxis(e) {
        const {name, value} = e.target;
        this.dimensions[name] = value;
      },
      onTileClick(e) {
        const {x, y} = e.target.dataset;
        const {floor} = this;

        this.placeDummy(x, y);
        if(this.$store.state.selectedEmployee) {
          this.$store.commit('putEmployeeInPlace', {
            x, y, floor
          });
          this.$store.commit('clearSelectedEmployee');
        }
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
