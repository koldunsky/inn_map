<template>
  <div
      class="employee"
      :class="{
        'employee_highlight': employee.isHighlighted,
        'employee_active': employee.isActive
      }"
      :style="styles"
  >
    <div class="card">
      <div
          class="photo"
        :style="{
        backgroundImage: `url(${require('../../assets/logo.png')})`,
        }">
      </div>
      <div class="name">{{employee.name}}</div>
      <div class="email"><a :href="`mailto:${employee.email}`">{{employee.email}}</a></div>
      <div class="slack"><a :href="employee.slackLink">{{employee.slack}}</a></div>
    </div>
  </div>
</template>

<script>
  import _MapObjectMixin from '../_MapObjectMixin';
  import mapObject from '../../componentMixins/mapObject';

  export default {
    components: {},
    props: ['employee', 'placeFn'],
    data() {
      return {
        cssPosition: {
          left: null,
          top: null,
        }
      }
    },
    mounted() {
      this.cssPosition = this.positionOnMap();
    },
    mixins: [_MapObjectMixin, mapObject],
    computed: {
      styles() {
        const {top, left} = this.cssPosition;

        return {
          width: '15px',
          height: '15px',
          backgroundColor: this.$store.state.occupations[this.employee.occupation].color,
          top,
          left
        };
      },
      coords() {
        return this.employee.coords;
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
