var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var cercles = [];

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.position = vec2.fromValues(x, y);
    var vx = Math.random() * 2 - 1;
    var vy = Math.random() * 2 - 1;
    this.velocity = vec2.fromValues(vx, vy);
  }
  create() {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "#FFF";
    ctx.translate(this.position[0], this.position[1]);
    ctx.arc(0, 0, this.r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
    ctx.closePath();

    for (var i = 0; i < cercles.length; i++) {

      var pointA = cercles[i];
      var positionA = {
        xA : pointA.position[0],
        yA : pointA.position[1]
      }

      for (var j = 0; j < cercles.length; j++) {
        var pointB = cercles[j];
        var positionB = {
          xB : pointB.position[0],
          yB : pointB.position[1]
        }

        var s1 = positionA.xA - positionB.xB;
        var s2 = positionA.yA - positionB.yB;
        var hyp = Math.sqrt( s1*s1 + s2*s2);

        if (hyp < 150) {
          ctx.globalAlpha = 1-(hyp/150);
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.moveTo(positionA.xA, positionA.yA);
          ctx.lineTo(positionB.xB, positionB.yB);
          ctx.stroke();
        }

      }

    }

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
  var cercle = new Circle (x, y, 5);
  cercles.push( cercle );
}

function frame() {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < cercles.length; i++) {
    var cercle = cercles[i];
    cercle.update();
    cercle.create();
  }

  requestAnimationFrame ( frame );
}

frame();
