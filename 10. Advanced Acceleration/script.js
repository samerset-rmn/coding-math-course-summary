import Particle from '../_utils/particle.js';
import Vector from '../_utils/vector.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const ship = new Particle(width / 2, height / 2, 0, 0);
    const thrust = new Vector(0, 0);

    let angle = 0,
      turningLeft = false,
      turningRight = false,
      thrusting = false;

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        thrusting = true;
      }
      if (event.key === 'ArrowLeft') {
        turningLeft = true;
      }
      if (event.key === 'ArrowRight') {
        turningRight = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowUp') {
        thrusting = false;
      }
      if (event.key === 'ArrowLeft') {
        turningLeft = false;
      }
      if (event.key === 'ArrowRight') {
        turningRight = false;
      }
    });

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      if (turningLeft) {
        angle -= 0.05;
      }
      if (turningRight) {
        angle += 0.05;
      }

      thrust.setAngle(angle);
      thrust.setLength(thrusting ? 0.1 : 0);
      
      ship.accelerate(thrust);
      ship.update();

      const x = ship.position.getX(),
        y = ship.position.getY();

      context.save();
      context.translate(x, y);
      context.rotate(angle);

      context.beginPath();
      context.moveTo(10, 0);
      context.lineTo(-10, -7);
      context.lineTo(-10, 7);
      context.lineTo(10, 0);
      if (thrusting) {
        context.moveTo(-10, 0);
        context.lineTo(-18, 0);
      }
      context.stroke();

      context.restore();

      if (x >= width) {
        ship.position.setX(0);
      }
      if (x <= 0) {
        ship.position.setX(width);
      }
      if (y >= height) {
        ship.position.setY(0);
      }
      if (y <= 0) {
        ship.position.setY(height);
      }

      requestAnimationFrame(update);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
