import Particle from '../_utils/particle.js';
import Vector from '../_utils/vector.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const sun = new Particle(width / 2, height / 2, 0, 0);
    const planet = new Particle(width / 2 + 200, height / 2, 10, -Math.PI / 2);

    sun.mass = 20000;

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      planet.gravitateTo(sun);
      planet.update();

      context.beginPath();
      context.fillStyle = 'yellow';
      context.arc(sun.position.getX(), sun.position.getY(), 40, 0, Math.PI * 2, false);
      context.fill();

      context.beginPath();
      context.fillStyle = 'blue';
      context.arc(planet.position.getX(), planet.position.getY(), 10, 0, Math.PI * 2, false);
      context.fill();

      requestAnimationFrame(update);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
