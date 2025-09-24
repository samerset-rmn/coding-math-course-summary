let animationFrame;
const drawFunctions = {
  1: drawSinCosLines,
  2: drawEllipse,
  3: drawLissajousCurve,
  4: drawPoints
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth),
      height = (canvas.height = window.innerHeight);

    const selector = document.getElementById('function');

    changeDrawFunction(selector.value);
    selector.addEventListener('change', (e) => changeDrawFunction(e.target.value));

    function changeDrawFunction(functionType) {
      // Reset the canvas and animation
      context.strokeStyle = 'black';
      context.fillStyle = 'black';
      context.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrame);

      drawFunctions[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

/**
 * Point that moves around the circle with the attached sin/cos guide lines
 */
function drawSinCosLines(context, width, height) {
  const centerX = width / 2,
    centerY = height / 2,
    radius = 400,
    speed = 0.01;

  let angle = 0,
    x,
    y;

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    // Draw the vertical line of Y axis
    context.strokeStyle = 'black';
    context.beginPath();
    context.moveTo(centerX, centerY + radius);
    context.lineTo(centerX, centerY - radius);
    context.stroke();
    // Draw the horizontal line of X axis
    context.beginPath();
    context.moveTo(centerX - radius, centerY);
    context.lineTo(centerX + radius, centerY);
    context.stroke();

    x = centerX + Math.cos(angle) * radius;
    y = centerY + Math.sin(angle) * radius;
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();

    // Draw the line from the center to the point on the circle
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();

    // Line from the x axis to the point to visualise the sin of the angle
    context.strokeStyle = 'blue';
    context.beginPath();
    context.moveTo(x, centerY); // always on x axis, from the axis to the point
    context.lineTo(x, y);
    context.stroke();
    context.font = `${radius * 0.06}px serif`;
    context.fillStyle = 'blue';
    const centerOfSinLine = y / 2 + centerY / 2; // OR centerY + (Math.sin(angle) * radius * 0.5)
    context.fillText(`sin ${roundTo(Math.sin(angle), 5)}`, x + 5, centerOfSinLine);

    // Line from the y axis to the point to visualise the cos of the angle
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(centerX, y); // always on y axis, from the axis to the point
    context.lineTo(x, y);
    context.stroke();
    context.font = `${radius * 0.06}px serif`;
    context.fillStyle = 'red';
    const centerOfCosLine = x / 2 + centerX / 2 - 50; // OR centerX + (Math.cos(angle) * radius * 0.5) - 50
    context.fillText(`cos ${roundTo(Math.cos(angle), 5)}`, centerOfCosLine, y - 5);

    angle += speed;

    animationFrame = requestAnimationFrame(render);
  }
}

/**
 * Point that moves around the ellipse
 */
function drawEllipse(context, width, height) {
  const centerX = width / 2,
    centerY = height / 2,
    xRadius = 200,
    yRadius = 400,
    speed = 0.1;

  let angle = 0,
    x,
    y;

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    x = centerX + Math.cos(angle) * xRadius;
    y = centerY + Math.sin(angle) * yRadius;

    // Draw the vertical line of Y axis
    context.beginPath();
    context.moveTo(centerX, centerY + yRadius);
    context.lineTo(centerX, centerY - yRadius);
    context.stroke();
    // Draw the horizontal line of X axis
    context.beginPath();
    context.moveTo(centerX - xRadius, centerY);
    context.lineTo(centerX + xRadius, centerY);
    context.stroke();

    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();

    angle += speed;

    animationFrame = requestAnimationFrame(render);
  }
}

/**
 * Point that moves with a different speed for x and y (Lissajous Curve).
 * This formula can be used for animating, for example, flies. It looks
 * chaotic but actually the movement is determined.
 */
function drawLissajousCurve(context, width, height) {
  const centerX = width / 2,
    centerY = height / 2,
    xRadius = 400,
    yRadius = 200,
    xSpeed = 0.1,
    ySpeed = 0.131;

  let xAngle = 0,
    yAngle = 0,
    x,
    y;

  render();

  function render() {
    x = centerX + Math.cos(xAngle) * xRadius;
    y = centerY + Math.sin(yAngle) * yRadius;

    context.beginPath();
    context.fillStyle = 'rgb(0 0 0 / 10%)';
    context.arc(x, y, 10, 0, Math.PI * 2, false);
    context.fill();

    xAngle += xSpeed;
    yAngle += ySpeed;

    animationFrame = requestAnimationFrame(render);
  }
}

/**
 * Draw equally spaced points around the circle
 */
function drawPoints(context, width, height) {
  const centerX = width / 2,
    centerY = height / 2,
    radius = 200,
    numObjects = 10,
    speed = 0.001,
    slice = (Math.PI * 2) / numObjects; // "Math.PI * 2" radians is equal to 360 degrees. Dividing 360 degrees by the number of objects gives us the angle of each object.

  let angle = 0,
    x,
    y;

  render();

  function render() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < numObjects; i++) {
      angle = angle + slice + speed;

      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2, false);
      context.fill();
    }

    animationFrame = requestAnimationFrame(render);
  }
}

function roundTo(value, decimalPoints) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 0;
  }

  return Math.round(value * 10 ** decimalPoints) / 10 ** decimalPoints;
}
