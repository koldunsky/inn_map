<template>
  <div class="floorsIndicator">
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
      <span class="floorIndicatorYolk">

      </span>
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
        },
        horizontalPosition: null
      };
    },
    mounted() {
      this.floors = Array.prototype.slice.call(document.querySelectorAll('.floor'));
      this.floorsField = document.querySelector('.main .floors');

      window.addEventListener('load', this.updateNavigationState);
      window.addEventListener('resize', this.updateNavigationState);
      this.floorsField.addEventListener('scroll', this.updateNavigationState);

    },
    methods: {
      updateNavigationState() {
        const floors = document.querySelectorAll('.main .floor');

        this.floorsPosition = {...defaultFloorPosition};
        floors.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const wH =  window.innerHeight;
          const topInView = r.top > 0 && r.top < wH;
          const bottomInView = r.bottom > 0 && r.bottom < wH;
          const isPrimary = r.top < wH/2 && r.bottom > wH/2;

          if (isPrimary) {
            this.floorsPosition.current = i;
          }

          else if (topInView) {
            this.floorsPosition.fromBottom = i;
          } else if (bottomInView) {
            this.floorsPosition.fromTop = i;
          }
          this.horizontalPosition = this.floorsField.getBoundingClientRect().width - window.outerWidth;
          console.info(this.horizontalPosition);
        });
      }
    },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
