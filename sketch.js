var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg

var obstacleTop,obstacleTopImg1,obstacleTopImg2
var obstacleBottom,obstacleBottom1Img,obstacleBottom2Img,obstacleBottom3Img

var gameOver,gameOverImg
var restart,restartImg

var score = 0;

var PLAY=1
var END = 0 
var gameState = PLAY;

var jumpSound
var dieSound


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obstacleTopImg1  = loadImage("assets/obsTop1.png")
obstacleTopImg2  = loadImage("assets/obsTop2.png")
obstacleBottom1Img = loadImage("assets/obsBottom1.png")
obstacleBottom2Img = loadImage("assets/obsBottom2.png")
obstacleBottom3Img = loadImage("assets/obsBottom3.png")

gameOverImg = loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")

jumpSound = loadSound("assets/jump.mp3")
dieSound = loadSound("assets/die.mp3")
}

function setup(){
createCanvas(700,700)

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(350,690,800,20);
bottomGround.visible = false;

topGround = createSprite(350,50,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(200,420,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.25;

gameOver = createSprite(370,350)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.7
gameOver.visible= false

restart = createSprite(370,390)
restart.addImage(restartImg)
restart.scale = 0.7
restart.visible = false

obstaclesTopGroup = new Group()
obstaclesBottomGroup = new Group()
barGroup = new Group()

}

function draw() {
  
  background("black");
        
  if(gameState === PLAY){
     //making the hot air balloon jump
     if(keyDown("space")) {
      balloon.velocityY = -6 ;
      jumpSound.play()
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;

     spawnObstaclesTop()
     spawnObstaclesBottom()
     Bar()

     if(obstaclesTopGroup.isTouching(balloon) || obstaclesBottomGroup.isTouching(balloon)
     || balloon.isTouching(topGround) || balloon.isTouching(bottomGround)){
      gameState = END;
      dieSound.play()
     }

  }

  if(gameState === END){

    gameOver.visible = true
    gameOver.depth += 1

    restart.visible = true
    restart.depth += 1

    balloon.velocityX = 0
    balloon.velocityY = 0
    obstaclesTopGroup.setVelocityXEach(0)
    obstaclesBottomGroup.setVelocityXEach(0)

    obstaclesTopGroup.setLifetimeEach(-1)
    obstaclesBottomGroup.setLifetimeEach(-1)

    barGroup.setVelocityXEach(0)

    balloon.y = 200

    if(mousePressedOver(restart)){
      reset()
    }
  }
  drawSprites();
  Score()  
}

function reset(){
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false
  obstaclesTopGroup.destroyEach()
  obstaclesBottomGroup.destroyEach()
  score = 0 
}

function spawnObstaclesTop(){
  if(World.frameCount % 60 === 0){
    obstacleTop = createSprite(700,150,40,50)
    obstacleTop.velocityX = -4
    obstacleTop.scale = 0.15
    obstacleTop.y = Math.round(random(10,300))


    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacleTop.addImage(obstacleTopImg1)
              break;
      case 2: obstacleTop.addImage(obstacleTopImg2)
              break;
      default: break
    }

    obstacleTop.lifetime = 300;
    balloon.depth += 1

    obstaclesTopGroup.add(obstacleTop)

    
  }
}

function spawnObstaclesBottom(){
  if(World.frameCount % 60 === 0){
    obstacleBottom = createSprite(700,650,40,50)
    obstacleBottom.velocityX = -4
    obstacleBottom.scale = 0.15
    

    var rand = Math.round(random(1,3))
    switch(rand){
      case 1: obstacleBottom.addImage(obstacleBottom1Img)
              break;
      case 2: obstacleBottom.addImage(obstacleBottom2Img)
              break;
      case 3: obstacleBottom.addImage(obstacleBottom3Img)
      default: break
    }

    obstacleBottom.lifetime = 300
    balloon.depth += 1

    obstaclesBottomGroup.add(obstacleBottom)
  }
}

function Bar(){
  if(World.frameCount % 60 === 0){
    var bar = createSprite(400,200,10,800)
    bar.velocityX = -6
    bar.depth = balloon.depth
    bar.lifetime = 70
    bar.visible = false
    barGroup.add(bar)
  }
}

function Score(){
  if(balloon.isTouching(barGroup)){
    score = score + 1
  }

  textFont("algerian")
  textSize(30)
  fill("red")
  text("Score: "+ score,250,50)
}

