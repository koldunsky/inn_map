<template>
  <div
      class="root"
      id="map"
      ref="map"
  >

  </div>
</template>

<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  export default {
    components: {},
    props: {},
    mounted() {
      // Initialize the map and assign it to a variable for later use
      var map = L.map(this.$refs.map, {
        // Set latitude and longitude of the map center (required)
        center: [12.99766, -84.90838],
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 5
      });

// Create a Tile Layer and add it to the map
      var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
      console.info(tiles);
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
