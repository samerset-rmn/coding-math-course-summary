import Vector from '../../utils/vector.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    context.translate(width / 2, height / 2);

    const v1 = new Vector(10, 5),
      v2 = v1.multiply(2);

    console.log(v1.getLength(), v2.getLength());
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
