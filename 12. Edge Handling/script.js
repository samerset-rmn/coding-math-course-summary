import Particle from '../_utils/particle.js';

let animationFrame;
const edgeHandlingFunctions = {
  1: wrapping,
  2: removal,
  3: regeneration,
  4: bouncing
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

      edgeHandlingFunctions[functionType](context, width, height);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

/**
 * Wrapping a particle around the edges
 */
function wrapping(context, width, height) {
  const particle = new Particle(width / 2, height / 2, 10, Math.random() * Math.PI * 2);
  particle.radius = 20;

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    particle.update();

    const x = particle.position.getX(),
      y = particle.position.getY();

    context.beginPath();
    context.arc(x, y, particle.radius, 0, Math.PI * 2, false);
    context.fill();

    // Take object radius into account for a smoother transition between the edges
    if (x - particle.radius >= width) {
      particle.position.setX(0 - particle.radius);
    }
    if (x + particle.radius <= 0) {
      particle.position.setX(width + particle.radius);
    }
    if (y - particle.radius >= height) {
      particle.position.setY(0 - particle.radius);
    }
    if (y + particle.radius <= 0) {
      particle.position.setY(height + particle.radius);
    }

    animationFrame = requestAnimationFrame(update);
  }
}

/**
 * Removing particles that go off the edges
 */
function removal(context, width, height) {
  let particles = [];
  for (let i = 0; i < 500000; i++) {
    const p = new Particle(width / 2, height / 2, Math.random() * 5 + 2, Math.random() * Math.PI * 2);
    p.radius = 2;
    particles.push(p);
  }

  let lastTimeStamp = 0;

  update();

  function update(timestamp) {
    context.clearRect(0, 0, width, height);

    // Rendering particles
    particles.forEach((p) => {
      p.update();
      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
      context.fill();
    });

    // Removing off-screen particles
    particles = particles.filter((p) => {
      return !(p.position.getX() - p.radius >= width || p.position.getX() + p.radius <= 0 || p.position.getY() - p.radius >= height || p.position.getY() + p.radius <= 0);
    });

    // Displaying counters of particles and fps
    const fps = parseInt(1000 / (timestamp - lastTimeStamp));
    context.font = `24px serif`;
    context.fillStyle = particles.length === 0 ? 'black' : 'blue';
    context.fillText('Particles: ' + particles.length, width / 2 - 100, height / 2);
    context.fillStyle = fps < 30 || isNaN(fps) ? 'red' : 'green';
    context.fillText('FPS: ' + fps, width / 2 - 100, height / 2 + 30);
    context.fillStyle = 'black';

    lastTimeStamp = timestamp;
    animationFrame = requestAnimationFrame(update);
  }
}

/**
 * Regenerating (reusing) particles that go off the edges
 */
function regeneration(context, width, height) {
  let particles = [];
  for (let i = 0; i < 100; i++) {
    const p = new Particle(width / 2, height, Math.random() * 8 + 5, -Math.PI / 2 + (Math.random() * 0.2 - 0.1), 0.1);
    p.radius = Math.random() * 10 + 2;
    particles.push(p);
  }

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();

      const x = p.position.getX(),
        y = p.position.getY();

      context.beginPath();
      context.arc(x, y, p.radius, 0, Math.PI * 2, false);
      context.fill();

      // In this scenario we don't need to cover X boundaries, because this "particles fountain" shoots straight up
      if (y - p.radius >= height || y + p.radius <= 0) {
        p.position.setX(width / 2);
        p.position.setY(height);
        p.velocity.setLength(Math.random() * 8 + 5);
        p.velocity.setAngle(-Math.PI / 2 + (Math.random() * 0.2 - 0.1));
      }
    });

    animationFrame = requestAnimationFrame(update);
  }
}

/**
 * Bouncing particle that goes off the edges
 */
function bouncing(context, width, height) {
  const particle = new Particle(width / 2, height / 2, 5, Math.PI * 2, 0.5);
  particle.radius = 20;
  particle.bounce = -0.7; // Particle will lose 30% of its velocity when it hits the edges

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    particle.update();

    const x = particle.position.getX(),
      y = particle.position.getY();

    context.beginPath();
    context.arc(x, y, particle.radius, 0, Math.PI * 2, false);
    context.fill();

    // right
    if (x + particle.radius > width) {
      particle.position.setX(width - particle.radius);
      particle.velocity.setX(particle.velocity.getX() * particle.bounce);
    }
    // left
    if (x - particle.radius < 0) {
      particle.position.setX(particle.radius);
      particle.velocity.setX(particle.velocity.getX() * particle.bounce);
    }
    // bottom
    if (y + particle.radius > height) {
      particle.position.setY(height - particle.radius);
      particle.velocity.setY(particle.velocity.getY() * particle.bounce);
    }
    // top
    if (y - particle.radius < 0) {
      particle.position.setY(particle.radius);
      particle.velocity.setY(particle.velocity.getY() * particle.bounce);
    }

    animationFrame = requestAnimationFrame(update);
  }
}
