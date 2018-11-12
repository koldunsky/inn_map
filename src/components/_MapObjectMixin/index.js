import {step, fieldHeight, fieldWidth} from '../../constants/app';

export default {
    props: ['x', 'y', 'width', 'height'],
    computed: {
      mapPosition: function() {
        const {x, y, width, height} = this;
        const k = 1.9;
        const obj = {
          width: width ? width : step,
          height: height ? height : step,
          left: (x + y) * .7 * step,
          top: (y - x) * .4 * step,
        };

        const finalObj = {};

        Object.keys(obj).forEach((key) => {
          finalObj[key] = `${obj[key]}rem`;
        });

        return finalObj;
      }
    },
  }
