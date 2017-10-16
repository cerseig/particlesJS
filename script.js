var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var rectangles = [];
var cercles = [];
var triangles = [];

document.addEventListener('mousemove', showCoords);

function showCoords(evt){
  console.log(
    "clientX value: " + evt.clientX + "\n" +
    "clientY value: " + evt.clientY + "\n"
  );
}


//faire un random des couleurs
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//dessiner une image (source de l'image, x, y ,resizeLargeur, resizeHauteur)
// ----> ctx.drawImage(img, 0, 0, img.width/2, img.height/2);
//redessiner une image à partir d'une image : img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight

// class constructeur pour un rectangle
class Rect {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = getRandomColor();
    this.position = vec2.fromValues(x, y);
    var vx = Math.random() * 5 - 1;
    var vy = Math.random() * 5 - 1;
    this.velocity = vec2.fromValues(vx, vy);
    this.rotate = Math.random() * Math.PI * 2;
  }

  create() {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }

  update() {
    vec2.add(this.position, this.position, this.velocity);
    if (this.position[0] > canvasWidth) {
      this.position[0] = canvasWidth;
      this.velocity[0] *= -1;
    }
    if (this.position[0] < 0) {
      this.position[0] = 0;
      this.velocity[0] *= -1;
    }
    if (this.position[1] > canvasHeight) {
      this.position[1] = canvasHeight;
      this.velocity[1] *= -1;
    }
    if(this.position[1] < 0) {
      this.position[1] = 0;
      this.velocity[1] *= -1;
    }
  }

}

// boucle for pour afficher 10 rectangles
for (var i = 0; i < 20; i++) {
  var x = Math.floor(Math.random()*1000);
  var y = Math.floor(Math.random()*1000);
  var width = Math.floor(Math.random()*100);
  var height = Math.floor(Math.random()*100)
  var rect = new Rect(x, y, width, height);
  rectangles.push( rect );
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = getRandomColor();
    this.position = vec2.fromValues(x, y);
    var vx = Math.random() * 2 - 1;
    var vy = Math.random() * 2 - 1;
    this.velocity = vec2.fromValues(vx, vy);
  }
  create() {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.arc(0, 0, this.r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }
  update() {
    vec2.add(this.position, this.position, this.velocity);
    if (this.position[0] > canvasWidth) {
      this.position[0] = canvasWidth;
      this.velocity[0] *= -1;
    }
    if (this.position[0] < 0) {
      this.position[0] = 0;
      this.velocity[0] *= -1;
    }
    if (this.position[1] > canvasHeight) {
      this.position[1] = canvasHeight;
      this.velocity[1] *= -1;
    }
    if(this.position[1] < 0) {
      this.position[1] = 0;
      this.velocity[1] *= -1;
    }
  }

}

// boucle for pour afficher 20 ronds
for (var i = 0; i < 50; i++) {
  var x = Math.floor(Math.random()*1000);
  var y = Math.floor(Math.random()*1000);
  var r = Math.floor(Math.random()*50);
  var cercle = new Circle (x, y, r);
  cercles.push( cercle );
}

function frame() {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (var i = 0; i < rectangles.length; i++) {
    var rect = rectangles[i];
    rect.update();
    rect.create();
  }
  for (var i = 0; i < cercles.length; i++) {
    var cercle = cercles[i];
    cercle.update();
    cercle.create();
  }

  requestAnimationFrame ( frame );
}

frame();


// class constructeur de triangle
class Triangle {
  constructor(x, y, x1, y1, x2, y2) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1= y1;
    this.x2 = x2;
    this.y2 = y2;
    ctx.beginPath();
    ctx.moveTo(x, y); // beginning point (x, y)
    ctx.lineTo(x1, y1); //dessiner le 1er trait (x1, y1)
    ctx.lineTo(x2, y2); // dessiner le 2ème trait en partant du point d'arrivé du 1er trait (x2, y2)
    ctx.fill(); //remplir
    ctx.closePath();
  }
}

// boucle for pour afficher 10 triangles
for (var i = 0; i < 10; i++) {
  var x = 75+i*30;
  var y = 50+i*30;
  var x1 = 100+i*30;
  var y1 = 75+i*30;
  var x2 = 100+i*30;
  var y2 = 25+i*30;
  var triangle1 = new Triangle(x, y, x1, y1, x2, y2);
  ctx.fillStyle = getRandomColor();
}
