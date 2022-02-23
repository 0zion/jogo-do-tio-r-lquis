var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudimg
var obstacle1, obstacle2 ,obstacle3 ,obstacle4 ,obstacle5,obstacle6, obstaculo
var obstacleg, cloudg
var gamestate = "vivo"
var score;
var trexcollided
var gameover, gameoverimg, restart, restartimg

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimg=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trexcollided=loadAnimation("trex_collided.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  obstacleg=new Group ()
  cloudg=new Group ()
  //crie um sprite de trex
  trex = createSprite(50,height-90,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale =0.5;
  trex.addAnimation("collided", trexcollided)
 score=0
  //crie sprite ground (solo)
  ground = createSprite(200,height-100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  gameover=createSprite(width/2, height/ 2)
  gameover.addImage(gameoverimg)
  restart=createSprite (width/2, height/ 2+50)
  restart.addImage(restartimg)
  gameover.scale=2
  restart.scale=0.5
  //crie um solo invisível
  invisibleGround = createSprite(200,height-90,400,10);
  invisibleGround.visible = false;
  gameover.visible=false
  restart.visible=false
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //definir cor do plano de fundo
  background(180);
  text ("Pontuação: "+score ,width/2,100)
  console.log(trex.y)
  trex.debug=true 
  trex.setCollider("circle", 0, 0, 40)
  if (gamestate=="vivo") {
    if(keyDown("space")&& trex.collide(invisibleGround)) {
      trex.velocityY = -11.2;
    }
    spawnClouds()
    spawnObstacles()
    ground.velocityX = -4;
    if(trex.isTouching(obstacleg)){
      gamestate= "morto"
    }
    score=score+Math.round(getFrameRate()/60)
  }
  else if (gamestate=="morto") { 
    ground.velocityX = 0;
    obstacleg.setVelocityXEach(0)
    cloudg.setVelocityEach(0)
    trex.changeAnimation("collided", trexcollided)
    cloudg.setLifetimeEach(-1)
    obstacleg.setLifetimeEach(-1)
    trex.velocityY=-0
    gameover.visible=true
    restart.visible=true
    if (mousePressedOver(restart)){
      obstacleg.destroyEach()
      cloudg.destroyEach()
      gamestate="vivo"
      gameover.visible=false
      restart.visible=false
      score=0
      trex.changeAnimation("running", trex_running)
    }
  }
  // pulando o trex ao pressionar a tecla de espaço
 
  
  trex.velocityY = trex.velocityY + 0.5
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
 
  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
 if (frameCount%60==0){
    cloud=createSprite(width,random(10,height/2 ))
  cloud.addImage(cloudimg)
  cloud.velocityX=-3
  cloud.scale=0.5
  cloud.lifetime=500
  cloudg.add (cloud)
 }
}
function spawnObstacles(){
  if (frameCount%60==0){
     obstacle=createSprite(width,height-111)
    obstacle.velocityX=-3
    obstacle.scale=0.5
    var aleatorio=Math.round(random(1,6))
    switch(aleatorio){
      case 1:obstacle.addImage(obstacle1)
      break
      case 2:obstacle.addImage(obstacle2)
      break
      case 3:obstacle.addImage(obstacle3)
      break
      case 4:obstacle.addImage(obstacle4)
      break
      case 5:obstacle.addImage(obstacle5)
      break 
      case 6:obstacle.addImage(obstacle6)
      break
      default:break
    }
    obstacle.lifetime=500 
    obstacleg.add (obstacle) 
}

}


