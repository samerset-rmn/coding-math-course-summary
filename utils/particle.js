import Vector from './vector.js';

class Particle {
  velocity = null;
  position = null;
  gravity = null;
  mass = 1; // Arbitrary unit of mass
  radius = 0; // Will be useful when checking for collisions
  bounce = -1;
  friction = 1;

  constructor(x, y, speed, direction, gravity = 0) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);

    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);

    this.gravity = new Vector(0, gravity);

    return this;
  }

  // Particle knows how to add its own velocity to its position
  update() {
    this.velocity.multiplyBy(this.friction); // Performant but not accurate way to simulate friction (read more in lesson 13)
    this.velocity.addTo(this.gravity); // Gravity 1. We can either store gravity in the particle and change it internally
    this.position.addTo(this.velocity);
  }

  // Gravity 2. Or we can change the gravity externally
  accelerate(acceleration) {
    this.velocity.addTo(acceleration);
  }

  angleTo(p2) {
    return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
  }

  distanceTo(p2) {
    const dx = p2.position.getX() - this.position.getX(),
      dy = p2.position.getY() - this.position.getY();

    // Pythagorean theorem
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Lesson 11
  gravitateTo(p2) {
    const gravity = new Vector(0, 0),
      distance = this.distanceTo(p2);

    gravity.setLength(p2.mass / (distance * distance));
    gravity.setAngle(this.angleTo(p2));

    this.accelerate(gravity);
  }
}

export default Particle;
