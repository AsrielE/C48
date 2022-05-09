var box
var wall
var wall2
var wall3
var wall4
var bullet
var trophy
var enemy
var gold
var blue
var burst
var enemies
var bullets
var goldbars
var heart
var score=0
var lives=5
function preload(){
bulletImg = loadImage("pixil-frame-0 (3).png")
trophyImg = loadImage("pixil-frame-0 (7).png")
enemyImg = loadImage("pixil-frame-0 (1).png")
goldImg = loadImage("pixil-frame-0 (12).png")
blueImg = loadImage("pixil-frame-0 (13).png")
heartImg = loadImage("pixil-frame-0 (14).png")
burstImg = loadImage("pixil-frame-0 (15).png")
}

function setup() {
  createCanvas(750,650);
  box = createSprite(375,325,40,40)
  wall = createSprite(375,515,375,10)
  wall2 = createSprite(375,135,375,10)
  wall3 = createSprite(560,325,10,375)
  wall4 = createSprite(195,325,10,375)

  
  
  wall.shapeColor = "white"
  wall2.shapeColor = "white"
  wall3.shapeColor = "white"
  wall4.shapeColor = "white"
  box.shapeColor = "yellow"
bullets = new Group()
  enemies = new Group()
goldbars = new Group()
diamonds = new Group()
hearts = new Group()
bursts = new Group()
}

function draw() 
{
  background(30);
  textSize(22)
text("Score:" + score,325,105)
text("lives:" + lives,325,85)

if(keyDown("w")){
  box.y = box.y - 3
}
if(keyDown("a")){
  box.x = box.x - 3
}
if(keyDown("d")){
  box.x = box.x + 3
}
if(keyDown("s")){
  box.y = box.y + 3
}
if(score%50===0&&score>0){
  trophy = createSprite(450,105,20,20)
trophy.addImage(trophyImg)
trophy.scale = 4
trophy.lifetime = 50
}
if(lives===0){
  box.destroy()
  text("Game Over",375,325)
  enemies.destroyEach()
  goldbars.destroyEach()
  diamonds.destroyEach()
}
if(lives==2||lives==1){
  if(keyWentDown("e")){
    burst = createSprite(box.x,box.y,30,30)
    burst.addImage(burstImg)
    burst.scale = 5
    burst.lifetime = 2
    bursts.add(burst)
    burst.setCollider("circle",0,0,7)
    if(burst.isTouching(enemies)){
      enemies.destroyEach()
   score += 1
    }
    if(burst.isTouching(goldbars)){
      goldbars.destroyEach()
   score += 5
    }
    if(burst.isTouching(diamonds)){
      diamonds.destroyEach()
    }
  }
}

drawSprites()
box.collide(wall3)
box.collide(wall4)
box.bounceOff(wall)
box.bounceOff(wall2)
spawnEnemy()
spawnGold()
spawnBlue()
enemies.bounceOff(wall3)
enemies.bounceOff(wall4)
enemies.bounceOff(wall)
enemies.bounceOff(wall2)
goldbars.bounceOff(wall3)
goldbars.bounceOff(wall4)
goldbars.bounceOff(wall)
goldbars.bounceOff(wall2)
diamonds.bounceOff(wall3)
diamonds.bounceOff(wall4)
diamonds.bounceOff(wall)
diamonds.bounceOff(wall2)
}
function spawnEnemy(){
  if(frameCount%85===0){
  enemy = createSprite(random(225,520),random(150,490),40,40)
  enemy.addImage(enemyImg)
  enemy.scale = 4
  enemy.lifetime = 275
enemies.add(enemy)
enemy.setCollider("circle",0,0,5)
enemy.velocityY = random(-3,3)
enemy.velocityX = random(-3,3)

  }
  if(keyWentDown(UP_ARROW)){
    bullet = createSprite(box.x,box.y,40,40)
    bullet.addImage(bulletImg)
    bullet.scale = 3
    bullet.velocityY = -4
    bullet.lifetime = 125
    bullets.add(bullet)
    bullet.setCollider("circle",0,0,5)
  }
  if(bullets.isTouching(enemies)){
    enemies.destroyEach()
  score += 1
  }

  

  

if(box.isTouching(enemies)){
  enemies.destroyEach()
  lives -= 1
}
}
function spawnGold(){
  if(frameCount%175===0){
  gold = createSprite(random(225,520),random(150,490),40,40)
  gold.addImage(goldImg)
  gold.scale = 3
  gold.lifetime = 340
goldbars.add(gold)
gold.setCollider("circle",0,0,3.5)
gold.velocityY = random(-4.1,4.1)
gold.velocityX = random(-4.1,4.1)
  }
  if(bullets.isTouching(goldbars)){
    goldbars.destroyEach()
    score += 5
  }
  if(box.isTouching(goldbars)){
    goldbars.destroyEach()
    lives -= 1
  }
}
function spawnBlue(){
  if(frameCount%375===0){
  blue = createSprite(random(225,520),random(150,490),40,40)
  blue.addImage(blueImg)
  blue.scale = 2.55
  blue.lifetime = 250
diamonds.add(blue)
blue.setCollider("circle",0,0,3.25)
blue.velocityY = random(-3.5,4)
blue.velocityX = random(-3.5,4)
  }
  if(bullets.isTouching(diamonds)){
    diamonds.destroyEach()
    heart = createSprite(blue.x,blue.y,40,40)
hearts.add(heart)
heart.addImage(heartImg)
heart.scale = 3
  }
  if(box.isTouching(hearts)){
    hearts.destroyEach()
    lives += 1
  }
  if(lives===6){
lives -= 1
  }
  if(box.isTouching(diamonds)){
    diamonds.destroyEach()
    lives -= 1
  }
}






