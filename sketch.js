//gobal variables.

var trex, trex_running, ground, groundimg,Cloudimg,o2,o3,o4,o5,o6,trex_collide,trex_collided;
var gameState = "play";
var score = 0;
var cloudGroup;
var obGroup;
var gmover,gmoverimg;
var restart,restartimg;
var jsound,dsound,csound,j,c,d

function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimg = loadImage("ground2.png");
  Cloudimg = loadImage("cloud.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gmoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart (1).png");
  jsound = loadSound("jump.mp3");
  dsound = loadSound("die.mp3");
  csound = loadSound("checkPoint (1).mp3");
  
}

function setup(){
  createCanvas(600,300);
  
  trex = createSprite(30,270);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.6;
  ground = createSprite(300,280);
  ground.addImage(groundimg);
  cloudGroup = new Group();
  obGroup = new Group();
  trex.addAnimation("colliding",trex_collided);
  restart = createSprite(300,150);
  restart.addImage(restartimg);
  gmover = createSprite(300,50);
  gmover.addImage(gmoverimg);
  restart.visible = false;
  gmover.visible = false;
  
}

function draw(){
  background(180);
  if(gameState === "play")
    {
    restart.visible = false;
    gmover.visible = false;
  if (keyDown("space")&&trex.y>246)
  {
    trex.velocityY = -9;
    jsound.play()
  }
  trex.velocityY = trex.velocityY + 0.5;
  
    spawnClouds();
    spawnObstacle(); 
   ground.velocityX = -(6+3*score/100);
  if (ground.x < 0)
  {
    ground.x = 300;
  }
    if(frameCount % 5 === 0){
      score = score + 1
      
    } 
  if(obGroup.isTouching(trex)){
    gameState = "end";
    dsound.play()
  }
 if(score % 100 === 0 ){
   csound.play();
 }
  
      
}
  else
    if(gameState === "end")
    {
      trex.changeAnimation("colliding",trex_collided);
      ground.velocityX = 0; 
      obGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0); 
      obGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      restart.visible = true;
      gmover.visible = true;
  
     
      if(mousePressedOver(restart)){
        gameState = "play";
        score = 0;
        obGroup.destroyEach();
        cloudGroup.destroyEach();
        trex.changeAnimation("running",trex_running);
       
        
      }
      
   }  
 text(score,570,30);
   trex.collide(ground );
   drawSprites();
}

function spawnClouds()
{
  if(frameCount % 70 === 0)
  {
    // cloud is local variable.
  var cloud = createSprite(600,random(20,150));
  cloud.addImage(Cloudimg);
  cloud.velocityX = -5;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;
  cloud.depth = gmover.depth;
  gmover.depth = gmover.depth + 1;  
  cloud.depth = restart.depth;
  restart.depth = restart.depth + 1;  
  cloud.lifetime = 600/5;
  cloudGroup.add(cloud);
  }
  
}

function spawnObstacle()
{if(frameCount % 80 === 0)
  {
 var ob = createSprite(600,270);
   var r = Math.round(random(2,6));
   switch(r){
       
       case 2 : ob.addImage(o2);
        break;
        case 3 : ob.addImage(o3);
       break;
        case 4 : ob.addImage(o4);
       break;
        case 5 : ob.addImage(o5);
       break;
        case 6 : ob.addImage(o6);
       
       break;
       default : break;
       
   }
      ob.scale = 0.5; 
       ob.lifetime = 600/6;
        
  ob.velocityX = -6;
     obGroup.add(ob);
  }

}
  
  
  
  
  
  














