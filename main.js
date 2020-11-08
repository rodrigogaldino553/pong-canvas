var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d")



var keys = {}
var ball = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    height: 30,
    width: 30,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 2
}

var left = {
    x: 10,
    y: canvas.height / 2 - 60,
    height: 120,
    width: 30,
    score: 0,
    speed: 10
}

var right = {
    x: 560,
    y: canvas.height / 2 - 60,
    height: 120,
    width: 30,
    score: 0,
    speed: 10
}

document.addEventListener("keydown", function(e){
    keys[e.key] = true
    
})


document.addEventListener("keyup", function(e){
    delete keys[e.key]
})


function moveBlock(){
    if('w' in keys && left.y > 0){
        left.y -= left.speed

    }else if('s' in keys && left.y + left.height < canvas.height){
        left.y += left.speed

    }
    
    if('ArrowUp'in keys && right.y > 0){
        right.y -= right.speed

    }else if('ArrowDown' in keys && right.y + right.height < canvas.height){
        right.y += right.speed
        
    }
}


function moveBall(){
    if(ball.y + ball.height >= left.y && ball.y <= left.y + left.height && ball.x <= left.x + left.width){
        ball.dirx = 1
        ball.mod += 0.2

    }else if(ball.y + ball.height >= right.y && ball.y <= right.y + right.height && ball.x + ball.width >= right.x){
        ball.dirx = -1
        ball.mod += 0.2
        
    }

    if(ball.y <= 0){
        ball.diry = 1

    }else if(ball.y + ball.height >= canvas.height){
        ball.diry = -1

    }

    ball.x += (ball.speed + ball.mod) * ball.dirx
    ball.y += (ball.speed + ball.mod) * ball.diry

    if(ball.x < left.x + left.width - 15){// vai quebar aqui por conta do ball.mode q recebe 0.2, cacar uma maneira de resolver isso...
        newGame('Player 2')
    }else if(ball.x + ball.width > right.x + 15){
        newGame('Player 1')
    }
}


function newGame(winner){
    if(winner == 'Player 1'){
        left.score ++

    }else{
        right.score ++

    }

    left.y = canvas.height / 2 - left.height / 2
    right.y = left.y

    ball.y = canvas.height / 2 - ball.height / 2
    ball.x = canvas.width / 2 - ball.width / 2 
    ball.mod = 0
}


function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    moveBlock()
    moveBall()
    
    context.fillStyle = 'white'
    context.fillRect(left.x, left.y, left.width, left.height)
    context.fillRect(right.x, right.y, right.width, right.height)
    context.fillRect(ball.x, ball.y, ball.width, ball.height)
    
    context.font = "20px Arial"
    context.fillText("Player 1: "+ left.score, 50, 20)
    context.fillText("Player 2: "+ right.score, canvas.width - 150, 20)


    setTimeout(draw, 20)
}

draw()



