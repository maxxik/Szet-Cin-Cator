var snakes = [];
var scl = 20;

var food;

function setup() {
  createCanvas(6000, 6000);
  //snakes = new Snake();
  frameRate(10);
  pickLocation();


  for(var i = 0; i < 50; i++)
  {
    console.log('new snake incomingasfdLLOL');
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    snakes[i] = new Snake(random(5)*scl, random(6)*i*scl);
  }
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed() {
  s.total++;
}

function draw() 
{
  background(51);
  document.getElementById('scores').innerHTML = "";
  for(var i = 0; i < snakes.length; i++)
  {
    if (snakes[i].eat(food)) 
    {
      pickLocation();
    }
    snakes[i].death();
    snakes[i].update();
    snakes[i].show();

    snakes[i].total += random(2) > 1 ? 1 : 0;

    if(snakes[i].name != null)
    document.getElementById('scores').innerHTML += (snakes[i].name + ': ' + snakes[i].tail.length + '</br>');

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
  }
}