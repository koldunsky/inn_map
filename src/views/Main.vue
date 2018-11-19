<template>
  <div class="main">
    <Floor v-for="bg in backgrounds" :bg="bg"/>
    <InfoPanel />
  </div>
</template>

<script>
  import Floor from '../components/Floor';
  import InfoPanel from '../components/InfoPanel';
  import LeafletTest from '../components/LeafletTest';

  export default {
    components: {
      Floor,
      InfoPanel,
      LeafletTest,
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
