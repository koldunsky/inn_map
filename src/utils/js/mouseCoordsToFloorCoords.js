export default (e, correction = {top: 0, left: 0}) => {
  const floors = document.querySelectorAll('.floor');
  let result = {
    floor: null,
    y: null,
    x: null
  };

  floors.forEach((flr) => {
    const coordsFromTheTop = {
      left: e.clientX + pageXOffset,
      top: e.clientY + pageYOffset,
    };
    const rect = flr.getBoundingClientRect();
    const realRect = {
      width: rect.width,
      height: rect.height,
      left: rect.left + pageXOffset,
      top: rect.top + pageYOffset
    };

    if (coordsFromTheTop.top > realRect.top && coordsFromTheTop.top < realRect.top + realRect.height) {

      result = {
        floor: parseInt(flr.dataset.index, 10),
        y: pageYOffset + e.clientY - realRect.top - correction.top,
        x: pageXOffset + e.clientX - realRect.left - correction.left,
      };

      return true;
    }
  });

  return result;
}