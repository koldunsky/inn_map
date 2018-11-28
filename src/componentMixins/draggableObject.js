export default {
  data() {
    return {
      x: null,
      y: null,
      shiftX: null,
      shiftY: null,
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
    this.$el.addEventListener('mouseup', this.onMouseUp);
  },
  methods: {
    onMouseDown(e) {
      const coords = this.getCoords();
      this.shiftX = e.pageX - coords.left;
      this.shiftY = e.pageY - coords.top;
      document.addEventListener('mousemove', this.moveAt);
      console.info(e);
    },
    moveAt(e) {
      console.info(e);
      this.x = e.pageX - this.shiftX;
      this.y = e.pageY - this.shiftY;
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
  computed: {
    top() {
      return this.y + 'px'
    },

    left() {
      return this.x + 'px'
    }
  }
}