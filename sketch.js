

var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var block, blockGroup;
var gameState = "play";
var invisibleGround;
var speed = 4;





function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

}


function setup(){
  createCanvas(500,500);
  
  
  
  tower = createSprite(250,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = speed;
  tower.scale = 0.8;
  
  ghost = createSprite(300,430,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  ghost.bounciness = 0.5;
  
    ghost.setCollider("rectangle", 0, 8, 150, 280)

  
  invisibleGround = createSprite(250,480,380,1);
  invisibleGround.visible = false;
  
 
  doorsGroup = new Group();
  climbersGroup = new Group();
  blockGroup = new Group();
  
  
  
  
  
  
}

function draw(){
  background(0);
  
  if (gameState === "play") {
      
      ghost.collide(invisibleGround);
      if(frameCount>300){
        invisibleGround.scale = 0.001;
      }
    
      if(tower.y > 400){
         tower.y = 300;
      }
      
      if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;
      }

      if(keyDown("right_arrow")){
        ghost.x = ghost.x + 3;
      }

      if( keyDown("up") ){
        ghost.velocityY = -7;
      }
      ghost.velocityY = ghost.velocityY + 0.8

      spawnDoors();
    
    
    
      
     
      
      if(climbersGroup.isTouching(ghost)){
        ghost.bounceOff(climbersGroup);
        //ghost.velocityY = 0;
      }

      if(blockGroup.isTouching(ghost) || ghost.y>500 ){
        gameState = "end";
      }
    
    
  }else if(gameState === "end"){
    
    
    fill("orange");
    textSize(30);
    text("Game Over", 160, 250);
    
    tower.visible = false;
    ghost.visible = false;
    
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    blockGroup.destroyEach();
  
    
    
    
  }
  
  drawSprites();
  
  

  
}


function spawnDoors() {
  
  if (frameCount % 100 === 0) {
    var rand = Math.round(random(120,400));
    
    var door = createSprite(rand, -50);
    var climber = createSprite(rand, door.y+door.height/2);
    var block = createSprite(rand, climber.y+15);
    
    
    block.width = climber.width;
    block.height = 2;
    block.visible = true;
    block.shapeColor = "black"
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = speed;
    climber.velocityY = speed;
    block.velocityY = speed;
    
    ghost.depth =door.depth + 1;
   
    
    door.lifetime = 400;
    climber.lifetime = 400;
    block.lifetime = 400;
   
    doorsGroup.add(door);
    climbersGroup.add(climber);
    blockGroup.add(block);
  }



    
  }







