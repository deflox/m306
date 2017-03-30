var basketImg, coinImg;
var basket, coins;
var coinCount = 0;
var heartCount = 3;
var gameOver = false;

function preload() {
    basketImg = loadImage("assets/img/basket.png");
    coinImg = loadImage("assets/img/coin.png");
}

function setup() {

    createCanvas(1000, 600);

    basket = createSprite(width/2, 520);

    basket.addImage("basket", basketImg);

    coins = new Group();

    textSize(30);
    textAlign(LEFT, TOP);

}

function draw() {

    background(200);

    if (gameOver === false) {

        text("Collected: " + coinCount, 50, 50);
        text("Lives: " + heartCount, 50, 100);

        if(keyIsDown(RIGHT_ARROW) && basket.position.x < width - (basket.width/2)) {
            basket.position.x += 6;
        }

        if(keyIsDown(LEFT_ARROW) && basket.position.x > 0 + (basket.width/2)) {
            basket.position.x -= 6;
        }

        if (frameCount%100 == 0) {
            var coin = createSprite(random(50, width-50), -50);
            coin.addImage(coinImg);
            coin.setSpeed(1.5, 90);
            coins.add(coin);
        }

        for(var i = 0; i<coins.length; i++) {
            if (catched(coins[i])) {
                coins[i].remove();
                coinCount += 1;
            }
            if (coins[i].position.y > height - (coins[i].height/2)) {
                coins[i].remove();
                heartCount -= 1;
            }
        }

        if (heartCount === 0) {
            gameOver = true;
        }

        drawSprites();

    } else {
        text("Game over! Press F5 to start again.", width/2 - 260, 200);
    }

}

/**
 * Checks whether a coin got catched by the basket
 * or not.
 *
 * @param  coin    Coin object to check.
 * @return boolean
 */
function catched(coin) {
    return (coin.position.x > (basket.position.x - (basket.width/2)+20) &&
    coin.position.x < (basket.position.x + (basket.width/2)-20) &&
    coin.position.y > (basket.position.y - (basket.height/2))   &&
    coin.position.y < (basket.position.y - (basket.height/2))+10);
}

/**
 * Updates score for user via ajax in case of
 * game over.
 */
function updateScore() {

}