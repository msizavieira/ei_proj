let synth;
let isDrawing = false;
let selectedMode = 'white';
let clr = 'white';


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  let redclr = createButton('Red');
  redclr.position(0,0);
  let greenclr = createButton('Green');
  greenclr.position(40,0);
  let whiteclr = createButton('White');
  whiteclr.position(93,0);
  let blueclr = createButton('Blue');
  blueclr.position(143,0);
  let clearButton = createButton("Clear");
  clearButton.position(200, 0);
  
  greenclr.mousePressed(() => synthclrsetup('green'));
  redclr.mousePressed(() => synthclrsetup('red'));
  whiteclr.mousePressed(() => synthclrsetup('white'));
  blueclr.mousePressed(() => synthclrsetup('blue'));
  clearButton.mousePressed(() => {background(0)});

  // Setup a basic synth
  synth = new Tone.MonoSynth().toDestination();
  
}

function synthclrsetup(clr) {
  if (synth) synth.dispose();
  
  if (clr === 'red'){
    synth = new Tone.FMSynth().toDestination();
  }else
  if (clr === 'green'){
    synth = new Tone.DuoSynth().toDestination();
  }else
  if (clr === 'white'){
    synth = new Tone.MonoSynth().toDestination();
  }else
  if (clr === 'blue') {
    synth = new Tone.AMSynth().toDestination();
  }
  
  selectedMode = clr;
  console.log(clr);
}

function touchMoved() {
  // Calculate movement speed
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  let speed = sqrt(dx * dx + dy * dy);
  // Map movement to sound parameters
  let freq = map(mouseX, 0, width, 220, 880);
  let velocity = map(speed, 0.01, 10, 0.01, 1.0);
  velocity = constrain(velocity, 0.1, 1.0);
  let strwgt = map(speed, 1, 10, 1, 10);
  strwgt = constrain(strwgt, 1, 10);
  
  synth.triggerAttackRelease(freq, 0.05, undefined, velocity);
  
  // Draw path
  stroke(selectedMode);
  strokeWeight(strwgt);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

/*function touchStarted() {
  isDrawing = true;
  Tone.start();
}

function touchEnded() {
  isDrawing = false;
}*/