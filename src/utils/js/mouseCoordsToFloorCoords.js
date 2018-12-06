export default (e, correction = {top: 0, left: 0}) => {
  const floors = document.querySelectorAll('.floor');
  let result = {
    floor: null,
    top: null,
    left: null
  };

  floors.forEach((flr, i) => {
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
        floor: flr.dataset.index,
        top: pageYOffset + e.clientY - realRect.top - correction.top,
        left: pageXOffset + e.clientX - realRect.left - correction.left,
      };

      return true;
    }
  });

  return result;
}