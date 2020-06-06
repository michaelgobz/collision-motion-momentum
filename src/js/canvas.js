import {randomNumFromRange, randomColor, distance ,resolveCollision} from './utils';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors =
['#2185C5',
'#7ECEFD',
'#FFF6E5',
 '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// Objects
  function Particle (x, y ,radius, color) {
    this.x = x;
    this.y = y;
    this.velocity ={
      x: randomNumFromRange(-3,3),
      y: randomNumFromRange(-3,3)
    }
    this.radius = radius;
    this.color = randomColor(colors);
    this.mass = randomNumFromRange(20,40);
    this.mouse ={
      x:undefined,
      y:undefined
    }

  this.draw = function draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = 'white';
    c.stroke()
    c.closePath()
  }

   this.update = function update() {
// we add a check for if the particles have collided
   for (let i = 0; i < particleArray.length; i++) {
    if(this === particleArray[i]){
      continue;
    }
    if(distance(this.x ,this.y ,particleArray[i].x ,
      particleArray[i].y) - this.radius * 2 < 0){
        //  we reslove the collision so that we get the elastic collision
        resolveCollision(this,particleArray[i]);
      }
   }
   // we interact with the canvas
   if(mouse.x - this.x < 100
    && mouse.x - this.x > -100
    &&mouse.y - this.y < 100
    && mouse.y - this.y > -100){
       c.fill();
      console.log(this.mouse.x);
    }

    if(this.x + this.radius >= innerWidth ||
      this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x;
    }
    if(this.y + this.radius >= innerHeight ||
      this.y - this.radius <= 0){
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw()
  }
}

// Implementation of the particle

var particleArray;
function init() {
  particleArray  = [];

  for (let i = 0; i < 100; i++) {
    var x = randomNumFromRange(0,canvas.width);
    var y = randomNumFromRange(0,canvas.height);
    var radius = randomNumFromRange(5,20)
    if(i!== 0){
      for (let j = 0; j < particleArray.length; j++) {
        if(distance(x , y, particleArray[j].x , particleArray[j].y) - radius * 2 < 0){
          x = randomNumFromRange(0,canvas.width);
          y = randomNumFromRange(0,canvas.height);
          j = -1;
        }
      }
    }
    particleArray.push( new Particle(x , y ,radius));
  }

}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)
 particleArray.forEach(particle => {
  particle.update();
 });

}

init();
animate();
