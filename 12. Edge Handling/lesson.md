# Edge Handling

Lesson video: https://youtu.be/11ZmRlR7sOQ

Today we will be covering some strategies for handling objects that move off the boundaries.

## Wrapping

Wrapping is a simple way to handle the edges. We can wrap the object around the edges of the canvas. For example. if it goes off the left edge, we can set its position to the right edge, and vice versa.

## Removal

There are different ways how to handle the actual removal – we can check and remove in the main render loop, or in a separate loop, or build a separate list of particles to remove later. We will go with a simple check and remove loop, but it doesn't really matter what we choose as long as we remove particles from the list.

## Regeneration

This strategy can be useful for what is sometimes called a "particle emitter". The emmiter usually is some kind of object that has a specific location and that emits particles.

In this method, if a particle goes outside of the screen we recycle it and send it back to the emitter. This way we're reusing objects instead of creating and destroying them.

## Bouncing

This strategy was implemented in the lesson "8. Velocity". Instead of wrapping an object when it goes slightly off screen, we bounce it right after its side touches the edge. 

It can be easily achieved by inverting the X and Y axis of the velocity vector. But we also have to reset the position of the particle to the position of the edge it hits, because in some cases the particle will not be able to accelerate enough to place itself within the bounds, causing it to infinitely bounce on the brink of the edge. Like, by resettining the position we give the particle enough space to bounce off (enough position to be changed by velocity), otherwise if we keep keep the position unchanged the particle will keep bouncing back and forth with the same amplitude (e.g. -5,5,-5,5,-5...).