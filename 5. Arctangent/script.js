document.addEventListener('DOMContentLoaded', () => {
  try {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const arrowX = width / 2,
      arrowY = height / 2,
      rotationSpeed = 0.01,
      rotationRadius = 400;

    let rotationAngle = 0,
      cursorX = 0,
      cursorY = 0,
      x,
      y;

    render();

    function render() {
      context.clearRect(0, 0, width, height);

      x = arrowX + Math.cos(rotationAngle) * rotationRadius;
      y = arrowY + Math.sin(rotationAngle) * rotationRadius;

      // dx, dy – distances between the arrow and the mouse cursor
      const dx = cursorX - x;
      const dy = cursorY - y;

      /**
       * We can use Math.atan(dy / dx), but there will be a problem that when the cursor is at the left side
       * the arrow will be pointing to the opposite, right side.
       *
       * To understand why this happens let's take a look at the graph:
       *                   y
       * -dy/-dx = +       |       -dy/dx = -
       *                   |
       *                  3|4
       * ------------------+-------------------- x
       *                  2|1
       *                   |
       * dy/-dx = -        |       dy/dx = +
       *
       * Math.atan() function doesn't know which quadrant (1st, 2nd, 3rd, 4th) we're in.
       * If we pass -0.5 it doesn't know if it's the result of -dy/dx or dy/-dx.
       * So it limits the angles it returns to quadrants 1st and 4th. That's why the arrow
       * always points to the right side.
       *
       * We could do some conditional logic to handle this, but there's an easier way – Math.atan2(), which accepts y and x separately.
       */
      const pointingAngle = Math.atan2(dy, dx);

      // Save the untransformed state of the context
      context.save();
      // Translate and rotate the context (not the arrow, but the context itself)
      context.translate(x, y);
      context.rotate(pointingAngle);

      context.beginPath();
      // Arrow's body
      context.moveTo(40, 0);
      context.lineTo(-40, 0);
      // Arrow's head
      context.moveTo(40, 0);
      context.lineTo(15, -15);
      context.moveTo(40, 0);
      context.lineTo(15, 15);
      context.stroke();

      // Restore the untransformed state of the context so other operations in it (if any) will not be affected
      context.restore();

      rotationAngle += rotationSpeed;

      requestAnimationFrame(render);
    }

    document.body.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
