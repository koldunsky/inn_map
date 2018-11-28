<template>
  <div
      class="dragElement"
      @mousedown="handleMouseDown"
      @mouseup="onMouseUp"
      :style="{
        top: y,
        left: x
      }"
  >
  </div>
</template>

<script>
  export default {
    data() {
      return {
        x: null,
        y: null,
        shiftX: null,
        shiftY: null,
      }
    },
    methods: {
      handleMouseDown(e) {
        const coords = this.getCoords();
        this.shiftX = e.pageX - coords.left;
        this.shiftY = e.pageY - coords.top;
        document.addEventListener('mousemove', this.moveAt);
        console.info(e);
      },
      moveAt(e) {
        console.info(e);
        this.x = e.pageX - this.shiftX + 'px';
        this.y = e.pageY - this.shiftY + 'px';
      },

      onMouseUp(e) {
        document.removeEventListener('mousemove', this.moveAt)
      },

      getCoords() {   // кроме IE8-
        const box = this.$el.getBoundingClientRect();
        return {
          top: box.top + window.pageYOffset,
          left: box.left +  window.pageXOffset
        };
      }
    },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
