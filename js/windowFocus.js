window.onblur = function () {
  window.onfocus = function () {
    window.onfocus = null;
    // reload data ...
  };
};
