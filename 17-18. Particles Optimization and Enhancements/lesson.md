# Particles Optimization

Lesson videos: 
- https://youtu.be/0l2HOznfl3w
- https://youtu.be/JECGt_yZ8AY

In this lessons we'll create a new more optimized and enhanced version of our [old particle class](../_utils/particle.js) – [Particle2](../_utils/particle2.js).

## Vectors

Vectors are a good abstraction to describe position, velocity, acceleration and other things. But they come with a cost of performance.

For example, in order to get a particle's position on the x-axis, we have to call `particle.position.getX()`. That means JS has to get the particle object, get the position property, then call getX() method, which returns a number. Would be better if we could access the x-axis directly – `position.x`. 

The same with velocity. And it would be more clear to have methods like `particle.getSpeed()` rather than the abstract `particle.velocity.getLength()`.

So we're gonna remove the Vector dependency from Particle2 class.

## New methods

Due to the previous refactor we now lost the ability to easily set and get the length and angle of the velocity. We're going to add new methods to our new Particle2 class that will allow us to easily perform common operations on velocity without repeating the same code over and over again. Also, we are going to give these new methods a better names that will be less vague – say instead of `particle.setAngle()` we will define `particle.setHeading()` (direction).

We can also store arrays of springs and gravitations inside the Particle2 class, so we don't have to manually call `particle.springTo()` and `particle.gravitateTo()` on every frame.