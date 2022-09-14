// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); /*directly represents drawing area 
of canvas and allows us to draw shapes on it*/

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight; //variables = browser viewport

//helper function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; //Why +1? so we don't have 0.
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
    }
    draw() { //adding method to class
        ctx.beginPath(); //draw shape on paper
        ctx.fillStyle = this.color; //defines color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); /*Using arc()
        method to trace arc shape on paper (arc center, radius, start & 
        end number of degrees around circle the arc is drawn between*/
        ctx.fill(); /*method to finish drawing path started in beginPath()
        and fill in area it takes up to color specified in fillStyle*/
    }
}