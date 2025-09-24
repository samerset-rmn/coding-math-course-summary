import Particle from '../_utils/particle.js';
import Vector from '../_utils/vector.js';
import utils from '../_utils/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    for (let index = 0; index < 100; index++) {
      context.beginPath();
      context.moveTo(Math.random() * width, Math.random() * height); // place the random starting point of the line
      context.lineTo(Math.random() * width, Math.random() * height); // place the random end point of the line
      context.stroke(); // draw the line
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
