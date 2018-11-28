<template>
  <div
      class="floor"
      :style="{'z-index': 5 - index}"
  >
    <div class="floorIndex">
      <div class="floorIndex__number">
        {{5 - index}}
      </div>
    </div>
    <img class="background" :src="bg">
    <!--{{thisFloorEmployees}}-->
    <div class="objectsField"  v-if="readyToRenderObjects">
      <Table
          :vertical="true"
          :coords="{x: 5, y: 4, floor: 0}"
          :placeFn="$refs.TileField.coordsToBoundingClientRect"
      />
      <Table
          :vertical="true"
          :coords="{x: 6, y: 4, floor: 0}"
          :placeFn="$refs.TileField.coordsToBoundingClientRect"
      />
      <Table
          :coords="{x: 8, y: 3, floor: 0}"
          :placeFn="$refs.TileField.coordsToBoundingClientRect"
      />
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
    <DragElement />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Employee from '../Employee'
  import TileField from '../TileField';
  import Table from '../_furniture/Table';
  import DragElement from '../DragElement';

  import {fieldHeight, fieldWidth} from '../../constants/app';

  export default {
    props: ['bg', 'index'],
    components: {
      Employee,
      TileField,
      Table,
      DragElement
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
      ...mapState(['floors', 'fieldMeasure', 'employees']),
      thisFloorEmployees() {
        return this.$store.state.employees.filter((empl) => empl.coords && empl.coords.floor === this.index);
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
