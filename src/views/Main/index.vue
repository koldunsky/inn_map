<template>
  <div class="main">
    <div class="floors">
      <Floor v-for="(bg, i) in backgrounds"
             :key="bg"
             :bg="bg"
             :index="i"/>
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
  import ObjectsHolder from '../../components/ObjectsHolder/index';

  export default {
    components: {
      Floor,
      InfoPanel,
      ObjectsHolder,
    },
    data() {
      return {
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
