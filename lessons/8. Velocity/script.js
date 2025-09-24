import Particle from '../../utils/particle.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // We can move this code into a standalone Particle library, because this functionality is very common
    // const position = new Vector(100, 100);
    // const velocity = new Vector(0, 0);
    // // 3 pixels per frame (pretty slow)
    // velocity.setLength(3);
    // // 30 degrees
    // velocity.setAngle(Math.PI / 6);

    const singleParticle = new Particle(100, 100, 15, Math.PI / 6);
    const particles = Array.from({ length: 150 }).map(() => {
      return new Particle(Math.random() * width, Math.random() * height, Math.random() * 3, Math.random() * Math.PI * 2);
    });

    update();

    function update() {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => changeParticlePosition(context, { particle, width, height }));

      context.fillStyle = 'red';
      changeParticlePosition(context, { particle: singleParticle, width, height });
      context.fillStyle = 'black';

      requestAnimationFrame(update);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function changeParticlePosition(context, { particle, width, height }) {
  const x = particle.position.getX(),
    y = particle.position.getY(),
    particleSize = 10;

  // Bounce off the walls
  if (x + particleSize >= width || x - particleSize <= 0) {
    particle.velocity.setX(particle.velocity.getX() * -1);
  }
  if (y + particleSize >= height || y - particleSize <= 0) {
    particle.velocity.setY(particle.velocity.getY() * -1);
  }

  particle.update();
  context.beginPath();
  context.arc(x, y, particleSize, 0, Math.PI * 2, false);
  context.fill();
}
