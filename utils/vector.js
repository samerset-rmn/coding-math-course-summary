/**
 * More details about vectors can be found in lesson #6.
 */
class Vector {
  // Unit vector with angle (direction) 0 and length (magnitude) 1
  _x = 1;
  _y = 0;

  constructor(x = 1, y = 0) {
    this._x = x;
    this._y = y;
  }

  setX(x) {
    this._x = x;
  }
  getX() {
    return this._x;
  }

  setY(y) {
    this._y = y;
  }
  getY() {
    return this._y;
  }

  setAngle(angle) {
    const length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }
  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    const angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }
  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  // Vectors operations that return a new vector
  add(v2) {
    return new Vector(this._x + v2.getX(), this._y + v2.getY());
  }
  subtract(v2) {
    return new Vector(this._x - v2.getX(), this._y - v2.getY());
  }
  multiply(scalar) {
    return new Vector(this._x * scalar, this._y * scalar);
  }
  divide(scalar) {
    return new Vector(this._x / scalar, this._y / scalar);
  }

  // Vectors operations that alter the original vector
  addTo(v2) {
    this._x += v2.getX();
    this._y += v2.getY();
  }
  subtractFrom(v2) {
    this._x -= v2.getX();
    this._y -= v2.getY();
  }
  multiplyBy(scalar) {
    this._x *= scalar;
    this._y *= scalar;
  }
  divideBy(scalar) {
    this._x /= scalar;
    this._y /= scalar;
  }
}

export default Vector;
