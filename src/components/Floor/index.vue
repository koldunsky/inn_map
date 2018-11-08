<template>
  <div class="floor">
    <Tile
        v-for="tile in getTiles()"
        :x="tile.y"
        :y="tile.x"
        :key="tile.x + '_' + tile.y"
    />
    <Employee
        v-for="empl in employees"
        :key="empl.name"
        :x="empl.coords.x"
        :y="empl.coords.y"
        :employee="empl"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Employee from '../Employee'
  import Tile from './tile';

  import {fieldHeight, fieldWidth} from '../../constants/app';

  export default {
    components: {
      Employee,
      Tile
    },
    methods: {
      getTiles() {
        const arr = [];

        for (let i = 0; i < fieldWidth; i++) {
          for (let j = 0; j < fieldHeight; j++) {
            arr.push({x: i, y: j});
          }
        }

        return arr;
      }
    },
    computed: {
      ...mapState(['employees'])
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
