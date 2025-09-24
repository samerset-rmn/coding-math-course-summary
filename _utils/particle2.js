/**
 * New optimized and enhanced version of _utils/particle.js.
 *
 * After lesson 17 this is the prefered way to define particles.
 */
class Particle2 {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  gravity = null;
  mass = 1;
  radius = 0;
  bounce = -1;
  friction = 1;
  /**
   * We want to be able to give a particle a spring point and say "you should always spring
   * to this point until we tell you otherwise" so we don't need to manually call springTo()
   * on every frame.
   */
  springs = [];
  /** The same goes for the gravity */
  gravitations = [];

  constructor(x, y, speed, direction, gravity = 0) {
    this.x = x;
    this.y = y;

    // Review lessons 2 and 3 if you don't understand how we set vx and vy
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;

    this.gravity = gravity;

    return this;
  }

  update() {
    if (this.springs.length > 0) {
      this.handleSprings();
    }
    if (this.gravitations.length > 0) {
      this.handleGravitations();
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    const header = this.getHeading();
    this.vx = Math.cos(header) * speed;
    this.vy = Math.sin(header) * speed;
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(heading) {
    const speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  distanceTo(p2) {
    const dx = p2.x - this.x,
      dy = p2.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x,
      dy = p2.y - this.y,
      distSQ = dx * dx + dy * dy,
      dist = Math.sqrt(distSQ),
      force = p2.mass / distSQ,
      /**
       * First idea would be to use Math.cos() and Math.sin() to get ax and ay.
       *
       * ```js
       * const angle = this.angleTo(p2);
       * ax = Math.cos(angle) * force
       * ay = Math.sin(angle) * force;
       * ```
       *
       * But if we look at the triangle two particles form (pretend this is a perfect right triangle):
       *
       *
       *         hypotenuse         p1
       *                _⎽⎽⎼⎼⎻⎻⎺⎺‾ |
       *      _⎽⎽⎼⎼⎻⎻⎺⎺‾           | dy
       * p0 ╱a_____________________|
       *              dx
       *
       *
       * Hypotenuse is the distance, `dx` is the adjacent side and `dy` is the opposite side, `a` is the angle.
       * Cosine of this angle is dx / distance and sine of this angle is dy / distance (see "Right Triangles" in lesson 2).
       * So there's no real reason to get this angle and then find it sin and cos. We can just divide values we already have.
       */
      ax = (dx / dist) * force,
      ay = (dy / dist) * force;

    this.vx += ax;
    this.vy += ay;
  }

  addGravitation(g) {
    this.removeGravitation(g); // Replace existing gravitation if it's already there
    this.gravitations.push(g);
  }

  removeGravitation(g) {
    this.gravitations = this.gravitations.filter((gravitation) => gravitation !== g);
  }

  handleGravitations() {
    this.gravitations.forEach((gravitation) => {
      this.gravitateTo(gravitation);
    });
  }

  springTo(point, k, length = 0) {
    const dx = point.x - this.x,
      dy = point.y - this.y,
      distance = Math.sqrt(dx * dx + dy * dy),
      springForce = (distance - length) * k;

    this.vx += (dx / distance) * springForce;
    this.vy += (dy / distance) * springForce;
  }

  addSpring(point, k, length = 0) {
    this.removeSpring(point); // Replace existing spring if it's already there
    this.springs.push({ point, k, length });
  }

  removeSpring(point) {
    this.springs = this.springs.filter((spring) => spring.point !== point);
  }

  handleSprings() {
    this.springs.forEach((spring) => {
      this.springTo(spring.point, spring.k, spring.length);
    });
  }
}

export default Particle2;
