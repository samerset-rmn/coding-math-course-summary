import Particle2 from '../../utils/particle2.js';
import utils from '../../utils/utils.js';

let animationFrame;
const newParticleClassExamples = {
  1: springs,
  2: gravitations
};

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const selector = document.getElementById('function');

    changeExample(selector.value);
    selector.addEventListener('change', (e) => changeExample(e.target.value));

    function changeExample(functionType) {
      // Reset the canvas and animation
      context.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrame);

      newParticleClassExamples[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function springs(context, width, height) {
  const springPoint = {
    x: width / 2,
    y: height / 2
  };
  const springPoint2 = {
    x: utils.randomRange(0, width),
    y: utils.randomRange(0, height)
  };
  const weight = new Particle2(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2, 5);

  const k = 0.08,
    springLength = 100;

  weight.radius = 20;
  weight.friction = 0.89;
  weight.addSpring(springPoint, k, springLength);
  weight.addSpring(springPoint2, k, springLength);

  document.addEventListener('mousemove', (event) => {
    springPoint.x = event.clientX;
    springPoint.y = event.clientY;
  });

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    weight.update();

    context.beginPath();
    context.arc(weight.x, weight.y, weight.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(springPoint.x, springPoint.y, 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(springPoint2.x, springPoint2.y, 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.moveTo(weight.x, weight.y);
    context.lineTo(springPoint.x, springPoint.y);
    context.moveTo(weight.x, weight.y);
    context.lineTo(springPoint2.x, springPoint2.y);
    context.stroke();

    animationFrame = requestAnimationFrame(update);
  }
}

function gravitations(context, width, height) {
  const sun1 = new Particle2(300, 200, 0, 0),
    sun2 = new Particle2(800, 600, 0, 0),
    emitter = { x: 100, y: 0 },
    particles = [],
    numParticles = 500;

  sun1.mass = 10000;
  sun1.radius = 10;
  sun2.mass = 20000;
  sun2.radius = 20;

  for (let index = 0; index < numParticles; index++) {
    const particle = new Particle2(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI / 2 + utils.randomRange(-0.1, 0.1));

    particle.addGravitation(sun1);
    particle.addGravitation(sun2);
    particle.radius = 3;

    particles.push(particle);
  }

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    draw(sun1, 'yellow');
    draw(sun2, 'yellow');

    particles.forEach((p) => {
      p.update();
      draw(p, 'black');

      if (p.x > width || p.x < 0 || p.y > height || p.y < 0) {
        p.x = emitter.x;
        p.y = emitter.y;
        p.setSpeed(utils.randomRange(7, 8));
        p.setHeading(Math.PI / 2 + utils.randomRange(-0.1, 0.1));
      }
    });

    animationFrame = requestAnimationFrame(update);
  }

  function draw(p, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    context.fill();
    context.fillStyle = 'black';
  }
}
