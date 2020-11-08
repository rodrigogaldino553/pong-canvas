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
    speed: 50
}

var left = {
    x: 10,
    y: canvas.height / 2 - 60,
    height: 120,
    width: 30,
    score: 0,
    speed: 15
}

var right = {
    x: 560,
    y: canvas.height / 2 - 60,
    height: 120,
    width: 30,
    score: 0,
    speed: 15
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

    }else if('ArrowUp'in keys && right.y > 0){
        right.y -= right.speed

    }else if('ArrowDown' in keys && right.y + right.height < canvas.height){
        right.y += right.speed
        
    }
}


function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    moveBlock()
    
    context.fillStyle = 'white'
    context.fillRect(left.x, left.y, left.width, left.height)
    context.fillRect(right.x, right.y, right.width, right.height)
    context.fillRect(ball.x, ball.y, ball.width, ball.height)
    
    context.font = "20px Arial"
    context.fillText("Player 1: "+ left.score, 50, 20)
    context.fillText("Player 2: "+ right.score, canvas.width - 150, 20)

    setTimeout(draw, 10)
    setTimeout(draw, 20)
}

draw()



