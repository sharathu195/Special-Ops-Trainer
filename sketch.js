var canvas;
var bg2, bg1, bg3, bg4;
var target, targetImg;
var player, playerImg;
var targetGrp, bulletGrp;
var bullet, bulletImg;
var button, buttonImg, play;
var gameState = 0;
var score = 0;
var shots = 0;
var state_time=0;

function preload() {
    bg3 = loadImage("backG.jpg");
    bg1 = loadImage("startBG1.jpg");
    bg4 = loadImage("WhiteScreen.jpg")
    playerImg = loadImage("aim.png");
    targetImg = loadImage("target.png");
    bulletImg = loadImage("bullet.png");
    buttonImg = loadImage("restart.png");

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    bg2 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
    bg2.addImage("background", bg1);
    bg2.addImage("BgImg", bg3);
    bg2.addImage("white", bg4)

    targetGrp = new Group();
    bulletGrp = new Group();

    play = new Story();

    player = createSprite(displayWidth/2, displayHeight/2, 40, 40);
    player.addImage("crossheir", playerImg);

    button = createSprite(displayWidth/2, displayHeight/2+50, 50, 10);
    button.addImage("button", buttonImg);
}

function draw() {
    background(255);
    play.depth=bg2.depth+1;

    if (gameState === 0){
        player.visible = false;
        button.visible = false;
        play.display();
        targetGrp.setVisibleEach(false);
    }
    if(gameState === 1){
        bg2.changeImage("BgImg", bg3);
        player.visible = true;
        button.visible = false
        targetGrp.setVisibleEach(true);
        if (World.frameCount%100===0) {
            targets();
        }

        if(mouseDown(LEFT)){
            shoot();
            gameState=4;
        }

        if (bulletGrp.isTouching(targetGrp)) {
            targetGrp.destroyEach();
            bulletGrp.destroyEach();
            score = score + 1;
        }
        if(score === 15){
            gameState = 3;
        }
    }
    if(gameState === 3){
        bg2.changeImage("white", bg4);
        targetGrp.setVelocityXEach(0);
        player.visible = false;
        button.visible = true;
        if(mousePressedOver(button)){
            gameState = 1;
            score = 0;
        }
    }

    // making player's aim move with mouse
    player.x = mouseX;
    player.y = mouseY;

    drawSprites();

    if (gameState===4){
        state_time=state_time+1;
    }
    if(state_time===10){
         gameState=1;
         state_time=0;
    }

    textSize(20);
    fill("white");
    text("score: "+score, 800, 20);
}

function shoot() {
    bullet = createSprite(player.x, 800, 5, 5);
    bullet.addImage("bulletIamge", bulletImg);
    bullet.scale = 0.1;
    bullet.velocity.y = -30;
    bullet.lifetime = 150;
    bulletGrp.add(bullet);
}

function targets() {
    target = createSprite(0, random(50, 700), 20, 20);
    target.addImage("tagetIamge", targetImg);
    target.scale = 0.2;
    target.velocity.x = 10;
    target.lifetime = 350;
    target.depth=player.depth-1;
    targetGrp.add(target)
}