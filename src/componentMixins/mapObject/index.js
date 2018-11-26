export default {
  props: {
    placeFn: {
      type: Function,
      required: true,
    },
    coords: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      mapCssPosition: {
        left: null,
        top: null,
        position: null,
      }
    }
  },
  mounted() {
    this.mapCssPosition = this.positionOnMap();
  },
  methods: {
    positionOnMap() {
      const parentRect = this.$el.parentElement.getBoundingClientRect();
      const {top, left} = this.placeFn(this.coords.x, this.coords.y);

      return {
        left: (left - parentRect.x) / 10 + 'rem',
        top: (top - parentRect.y) / 10 + 'rem',
        position: 'absolute',
      };
    }
  },
}