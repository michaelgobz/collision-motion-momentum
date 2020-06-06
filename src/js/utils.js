function randomNumFromRange(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


/*  we do  some momentum reservstion
*/

/* the rotate function : basically what this function does is to get the angle of
rotation of the paticles that are adjcent  to each other
because we need to simulate elastic collison
*/

/* @params float
| velocity  | angle */

function rotate (velocity ,angle){
  const rotateVelocities = {
    x: velocity.x *  Math.cos(angle)  -  velocity.y * Math.sin(angle),
    y: velocity.x *  Math.sin(angle)  +  velocity.y * Math.cos(angle)
    }
    return rotateVelocities;
}

/* how to resolve the collisons of the two particles in context
we are simulaitng an elastic collision where the velocities have to change
based on the impact */

function resolveCollision(particle,otherParticle){
  // some house keeping
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
 // get the distances apart
   const xDist  = otherParticle.x - particle.x;
  const  yDist  = otherParticle.y - particle.y;

  // we pervent accidental overlap of the paticles
  if(xVelocityDiff * xDist  +  yVelocityDiff * yDist  >= 0){
   // we straight away grab the angle between them
   const angle = -Math.atan2(otherParticle.y - particle.y ,otherParticle.x - particle.x);
   // we grab the masses
   const mOne = particle.mass;
   const mTwo = otherParticle.mass;
   //we grab initial velocities here
   const u1 = rotate(particle.velocity , angle);
   const u2 = rotate(otherParticle.velocity , angle);

   //calculate for the  final velocities at which each particla will move  after the collision
   const v1 = {
     x:  u1.x * (mOne - mTwo) / (mOne + mTwo)
          + u2.x * 2 *mTwo /(mOne + mTwo) ,
     y:  u1.y
   }
   const v2 ={
     x: u2.x * (mOne - mTwo) / (mOne + mTwo)
        + u1.x * mTwo / (mOne + mTwo) ,
     y: u2.y
   }
 // then transform  the velocities along the original axis then get these particles going
  const finalV1 = rotate(v1 , -angle);
  const finalV2 = rotate(v2 , -angle);

  // we change the velocites to the finals
 // particle one
 particle.velocity.x = finalV1.x;
 particle.velocity.y = finalV1.y;
 // anotherParticle
 otherParticle.velocity.x = finalV2.x;
 otherParticle.velocity.y = finalV2.y;

  }
}

module.exports = { randomNumFromRange, randomColor, distance ,resolveCollision,rotate}
