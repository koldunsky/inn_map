<template>
  <div class="main">
    <Floor v-for="(bg, i) in backgrounds" :bg="bg" :index="i"/>
    <InfoPanel />
    <ObjectsHolder />
  </div>
</template>

<script>
  import Floor from '../components/Floor';
  import InfoPanel from '../components/InfoPanel';
  import ObjectsHolder from '../components/ObjectsHolder';

  export default {
    components: {
      Floor,
      InfoPanel,
      ObjectsHolder,
    },
    data() {
      return {
        backgrounds: [
          require('../assets/floors/5th-floor.png'),
          require('../assets/floors/4th-floor.png'),
          require('../assets/floors/3rd-floor.png'),
          require('../assets/floors/1st-floor.png'),
          require('../assets/floors/2nd-floor.png'),
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
