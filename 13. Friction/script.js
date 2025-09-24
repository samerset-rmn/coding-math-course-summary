import Particle from '../_utils/particle.js';
import Vector from '../_utils/vector.js';

let animationFrame;
const frictionFunctions = {
  1: moreAccurateLessPerformant,
  2: lessAccurateMorePerformant
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

      frictionFunctions[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

/**
 * On each frame we need to determine the angle of this friction vector and add it to the particle's velocity. There are different ways to do this.
 * - We can take the angle of the velocity vector and add 180 degrees (Math.PI) to it, then add two vectors.
 * - We can set the angle of the friction vector to the angle of the velocity and substract two vectors rather than adding them.
 * - Or instead of giving the friction vector a positive length, we can make it negative, then use the same angle as the velocity and add the two.
 * We will go with substracting.
 *
 * Decrease the velocity and when it's smaller than the friction, set it to 0 making the particle stop.
 *
 * This approach is not very performant, because first we call setAngle (that calls getLength, sqrt),
 * then getAngle (atan2), then two times getLength (sqrt x2), then setLength (atan2 again). And it's
 * on each frame.
 *
 * This way is more accurate to real friction, but less performant.
 */
function moreAccurateLessPerformant(context, width, height) {
  // This incidentally gives the vector a length of 0.15 and an angle of 0. As we described in the lesson, the length will never change, but the angle will.
  // The value of 0.15 is completely arbitrary and just makes the animation look "right".
  const friction = new Vector(0.15, 0);
  const particle = new Particle(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
  particle.radius = 10;

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    friction.setAngle(particle.velocity.getAngle());

    if (particle.velocity.getLength() > friction.getLength()) {
      particle.velocity.subtractFrom(friction);
    } else {
      particle.velocity.setLength(0);
    }

    particle.update();

    context.beginPath();
    context.arc(particle.position.getX(), particle.position.getY(), particle.radius, 0, Math.PI * 2, false);
    context.fill();

    animationFrame = requestAnimationFrame(update);
  }
}

/**
 * Rather than adding a reversed vector to the velocity for friction,
 * we reduce the velocity by a percentage.
 * - We choose an arbitrary number that makes things look "right" (let's say 0.97).
 * - The particle velocity starts at 10, we multiply it by 0.9 and get 9 px/frame.
 * - The next frame we multiply 9 by 0.9 and get 8.1 px/frame.
 * - And so on, until the velocity becomes very small (effectively 0).
 *
 * Pros of this approach:
 * - Just uses multiplication (no trigonometric functions, no square root)
 * - No direction, so no setAngle/getAngle
 * - No need to check if the velocity is greater than the friction
 *
 * And cons are:
 * - It's not real friction, so it looks different
 * 
 * But if we don't compare "real" friction to "fake" one, the latter still looks pretty realistic
 * and acceptable enough to be added to the Particle class.
 */
function lessAccurateMorePerformant(context, width, height) {
  const particle = new Particle(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
  particle.radius = 10;

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    // 0.97 is the "friction"
    particle.velocity.multiplyBy(0.97);

    particle.update();

    context.beginPath();
    context.arc(particle.position.getX(), particle.position.getY(), particle.radius, 0, Math.PI * 2, false);
    context.fill();

    animationFrame = requestAnimationFrame(update);
  }
}
