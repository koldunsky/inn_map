import mouseCoordsToFloorCoords from '../utils/js/mouseCoordsToFloorCoords.js';
import axios from 'axios';
import {changeCoords} from '../constants/api';

export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
    type: {
      required: true,
      type: String
    },
    image: {
      required: false,
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
      mapMethods: {
        place: 'addNewObjectToMap',
        move: 'moveExistingObject'
      }
    }
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
    this.$el.ondragstart = function () {
      return false;
    };

    if (__DEV__) {
      // axios.put(changeCoords(2), {
      //   floor: null,
      //   longitude: null,
      //   latitude: null
      // })
    }
  },
  methods: {
    onMouseDown(e) {
      const coords = this.getCoords();

      this.shiftX = e.clientX - coords.left;
      this.shiftY = e.clientY - coords.top;
      this.dragged = true;
      this.moveAt(e);
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

      const coords = mouseCoordsToFloorCoords(e, {top: this.shiftY, left: this.shiftX});

      axios.put(changeCoords(this.id), {
        floor: coords.floor,
        longitude: coords.y,
        latitude: coords.x
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      if (!this.x
        || !this.y) {
        this.$store.commit(this.mapMethods.place, {
          coords,
          type: this.type,
          id: this.id,
        });
      } else {
        this.$store.commit(this.mapMethods.move, {
          coords,
          id: this.id,
        });
      }
    },

    getCoords() {
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
    },
    zIndex() {
      return this.dragged ? 2 : 1;
    }
  }
}