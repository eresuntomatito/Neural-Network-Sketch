// Global variables
let neurons = [];
let synapses = [];
let force = 0.1;
let maxConnectionDistance = 150;

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Draw function
function draw() {
  background(240);

  // Calculate and apply attraction forces between neurons
  for (let i = 0; i < neurons.length; i++) {
    for (let j = i + 1; j < neurons.length; j++) {
      let forceDirection = p5.Vector.sub(neurons[j].position, neurons[i].position);
      let distance = forceDirection.mag();
      if (distance < maxConnectionDistance) {
        forceDirection.normalize();
        forceDirection.mult(force / distance);
        
        neurons[i].applyForce(forceDirection);
        forceDirection.mult(-1);
        neurons[j].applyForce(forceDirection);
      }
    }
  }

  // Update and display neurons
  for (let neuron of neurons) {
    neuron.update();
    neuron.display();
  }

  // Display synapses
  for (let synapse of synapses) {
    synapse.display();
  }
}

// MouseClicked function
function mouseClicked() {
  let newNeuron = new Neuron(mouseX, mouseY);
  neurons.push(newNeuron);

  // Create synapses with existing neurons
  for (let neuron of neurons) {
    if (neuron !== newNeuron) {
      let distance = p5.Vector.dist(neuron.position, newNeuron.position);
      if (distance < maxConnectionDistance) {
        let synapse = new Synapse(newNeuron, neuron);
        synapses.push(synapse);
      }
    }
  }
}


// Neuron class
class Neuron {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.size = 20;
    this.active = false;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(5); // Limit neuron speed
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);

    // Draw cell body
    fill(this.active ? 255 : 0);
    ellipse(0, 0, this.size);

    // Draw dendrites
    stroke(0, 0, 255);
    for (let i = 0; i < 8; i++) {
      let angle = TWO_PI / 8 * i;
      let x = this.size / 2 * cos(angle);
      let y = this.size / 2 * sin(angle);
      line(0, 0, x * 2, y * 2);
    }

    // Draw axon
    stroke(255, 0, 0);
    line(0, 0, this.size * 2, 0);

    // Draw myelin sheath
    fill(255, 255, 0);
    for (let i = 1; i < 4; i++) {
      ellipse(this.size * i, 0, this.size / 2);
    }

    // Draw Nodes of Ranvier
    fill(0, 255, 0);
    for (let i = 1; i < 4; i++) {
      ellipse(this.size * i - this.size / 4, 0, this.size / 4);
    }

    pop();
  
    // Draw axon terminal
    fill(255, 128, 0);
    ellipse(this.size * 2, 0, this.size / 2);
  }
}

// Synapse class
class Synapse {
  constructor(presynapticNeuron, postsynapticNeuron) {
    this.presynapticNeuron = presynapticNeuron;
    this.postsynapticNeuron = postsynapticNeuron;
  }

  display() {
    // Draw synaptic cleft
    stroke(0, 0, 255); //    
    line(
      this.presynapticNeuron.position.x + this.presynapticNeuron.size * 2,
      this.presynapticNeuron.position.y,
      this.postsynapticNeuron.position.x - this.postsynapticNeuron.size / 2,
      this.postsynapticNeuron.position.y
    );
    

    // Draw neurotransmitters
    if (this.presynapticNeuron.active) {
      let numTransmitters = 5;
      for (let i = 0; i < numTransmitters; i++) {
        fill(255, 0, 255);
        let tX = lerp(
          this.presynapticNeuron.position.x + this.presynapticNeuron.size * 2,
          this.postsynapticNeuron.position.x - this.postsynapticNeuron.size / 2,
          i / (numTransmitters - 1)
        );
        let tY = lerp(
          this.presynapticNeuron.position.y,
          this.postsynapticNeuron.position.y,
          i / (numTransmitters - 1)
        );
        ellipse(tX, tY, this.presynapticNeuron.size / 4);
      }
    }

    // Draw receptors on the postsynaptic neuron's dendrites
    let numReceptors = 5;
    for (let i = 0; i < numReceptors; i++) {
      fill(0, 255, 255);
      let rX = lerp(
        this.presynapticNeuron.position.x + this.presynapticNeuron.size * 2,
        this.postsynapticNeuron.position.x - this.postsynapticNeuron.size / 2,
        i / (numReceptors - 1)
      );
      let rY = this.postsynapticNeuron.position.y;
      ellipse(rX, rY, this.presynapticNeuron.size / 4);
    }
  }
}


// MouseReleased function
function mouseReleased() {
  // Find and activate the nearest neuron to the mouse click
  let minDistance = Infinity;
  let nearestNeuron = null;
  for (let neuron of neurons) {
    let distance = p5.Vector.dist(neuron.position, createVector(mouseX, mouseY));
    if (distance < minDistance) {
      minDistance = distance;
      nearestNeuron = neuron;
    }
  }

  if (nearestNeuron) {
    nearestNeuron.active = !nearestNeuron.active;
  }
}
