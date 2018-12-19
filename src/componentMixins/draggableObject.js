import mouseCoordsToFloorCoords from '../utils/js/mouseCoordsToFloorCoords.js';

export default {
  props: {
    id: {
      type: (String || Number),
      default: null,
    },
    type: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
      return {
      dragged: false,
      innerX: 0,
      innerY: 0,
      shiftX: null,
      shiftY: null,
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
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
      document.addEventListener('mouseup', this.onMouseUp, {
        once: true,
      });
    },

    moveAt(e) {
      this.innerX = e.clientX - this.shiftX;
      this.innerY = e.clientY - this.shiftY;
    },

    onMouseUp(e) {
      this.dragged = false;
      document.removeEventListener('mousemove', this.moveAt);

      if (this.id === null) {
        this.$store.commit('addNewObjectToMap', {
          coords: mouseCoordsToFloorCoords(e, {top: this.shiftY, left: this.shiftX}),
          type: this.type,
        });
      } else {
        this.$store.commit('moveExistingObject', {
          coords: mouseCoordsToFloorCoords(e, {top: this.shiftY, left: this.shiftX}),
          id: this.id,
        });
      }

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
      const amount = this.dragged ? this.innerY : this.y;

      return amount + 'px'
    },

    left() {
      const amount = this.dragged ? this.innerX : this.x;

      return amount + 'px'
    },
    position() {
      return this.dragged ? 'fixed' : 'absolute';
    }
  }
}