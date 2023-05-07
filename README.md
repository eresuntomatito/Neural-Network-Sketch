# Neural-Network-Sketch
An sketch of a neural network in P5.js
This code is a simple simulation of a neural network. It represents neurons as circles with dendrites and synapses as lines between neurons. The program allows you to interact with the neural network by adding and activating neurons with the mouse.

For a neurology student, this code may serve as a useful visualization tool for understanding the basic structure of neurons and synapses and how they interact to form a neural network. It could also be a helpful tool for exploring the effects of changing the parameters of the simulation, such as the force or maximum connection distance, on the behavior of the network.

However, it is important to note that this simulation is a highly simplified representation of the complex processes that occur in a real neural network. Therefore, it should not be used as a substitute for in-depth study of the human nervous system and its functions.

This code is written in JavaScript and uses the p5.js library for creating interactive graphics. The code defines two classes: Neuron and Synapse. It also defines four functions: setup(), draw(), mouseClicked(), and mouseReleased().

The Neuron class represents a neuron in a neural network. Each neuron has a position, velocity, acceleration, size, and active state. The class has three methods: applyForce(), update(), and display(). The applyForce() method adds a force to the neuron's acceleration. The update() method updates the neuron's position and velocity based on its acceleration and limits the velocity. The display() method draws the neuron on the canvas.

The Synapse class represents a synapse in a neural network. Each synapse has a presynaptic neuron and a postsynaptic neuron. The class has one method: display(). The display() method draws the synapse on the canvas.

The setup() function is called once when the program starts. It creates a canvas with the width and height of the window.

The draw() function is called repeatedly in a loop. It clears the canvas, calculates and applies attraction forces between neurons, updates and displays neurons, and displays synapses.

The mouseClicked() function is called when the mouse is clicked. It creates a new neuron at the mouse position and creates synapses with existing neurons that are within a certain distance.

The mouseReleased() function is called when the mouse button is released. It finds the nearest neuron to the mouse position and toggles its active state.
