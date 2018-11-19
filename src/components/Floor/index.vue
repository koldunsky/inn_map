<template>
  <div
      class="floor"
      :style="{
        width: fieldMeasure.width * fieldMeasure.step * 2 + 'rem',
        height: fieldMeasure.height * fieldMeasure.step * 2  + 'rem',
      }"
  >
    <img class="background" :src="bg">
    <TileField :tiles="getTiles()" />
    <div class="inner">
      <!--<Tile-->
          <!--v-for="tile in getTiles()"-->
          <!--:x="tile.y"-->
          <!--:y="tile.x"-->
          <!--:key="tile.x + '_' + tile.y"-->
      <!--/>-->
      <Employee
          v-for="empl in employees"
          :key="empl.name + empl.coords.x + empl.coords.y"
          :x="empl.coords.x"
          :y="empl.coords.y"
          :employee="empl"
      />
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
    props: ['bg'],
    components: {
      Employee,
      Tile,
      TileField
    },

    data() {
      return {
      };
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
      ...mapState(['employees', 'fieldMeasure'])
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
