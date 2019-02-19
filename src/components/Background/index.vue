<template>
  <div class="background" :style="{
   width: `${width}px`,
   height: `${height}px`,
  }">
    <canvas ref="background" :width="width" :height="height">
    </canvas>
  </div>
</template>

<script>
  export default {
    props: {
      width: Number,
      height: Number,
    },

    methods: {
      getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      renderField() {
        const canvas = this.$refs.background;
        if (!canvas) {
          return false;
        }
        const context = canvas.getContext('2d');
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        const stars = w * h / 3000;
        const colorRange = [0, 60, 240];

        for (let i = 0; i < stars; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const radius = Math.random() * 1.2;
          const hue = colorRange[this.getRandom(0, colorRange.length - 1)];
          const sat = this.getRandom(50, 100);
          context.beginPath();
          context.arc(x, y, radius, 0, 360);
          context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
          context.fill();
        }
      }
    },

    mounted() {
      this.renderField();
    },

    updated() {
      this.renderField();
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
