var snakes = [];
var scl = 20;

var food;

function setup() {
  createCanvas(600, 600);
  //snakes = new Snake();
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function httpGetReq(theUrl, callback)
{
  var request = new XMLHttpRequest();
  request.open("GET", theUrl, true);
  request.send(null);
  request.onreadystatechange = function() {
  if (request.readyState == 4)
  {
    callback(request.responseText);
  }
  };
}

function getSnakesCount(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", './getSnakesCount', false ); // false for synchronous request
  xmlHttp.send( null );
  var snakesCount = xmlHttp.responseText;
  console.log('snakesCountxx: ' + snakesCount);
  return snakesCount;
}


function updateSnakesState(snakesCount) {
  for(var i = 0; i < snakesCount; i++)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", './directionGet?key=' + i, false ); // false for synchronous request
      xmlHttp.send( null );
      var inData = xmlHttp.responseText;
      console.log('inData: ' + inData);
      switch(inData.split("&")[0])
      {
        case '1':
          snakes[i].dir(0, -1); //UP
          break;
        case '2':
          snakes[i].dir(-1, 0); //LEFT
          break;
        case '3':
          snakes[i].dir(1, 0); //RIGHT
          break;
        case '4':
          snakes[i].dir(0, 1); //DOWN
          break;
      }
      snakes[i].name = inData.split("&")[1];
}
}

function mousePressed() {
  s.total++;
}

function draw() {
  background(51);

  var snakesCount = getSnakesCount();
  console.log('snakes.length: ' + snakes.length);
  console.log('snakesCountaa: ' + snakesCount);
  if(parseInt(snakes.length) < parseInt(snakesCount))
  {
    console.log('new snake incomingasfdLLOL');
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    snakes[snakes.length] = new Snake( floor(random(cols))*scl,floor(random(rows))*scl );
  }

  updateSnakesState(snakesCount);
  document.getElementById('scores').innerHTML = "";

  for(var i = 0; i < snakesCount; i++)
  {
    if (snakes[i].eat(food)) {
    pickLocation();
    }
    snakes[i].death();
    snakes[i].update();
    snakes[i].show();
    if(snakes[i].name != null)
    document.getElementById('scores').innerHTML += (snakes[i].name + ': ' + snakes[i].tail.length + '</br>');

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
  }
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }

}