<template>
  <div class="floorsIndicator">
    <button
        v-for="(floor, i) in floors"
        class="floorIndicator"
        @click="() => {floor.scrollIntoView({block: 'center', behavior: 'smooth'})}"
    >
      {{floors.length - i}}
    </button>
    <div
        class="viewportImitator"
        ref="viewportImitator"
    >

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        floors: [],
        floorsField: null
      };
    },
    mounted() {
      this.floors = Array.prototype.slice.call(document.querySelectorAll('.floor'));
      this.floorsField = document.querySelector('.main .floors');

      window.addEventListener('load', this.updateImitator);
      window.addEventListener('resize', this.updateImitator);
      this.floorsField.addEventListener('scroll', this.updateImitator);
    },
    methods: {
      updateImitator() {
        const { viewportImitator } = this.$refs;
        const floorsField = document.querySelector('.main .floors');
        const viewPortHeight = floorsField.getBoundingClientRect().height;
        const fullScroll = floorsField.scrollHeight;
        const scrollPosition = floorsField.scrollTop;

        viewportImitator.style.height = viewPortHeight / fullScroll * 100 + '%';
        viewportImitator.style.top = scrollPosition / fullScroll * 100 + '%';



        console.info(fullScroll, viewPortHeight, scrollPosition);
      }
    },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
