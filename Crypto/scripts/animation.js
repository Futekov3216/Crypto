var Particle;
// var Line;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(153);
  frameRate(1);
  Particle = new Particle();
  Line = new Line();
}


  function draw() {
    console.log(Particle.ellipse);
    console.log(Line);
    x = floor(random(windowWidth));
    y = floor(random(windowHeight));
    Particle.display();
    Line.display();
  }

// setTimeout(Draw, 20000);
  function Particle(){
    this.diameter = 5;

      this.display = function() {
      this.x = x;
      this.y = y;
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  };
  function Line(){
      this.display = function() {
      this.x = x;
      this.y = y;
      line(this.x, this.y, this.x, this.y);
    }
  };
