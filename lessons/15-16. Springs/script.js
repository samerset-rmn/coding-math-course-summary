import Particle from '../../utils/particle.js';
import Vector from '../../utils/vector.js';
import utils from '../../utils/utils.js';

let animationFrame;
const springFunctionsFunctions = {
  1: simpleDemo,
  2: randomValues,
  3: springWithLength,
  4: twoSprings
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

      springFunctionsFunctions[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function simpleDemo(context, width, height) {
  const springPoint = new Vector(width / 2, height / 2);
  const weight = new Particle(
    Math.random() * width,
    Math.random() * height,
    // Giving the object a small initial velocity to make it a bit more realistic
    50,
    Math.random() * Math.PI * 2
  );

  weight.radius = 20;

  /**
   * <-- k -->
   * The bigger the constant the more stiff the spring is. The best values are somewhere between 0.1 and 0.5.
   * But we can play around with it and friction to see different results.
   *
   * <-- friction -->
   * In the real world the object will be losing some momentum due to air resistance or some mechanical forces.
   * Without it, the object will infinitely go back and forth. We can simulate this by adding a small amount of friction.
   *
   * Side note: personally I like the effect of k = 0.08 and friction = 0.89
   */
  const k = 0.08;
  weight.friction = 0.89;

  document.addEventListener('mousemove', (event) => {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    // Get a vector between the weight and the spring point
    const distance = springPoint.subtract(weight.position);
    // The force that the spring applies to the weight (Hooke's law formula)
    const springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    weight.update();

    context.beginPath();
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(springPoint.getX(), springPoint.getY(), 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.moveTo(weight.position.getX(), weight.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();

    requestAnimationFrame(update);
  }
}

function randomValues(context, width, height) {
  const springPoint = new Vector(width / 2, height / 2);
  const weight = new Particle(Math.random() * width, Math.random() * height, 50, Math.random() * Math.PI * 2);

  weight.radius = 20;

  let k = 0.01 + Math.random() * 0.5;
  weight.friction = 0.1 + Math.random() * 0.9;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      k = 0.01 + Math.random() * 0.5;
      weight.friction = 0.1 + Math.random() * 0.9;
    }
  });

  document.addEventListener('mousemove', (event) => {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    const distance = springPoint.subtract(weight.position);
    const springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    weight.update();

    context.beginPath();
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(springPoint.getX(), springPoint.getY(), 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.moveTo(weight.position.getX(), weight.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();

    context.font = `24px serif`;
    context.fillStyle = 'red';
    context.fillText(`Press R to change values`, width - 350, 50);
    context.fillStyle = 'black';
    context.fillText(`k: ${k}`, width - 350, 80);
    context.fillText(`friction: ${weight.friction}`, width - 350, 110);

    requestAnimationFrame(update);
  }
}

function springWithLength(context, width, height) {
  const springPoint = new Vector(width / 2, height / 2);
  const weight = new Particle(
    Math.random() * width,
    Math.random() * height,
    50,
    Math.random() * Math.PI * 2,
    0.5 // Giving it gravity to make it behave a little more realistically (the weight will have **weight**).
  );

  const k = 0.08,
    springLength = 100;
  weight.radius = 20;
  weight.friction = 0.89;

  document.addEventListener('mousemove', (event) => {
    springPoint.setX(event.clientX);
    springPoint.setY(event.clientY);
  });

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    const distance = springPoint.subtract(weight.position);
    distance.setLength(distance.getLength() - springLength);

    const springForce = distance.multiply(k);

    weight.velocity.addTo(springForce);

    weight.update();

    context.beginPath();
    context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(springPoint.getX(), springPoint.getY(), 4, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.moveTo(weight.position.getX(), weight.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();

    requestAnimationFrame(update);
  }
}

function twoSprings(context, width, height) {
  const particleA = new Particle(utils.randomRange(0, width), utils.randomRange(0, height), utils.randomRange(0, 50), utils.randomRange(0, Math.PI * 2));
  const particleB = new Particle(utils.randomRange(0, width), utils.randomRange(0, height), utils.randomRange(0, 50), utils.randomRange(0, Math.PI * 2));
  const particleC = new Particle(utils.randomRange(0, width), utils.randomRange(0, height), utils.randomRange(0, 50), utils.randomRange(0, Math.PI * 2));

  particleA.radius = 20;
  particleA.friction = 0.9;

  particleB.radius = 20;
  particleB.friction = 0.9;

  particleC.radius = 20;
  particleC.friction = 0.9;

  const k = 0.01;
  const separation = 300; // Offset of spring length

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    spring(particleA, particleB, separation);
    spring(particleB, particleC, separation);
    spring(particleC, particleA, separation);

    particleA.update();
    particleB.update();
    particleC.update();

    context.beginPath();
    context.arc(particleA.position.getX(), particleA.position.getY(), particleA.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(particleB.position.getX(), particleB.position.getY(), particleB.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.arc(particleC.position.getX(), particleC.position.getY(), particleC.radius, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.moveTo(particleA.position.getX(), particleA.position.getY());
    context.lineTo(particleB.position.getX(), particleB.position.getY());
    context.moveTo(particleB.position.getX(), particleB.position.getY());
    context.lineTo(particleC.position.getX(), particleC.position.getY());
    context.moveTo(particleC.position.getX(), particleC.position.getY());
    context.lineTo(particleA.position.getX(), particleA.position.getY());
    context.stroke();

    requestAnimationFrame(update);
  }

  function spring(p0, p1, sep) {
    // We're using p0 as the spring point and p1 as the weight
    const distance = p0.position.subtract(p1.position);
    distance.setLength(distance.getLength() - sep);

    const springForce = distance.multiply(k);

    p1.velocity.addTo(springForce);
    /**
     * Now we could do this all over again, swapping the particles roles,
     * so the p0 is the weight and p1 is the spring point.
     *
     * ```js
     * const distance2 = p1.position.subtract(p0.position);
     * distance2.setLength(distance2.getLength() - sep);
     * const springForce2 = distance2.multiply(k);
     * p0.velocity.addTo(springForce2);
     * ```
     *
     * But if we did that, the force we'd wind up with would be exactly opposite to the force we just
     * calculated. So rather than going through extra calculations, we'll just **substract** that
     * same force from p0's velocity. This gives us the same result as adding a reversed vector to that velocity.
     */
    p0.velocity.subtractFrom(springForce);
  }
}
