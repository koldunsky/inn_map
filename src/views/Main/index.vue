<template>
  <div class="main"
       :class="{'global_tile_on': showTile}"
  >
    <label class="checkbox" >
      <input type="checkbox" v-model="showTile"> Схлопнуть домик
    </label>
    <pre>
      {{$store.state.placedObjects}}
    </pre>
    <div class="floors">
      <Floor v-for="(bg, i) in backgrounds"
             :key="bg"
             :bg="bg"
             :index="i"
             :class="{'collapsed': showTile}"
      />
    </div>
    <div class="controls">
      <InfoPanel />
      <ObjectsHolder />
    </div>
  </div>
</template>

<script>
  import Floor from '../../components/Floor/index';
  import InfoPanel from '../../components/InfoPanel/index';
  import ObjectsHolder from '../../components/ObjectsPalette/index';

  export default {
    components: {
      Floor,
      InfoPanel,
      ObjectsHolder
    },
    data() {
      return {
        showTile: false,
        backgrounds: [
          require('../../assets/floors/5th-floor.png'),
          require('../../assets/floors/4th-floor.png'),
          require('../../assets/floors/3rd-floor.png'),
          require('../../assets/floors/2nd-floor.png'),
          require('../../assets/floors/1st-floor.png'),
        ]
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        e.target
      })
    }
  }
</script>

<style src="./index.scss" lang="scss" scoped></style>
