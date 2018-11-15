<template>
  <div class="main">
    <Floor />
    <InfoPanel />
  </div>
</template>

<script>
  import Floor from '../components/Floor';
  import InfoPanel from '../components/InfoPanel';

  export default {
    components: {
      Floor,
      InfoPanel
    },
    mounted() {
      document.addEventListener('click', (e) => {
        e.target
      })
    }
  }
</script>
