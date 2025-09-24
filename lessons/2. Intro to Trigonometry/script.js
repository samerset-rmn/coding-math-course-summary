document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    context.translate(0, height / 2);
    // Normally the sine wave goes up and down, but in this example it goes down and then up.
    // This is because in canvas the y-axis is inverted (top is negative, bottom is positive).
    // To make it "normal" we can invert the y-axis (kind of "flip" the canvas).
    context.scale(1, -1);

    // Math.PI * 2 is equal to 360 degrees
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
      const x = angle * 200;
      const y = Math.sin(angle) * 200;

      context.fillRect(x, y, 5, 5);
    }

    // for (let angle = 0; angle < 360; angle += 1) {
    //   const x = (angle * Math.PI / 180) * 200;
    //   const y = Math.sin(angle * Math.PI / 180) * 200;

    //   context.fillRect(x, y, 5, 5);
    // }
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
