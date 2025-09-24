document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Center of the circle around which an object will move
    const centerY = height * 0.5,
      centerX = width * 0.5;

    // How far to move the object from the center. Changing it will affect the amplitude of the wave.
    const moveOffset = height * 0.4;
    // How the radius of the circle will change
    const radiusOffset = 50;
    // How the alpha of the circle will change
    const alphaOffset = 0.5;

    // How fast to move the object back and forth (how fast we're incrementing the angle)
    const speed = 0.03;

    const baseRadius = 100;
    const baseAlpha = 0.5;

    let angle = 0;

    render();

    function render() {
      // Remember that sin() returns a value from -1 to 1. Multiplying it by the offset gives us a value from -offset to offset
      const y = centerY + Math.sin(angle) * moveOffset,
        x = centerX + Math.cos(angle) * moveOffset;
      const radius = baseRadius + Math.sin(angle) * radiusOffset;
      const alpha = baseAlpha + Math.sin(angle) * alphaOffset;

      context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      context.clearRect(0, 0, width, height);
      context.beginPath();
      // x, y, radius, startAngle, endAngle, counterClockwise
      context.arc(
        x,
        y,
        radius,
        0,
        // Math.PI * 2 is equal to 360 degrees (just Math.PI will give us half of the circle)
        Math.PI * 2,
        false
      );
      context.fill();

      angle += speed;

      requestAnimationFrame(render);
    }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
