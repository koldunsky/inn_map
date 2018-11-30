import mouseCoordsToFloorCoords from '../utils/js/mouseCoordsToFloorCoords.js';

export default {
  props: {
    src: {
      type: String
    }
  },
  data() {
      return {
      dragged: false,
      x: 0,
      y: 0,
      shiftX: null,
      shiftY: null,
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
    this.$el.addEventListener('mouseup', this.onMouseUp);
    this.$el.ondragstart = function() {
      return false;
    };
  },
  methods: {
    onMouseDown(e) {
      const coords = this.getCoords();
      this.shiftX = e.clientX - coords.left;
      this.shiftY = e.clientY - coords.top;
      this.dragged = true;
      document.addEventListener('mousemove', this.moveAt);
      document.addEventListener('mousemove', console.info);
    },
    moveAt(e) {
      this.x = e.clientX - this.shiftX;
      this.y = e.clientY - this.shiftY;
    },

    onMouseUp(e) {
      this.dragged = false;
      document.removeEventListener('mousemove', this.moveAt);
      this.$store.commit('stopDragObject', mouseCoordsToFloorCoords(e));
    },

    getCoords() {   // кроме IE8-
      const box = this.$el.getBoundingClientRect();
      return {
        top: box.top,
        left: box.left
      };
    }
  },
  computed: {
    top() {
      return this.y + 'px'
    },

    left() {
      return this.x + 'px'
    },
    position() {
      return this.dragged ? 'fixed' : 'absolute';
    }
  }
}