// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); /*directly represents drawing area 
of canvas and allows us to draw shapes on it*/

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight; //variables = browser viewport

//helper function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//helper function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}; //RGB string

//class definition since all balls behave same way

class Ball {
    constructor(x, y, velX, velY, color, size)
    {
        this.x = x; //x coordinates on screen
        this.y = y;
        this.velX = velX; //horizontal velocity, added to x coord each frame
        this.velY = velY;
        this.color = color;
        this.size = size;
    };
    draw() { //adding method to class
        ctx.beginPath(); //draw shape on paper
        ctx.fillStyle = this.color; //defines color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); /*Using arc()
        method to trace arc shape on paper (arc center, radius, start & 
        end number of degrees around circle the arc is drawn between*/
        ctx.fill(); /*method to finish drawing path started in beginPath()
        and fill in area it takes up to color specified in fillStyle*/
    };
    update () { //note ball size factored in, else ball would go 1/2 off screen
        if ((this.x + this.size) >= width) { //if x coord > canvas width, ball going off ridge edge
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) { //if x coord is < 0 then ball going over left edge
            this.velX = -(this.velX);
        }
        if ((this.y + this.size) >= height) { //if y coord > canvas height, ball going off bottom edge
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) { //if y coord < 0, ball going off top edge
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    };
    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) { //checking if ball being looped is same ball, can't collide with self 
                const dx = this.x - ball.x; //this section checks if two circle areas overlap (collision)
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) { //if collision then this runs
                    ball.color = this.color = randomRGB();
                }
            };
        };
    };
};

const balls = []; //balls stored here

while (balls.length < 25) { /*creates new instance of Ball() using random() and randomRGB()
 then pushes it to end ball array if array length is less than 25*/
    const size = random(10,20);
    const ball = new Ball (
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );

    balls.push(ball);

};
/*Function below sets canvas fill color to black, uses fillRect to draw a rectangle of color
across the whole width & height of canavas*/
function loop () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';//start coordinate
    ctx.fillRect(0, 0, width, height);//this covers up previous frame's drawing b4 next is drawn

    for (const ball of balls) {  
        ball.draw(); //draws each ball on screen
        ball.update(); //update position and velocity
    }

    requestAnimationFrame(loop); /*when method repeatedly run and passed same fn, it runs the 
    fn a set number of times per second for smooth animation*/
    
    //need to call collisionDetect () method in each frame of the loop 
    function loop() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);
      
        for (const ball of balls) {
          ball.draw();
          ball.update();
          ball.collisionDetect();
        }
      
        requestAnimationFrame(loop);
      }
}
