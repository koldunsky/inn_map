<template>
  <div
      :id="`employee_${employee.id}`"
      class="employee"
      :class="{
        'employee_highlight': employee.isHighlighted
      }"
      :style="{
        top: top,
        left: left,
        position: position
      }"
  >
    <div class="card">
      <div
          class="photo"
          :style="{
            backgroundImage: `url(${require('../../assets/logo.png')})`,
          }"
      >
      </div>
      <div class="name">{{employee.name}}</div>
      <div class="email"><a :href="`mailto:${employee.email}`">{{employee.email}}</a></div>
      <div class="slack"><a :href="employee.slackLink">{{employee.slack}}</a></div>
    </div>
  </div>
</template>

<script>
  import {mutations} from '../../store';
  import draggableObject from '../../componentMixins/draggableObject';

  export default {
    mixins: [draggableObject],
    props: ['employee'],
    data() {
      return {
        mapMethods: {
          place: mutations.addNewEmployeeToMap,
          move: mutations.moveExistingEmployee
        }
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
