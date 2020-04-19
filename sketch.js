var trex, trex_running,trex_collided;
var ground, ground_image;
var invisibleground;
var cloud,clouds_image,cloudsGroup;
var obstacle,obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var count = 0
var play= 1
var end= 0
var gamestate = play
var restart
var game_over
var restart_image
var game_over_image
var highScore = 0

function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadAnimation("trex_collided.png") 
ground_image = loadImage("ground2.png") 
clouds_image = loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  restart_image = loadImage("restart.png")
  game_over_image= loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  trex= createSprite (50,180,20,50);
  trex.addAnimation("running",trex_running)
   trex.addAnimation("collided",trex_collided)
  trex.scale= 0.5
  
  ground= createSprite(300,180,600,20)
  ground. addImage("ground",ground_image)
  
  invisibleground = createSprite(300,190,600,10)
  invisibleground.visible= false;
  
 cloudsGroup= new Group()
  
obstaclesGroup = new Group()
  
  game_over = createSprite(300,100,10,10)
  game_over.addImage("gameOver",game_over_image)
  game_over.scale= 0.4
  game_over.visible= false
  restart = createSprite(300,140,10,10)
    restart.addImage("restart",restart_image)
    restart.scale= 0.4
  restart.visible= false
}

function draw() {
  background(270);
  text("score:"+count,500,50)
  
  
  if(highScore>0) {
    text("High Score: "+highScore, 500,70)
     }
  
  if(gamestate==play) {
    
    count = count+Math.round(getFrameRate()/60)
    
  if(trex.isTouching(obstaclesGroup)) {
    gamestate = end
  }
  ground.velocityX= - (3 + 3*count/100);
  if(ground.x<0) {
  ground.x= ground.width/2
  }
  
  trex.collide(invisibleground)
  if(keyDown("space")&&trex.y>145){
    trex.velocityY= -10
  }
  trex.velocityY= trex.velocityY+0.8
  
  spawnClouds()
  spawnObstacles()
  } 
 else if(gamestate==end) {
   trex.velocityY = 0
   ground.velocityX = 0
   obstaclesGroup.setVelocityXEach(0)
   obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    cloudsGroup.setVelocityXEach(0)
   trex.changeAnimation("collided",trex_collided)
   restart.visible = true
   game_over.visible = true
   
   if(mousePressedOver(restart)) {
      reset()
     }
}
  
  drawSprites()
}

  

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(3 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    switch(rand){
      case 1: obstacle.addImage("obstacle1",obstacle1)
      break;
      
      case 2: obstacle.addImage("obstacle2",obstacle2)
      break;
      
      case 3: obstacle.addImage("obstacle3",obstacle3)
      break;
      
      case 4: obstacle.addImage("obstacle4",obstacle4)
      break;
      
      case 5: obstacle.addImage("obstacle5",obstacle5)
      break;
      
      case 6: obstacle.addImage("obstacle6",obstacle6)
      break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",clouds_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset() {
  gamestate = play
  restart.visible=false
  game_over.visible=false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  if(highScore < count) {
    highScore = count
  }
  count = 0
}