<template>
  <div
      class="floor"
      :style="{'z-index': 5 - index}"
      :data-index="index"
  >
    <div class="testObjects">
      <div
          v-for="o in thisFloorPlacedObjects"
          class="testObject"
          :style="{
          top: o.top + 'px',
          left: o.left + 'px'
          }"
      >
      </div>
    </div>
    <div class="floorIndex">
      <div class="floorIndex__number">
        {{5 - index}}
      </div>
    </div>
    <img class="background" :src="bg">
    <div class="objectsField"  v-if="readyToRenderObjects">
    </div>
    <div class="employeesField" v-if="readyToRenderObjects">
      <Employee
          v-for="empl in thisFloorEmployees"
          :key="empl.name + empl.coords.x + empl.coords.y"
          :coords="empl.coords"
          :employee="empl"
          :placeFn="$refs.TileField.coordsToBoundingClientRect"
      />
    </div>
    <TileField
        ref="TileField"
        :tiles="getTiles()"
        :floor="index"
        @onReady="onTileFieldsReady"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Employee from '../Employee'
  import TileField from '../TileField';
  import Table from '../_furniture/Table';

  import {fieldHeight, fieldWidth} from '../../constants/app';

  export default {
    props: {
      bg: {
        type: String,
      },
      index: {
        type: Number,
        reqired: true
      }
    },
    components: {
      Employee,
      TileField,
      Table
    },

    data() {
      return {
        readyToRenderObjects: false,
      };
    },

    mounted() {
      console.info(this.$refs.TileField);
    },

    methods: {
      onTileFieldsReady() {
        console.info('zxax');
        this.readyToRenderObjects = true;
      },
      getTiles() {
        const arr = [];

        for (let i = 0; i < fieldHeight; i++) {
          for (let j = 0; j < fieldWidth; j++) {
            arr.push({x: i, y: j});
          }
        }

        return arr;
      }
    },
    computed: {
      ...mapState(['floors', 'fieldMeasure', 'employees', 'placedObjects']),
      thisFloorEmployees() {
        return this.$store.state.employees.filter((empl) => empl.coords && empl.coords.floor === this.index);
      },
      thisFloorPlacedObjects() {
        return this.$store.state.placedObjects.filter(o => parseInt(o.floor, 10) === this.index);
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
