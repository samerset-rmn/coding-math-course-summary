import Particle from '../_utils/particle.js';
import Vector from '../_utils/vector.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particle = new Particle(100, height, 10, -Math.PI / 2);
    const acceleration = new Vector(0.1, 0.1);

    const fireworkParticles = Array.from({ length: 500 }).map(() => {
      return new Particle(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2, 0.1);
    });

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      particle.accelerate(acceleration);
      particle.update();
      context.beginPath();
      context.arc(particle.position.getX(), particle.position.getY(), 10, 0, Math.PI * 2, false);
      context.fill();

      fireworkParticles.forEach((p) => {
        p.update();
        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), 2, 0, Math.PI * 2, false);
        context.fill();
      });

      requestAnimationFrame(update);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
