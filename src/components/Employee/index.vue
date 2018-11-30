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

  export default {
    components: {},
    props: ['employee'],
    mixins: [],
    computed: {
      styles() {
        const {top, left} = this.mapCssPosition;

        return {
          width: '15px',
          height: '15px',
          backgroundColor: this.$store.state.occupations[this.employee.occupation].color,
          top,
          left
        };
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
