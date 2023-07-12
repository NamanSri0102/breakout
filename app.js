const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const boardwidth = 565
const blockwidth2 = 120
const userStart =[230,10]
const ballDiameter = 20
const boardheight=300
let score=0


let currentPosition = userStart
let xDirection=-2
let yDirection=2
let timerId


const ballStart = [280,30]
let ballCurrentPosition=ballStart


//create a block class
class Block{
    constructor(xAxis,yAxis)
    {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis+blockWidth,yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth,yAxis+blockHeight]

    }
}

const blocks =[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]



//draw my bolck
function addblock()
{

for(let i=0;i<blocks.length;i++)
{
    const block = document.createElement('div')
block.classList.add('block')
block.style.left = blocks[i].bottomLeft[0] + 'px'
block.style.bottom = blocks[i].bottomLeft[1] + 'px'
grid.appendChild(block)
}
}

addblock()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw the user
function drawUser()
{
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw the ball
function drawBall(){
    ball.style.left=ballCurrentPosition[0] + 'px'
    ball.style.bottom=ballCurrentPosition[1] + 'px'
}

//move user

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0]>5){
            currentPosition[0] -= 10
            drawUser()
            }
            break;
        
        case 'ArrowRight':
            if(currentPosition[0]<boardwidth-blockwidth2)
            {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown',moveUser)

//add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


//move the ball
function moveBall()
{
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollision()
}
timerId = setInterval(moveBall,30)

// check the collision

function checkForCollision()
{
// check for block collisions
  for(let i=0;i<blocks.length;i++)
  {
    if (
       ( ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
        (ballCurrentPosition[1] + ballDiameter)>blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    )
    {
        const allBlock = Array.from(document.querySelectorAll('.block'))
        allBlock[i].classList.remove('block')
        blocks.splice(i,1)
        changeDirection()
        score++
        scoreDisplay.innerHTML=score

        //check for win
        if(blocks.length === 0){
            scoreDisplay.innerHTML='CONGRATS !  YOU WON'
            clearInterval(timerId)
            document.removeEventListener('keydown',moveUser)
        }


        
    }
  }


    if(ballCurrentPosition[0] >= (boardwidth-ballDiameter) ||
     ballCurrentPosition[1]>= (boardheight-ballDiameter) ||
     ballCurrentPosition[0]<= 0 )
    {
        changeDirection()
    }

    // check for user collision
     
    if(
       ( ballCurrentPosition[0]> currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth)) && 
       (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < (currentPosition[1] + blockHeight))
        )
      {
        changeDirection()
      }





    //check for game over
    if(ballCurrentPosition[1] <= 0)
    {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'you lose'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection()
{
   if(xDirection === 2 && yDirection === 2)
   {
    yDirection = -2
    return
   }
   if(xDirection === 2 && yDirection === -2)
   {
    xDirection = -2
    return
   }
   if(xDirection === -2 && yDirection === -2)
   {
    yDirection = 2
    return
   }
   if(xDirection === -2 && yDirection === 2)
   {
      xDirection=2
   }
   
}

