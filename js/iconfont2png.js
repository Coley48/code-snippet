function loadImage(src, callback, type = "image/png") {
  const img = new Image();
  img.src = src;

  img.onload = (e) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    if (callback) {
      callback(canvas, img);
    }

    const base64 = canvas.toDataURL(type);
    console.log(base64);
  };
}

// 裁剪圆角
function cutCorner(src) {
  loadImage(src, (canvas, img) => {
    const context = canvas.getContext("2d");
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    context.arc(x, y, x - 2, 0, 2 * Math.PI, false);
    context.clip();
    context.drawImage(img, 0, 0);
  });
}

// 替换颜色
function replaceColor(src, color, newColor) {
  loadImage(src, (canvas, img) => {
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);

    const [r, g, b] = formatColor(color);
    const newRgba = formatColor(newColor);
    for (let i = 0; i < imageData.data.length; i += 4) {
      let rgba = imageData.data[i];
      if (rgba[i] == r && rgba[i + 1] == g && rgba[i + 2] == b) {
        rgba[i] = newRgba[i];
        rgba[i + 1] = newRgba[i + 1];
        rgba[i + 2] = newRgba[i + 2];
      }
    }
    context.putImageData(imageData, 0, 0);
  });
}

// 像素点颜色
function pixelColor(src, x, y) {
  loadImage(src, (canvas, img) => {
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    const [r, g, b, a] = context.getImageData(x, y, 1, 1);
    return [r, g, b, a / 255];
  });
}

function formatColor(color) {
  str = color.toLowerCase();
  const rgba = [0, 0, 0, 1];
  if (/^#[a-f\d]{3}/.test(str)) {
    for (let i = 0; i < 3; i++) {
      rgba[i] = parseInt(str[i + 1].repeat(2), 16);
    }
  } else if (/^#[a-f\d]{6}/.test(str)) {
    rgba[0] = parseInt(str.slice(1, 3), 16);
    rgba[1] = parseInt(str.slice(3, 5), 16);
    rgba[2] = parseInt(str.slice(5, 7), 16);
  }
  return rgba;
}
