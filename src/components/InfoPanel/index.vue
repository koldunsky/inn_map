<template>
  <div class="info-panel">
    <button
        class="info-panel__occupation-button"
        :class="{'info-panel__occupation-button_highlighted': occ.isHighlighted}"
        v-for="occ in occupations"
        :key="occ.name + occ.color"
        :style="{
          backgroundColor: occ.color
        }"
        @click="highlightOccupation(occ.name)"
    >
      {{occ.name}}
      {{occ.isHighlighted}}
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    components: {
    },
    props: {
    },
    computed: {
      ...mapState(['occupations'])
    },
    methods: {
      highlightOccupation(name) {
        this.$store.commit('highlightOccupation', name);
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
