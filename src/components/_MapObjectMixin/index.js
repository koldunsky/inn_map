import {step, fieldHeight, fieldWidth} from '../../constants/app';

export default {
  props: ['x', 'y', 'width', 'height'],
  computed: {
    mapPosition: function() {
      const {x, y, width, height} = this;
      const obj = {
        width: width ? width : step,
        height: height ? height : step,
        left: (x * 1.76 + y) * step,
        top: (y * .77 - x) * step + fieldWidth * 2,
      };

      const finalObj = {};

      Object.keys(obj).forEach((key) => {
        finalObj[key] = `${obj[key]}rem`;
      });

      return finalObj;
    }
  },
}
