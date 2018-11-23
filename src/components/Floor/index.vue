<template>
  <div
      class="floor"
  >
    <div class="floorIndex">
      <div class="floorIndex__number">
        {{5 - index}}
      </div>
    </div>
    <img class="background" :src="bg">
    {{thisFloorEmployees}}
    <TileField
        ref="TileField"
        :tiles="getTiles()"
        :floor="index"
    />
    <div class="employeesField">
      <Employee
          v-for="empl in thisFloorEmployees"
          :key="empl.name + empl.coords.x + empl.coords.y"
          :x="empl.coords.x"
          :y="empl.coords.y"
          :employee="empl"
          :placeFn="$refs.TileField.coordsToBoundingClientRect"
      />
    </div>
    <div class="inner">
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Employee from '../Employee'
  import Tile from './tile';
  import TileField from '../TileField';

  import {fieldHeight, fieldWidth} from '../../constants/app';

  export default {
    props: ['bg', 'index'],
    components: {
      Employee,
      Tile,
      TileField
    },

    data() {
      return {
      };
    },

    mounted() {
      console.info(this.$refs.TileField);
    },

    methods: {
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
