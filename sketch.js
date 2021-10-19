var runner, runnerImg;
var ground;
var back, backImg;
var obstacle, ob1, ob2, ob3, ob4;
var PLAY = 1,
  END = 0;
var gameState = PLAY;
var score = 0;
var obG;
var cross, crossImg;

function preload() {
  ob1 = loadImage("rock.png");
  ob2 = loadImage("car.png");
  ob3 = loadImage("ninja.png");
  ob4 = loadImage("dog.png");
  backImg = loadImage("overworld.jpg");
  crossImg = loadImage("cross.png");
  runnerImg = loadImage("runner.png");
}

function setup() {
  createCanvas(800, 600);
  runner = createSprite(45, 500, 50, 50);
  runner.addImage(runnerImg);
  runner.scale = 0.1;

  ground = createSprite(400, 540, 800, 10);
  ground.visible = false;

  back = createSprite(400, 280, 2000, 10);
  back.addImage("dc", backImg);

  cross = createSprite(400, 330, 10, 10);
  cross.visible = false;
  cross.addImage(crossImg);
  cross.scale = 0.75;

  obG = new Group();

}

function draw() {
  background(255);

  if (gameState === PLAY) {

    score = Math.round(frameCount/4);

    runner.collide(ground);

    if (back.x < 250) {
      back.x = 600;
    }

    back.velocityX = -4;
    back.depth = runner.depth - 1;

    if (runner.y >= 400) {
      //runner.changeAnimation("running", mario_run2);
    }

    if ((keyDown("UP_ARROW") || keyDown("SPACE")) && (runner.y >= 400)) {
      runner.velocityY = -15;
      //runner.changeAnimation("jumping", mario_jump2);
    }

    runner.velocityY += 0.5;

    //camera.velocityX = runner.velocityX;

    obstacles();

    if(runner.isTouching(obG)||(runner.y > ground.y)){
      gameState = END; 
      cross.visible = true;
    }

  }

  if(gameState === END){
    obG.setLiftimeEach = -1;
    obG.setVelocityEach(0, 0);
    back.velocityX = 0;
  }

  drawSprites();

  textSize(30);
  text("Score = "+score, 20, 40);

}

function obstacles() {

  if (frameCount % 150 === 0) {
    obstacle = createSprite(900, 520, 10, 10);
    obstacle.depth = runner.depth - 1;
    obstacle.lifetime = 700;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: obstacle.addImage(ob1);
        break;
      case 2: obstacle.addImage(ob2);
        break;
      case 3: obstacle.addImage(ob3);
        break;
      case 4: obstacle.addImage(ob4);
        break;
      default: break;
    }
    obstacle.scale = 0.2;
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 0, 100, 200);
    obstacle.velocityX = -4;
    obG.add(obstacle);
  }
}
