import utils from '../../utils/utils.js';

let animationFrame;
const collisionDetectionFunctions = {
  1: circleCircle,
  2: circlePoint,
  3: rectangleRectangle,
  4: rectanglePoint
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const selector = document.getElementById('function');

    changeDrawFunction(selector.value);
    selector.addEventListener('change', (e) => changeDrawFunction(e.target.value));

    function changeDrawFunction(functionType) {
      // Reset the canvas and animation
      context.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrame);

      collisionDetectionFunctions[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function circleCircle(context, width, height) {
  const circle1 = {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 50 + Math.random() * 100
  };
  const circle2 = {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 50 + Math.random() * 100
  };

  document.body.addEventListener('mousemove', (e) => {
    context.clearRect(0, 0, width, height);

    circle1.x = e.clientX;
    circle1.y = e.clientY;

    if (utils.circleCollision(circle1, circle2)) {
      context.fillStyle = '#f66';
    } else {
      context.fillStyle = '#999';
    }

    context.beginPath();
    context.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(circle2.x, circle2.y, circle2.radius, 0, Math.PI * 2, false);
    context.fill();
  });
}

function circlePoint(context, width, height) {
  const circle1 = {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 50 + Math.random() * 100
  };

  document.body.addEventListener('mousemove', (e) => {
    context.clearRect(0, 0, width, height);

    if (utils.circlePointCollision(e.clientX, e.clientY, circle1)) {
      context.fillStyle = '#f66';
    } else {
      context.fillStyle = '#999';
    }

    context.beginPath();
    context.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false);
    context.fill();
  });
}

function rectangleRectangle(context, width, height) {
  const rect0 = {
    x: 200,
    y: 200,
    width: 200,
    height: 100
  };
  const rect1 = {
    x: 0,
    y: 0,
    width: 100,
    height: 200
  };

  document.body.addEventListener('mousemove', (e) => {
    context.clearRect(0, 0, width, height);

    rect1.x = e.clientX - rect1.width / 2;
    rect1.y = e.clientY - rect1.height / 2;

    if (utils.rectIntersect(rect0, rect1)) {
      context.fillStyle = '#f66';
    } else {
      context.fillStyle = '#999';
    }

    context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
    context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
  });
}

function rectanglePoint(context, width, height) {
  const rect = {
    x: 300,
    y: 200,
    width: 200,
    height: 100
  };

  document.body.addEventListener('mousemove', (e) => {
    context.clearRect(0, 0, width, height);

    if (utils.pointInRect(e.clientX, e.clientY, rect)) {
      context.fillStyle = '#f66';
    } else {
      context.fillStyle = '#999';
    }

    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
}
