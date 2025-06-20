let thoughts = [];
let spotlight;
let spotlightRadius = 100;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 10; i++) {
    thoughts.push(new Thought(random(width), random(height)));
  }
}

function draw() {
  background(30);
  
  // Spotlight (прожектор)
  spotlight = createVector(mouseX, mouseY);
  noFill();
  stroke(255, 255, 100);
  strokeWeight(2);
  ellipse(spotlight.x, spotlight.y, spotlightRadius * 2);

  // Draw thoughts
  for (let t of thoughts) {
    t.update(spotlight, spotlightRadius);
    t.display();
  }
}

class Thought {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.active = false;
    this.baseColor = color(100, 100, 255);
    this.activeColor = color(255, 200, 0);
  }

  update(spotlight, radius) {
    let d = dist(this.pos.x, this.pos.y, spotlight.x, spotlight.y);
    this.active = d < radius;
  }

  display() {
    noStroke();
    fill(this.active ? this.activeColor : this.baseColor);
    ellipse(this.pos.x, this.pos.y, this.active ? 40 : 25);
  }
}