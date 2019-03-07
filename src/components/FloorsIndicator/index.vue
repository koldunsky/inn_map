<template>
  <div class="floorsIndicator">
    <pre style="color: cyan">

    </pre>
    <button
        v-for="(floor, i) in floors"
        :key="i"
        :class="{
          'floorIndicator': true,
          'floorIndicator_higher': i < floorsPosition.current,
          'floorIndicator_higherActive': i === floorsPosition.fromTop,
          'floorIndicator_active': i === floorsPosition.current,
          'floorIndicator_lowerActive': i === floorsPosition.fromBottom,
          'floorIndicator_lower': i > floorsPosition.current,
        }"
        @click="() => {floor.scrollIntoView({block: 'center', behavior: 'smooth'})}"
        :style="{'flexGrow': floor.innerHeight}"
    >
      <span class="floorIndicatorText">
      {{floors.length - i}}
      </span>
    </button>
  </div>
</template>

<script>
  const defaultFloorPosition = {
    fromTop: null,
    current: null,
    fromBottom: null,
  };

  export default {
    data() {
      return {
        floors: [],
        floorsField: null,
        floorsPosition: {
            ...defaultFloorPosition
        }
      };
    },
    mounted() {
      this.floors = Array.prototype.slice.call(document.querySelectorAll('.floor'));
      this.floorsField = document.querySelector('.main .floors');

      window.addEventListener('load', this.updateImitator);
      window.addEventListener('resize', this.updateImitator);
      this.floorsField.addEventListener('scroll', this.updateNavigationState);
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
      },

      updateNavigationState() {
        const floors = document.querySelectorAll('.main .floor');

        this.floorsPosition = {...defaultFloorPosition};
        floors.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const wH =  window.innerHeight;
          const lowerThanView = r.top > wH;
          const higherThanView = r.bottom < 0;
          const inView =  !lowerThanView && !higherThanView;
          const topInView = r.top > 0 && r.top < wH;
          const bottomInView = r.bottom > 0 && r.bottom < wH;
          const isPrimary = r.top < wH/2 && r.bottom > wH/2;

          if (isPrimary) {
            this.floorsPosition.current = i;
          }
          //
          else if (topInView) {
            this.floorsPosition.fromBottom = i;
          } else if (bottomInView) {
            this.floorsPosition.fromTop = i;
          }


        });
        console.info('   ');
      }
    },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
