let numberOfRows = 10;
let numberOfCols = 10;

let cellWidth;
let cellHeight;

let isRunning = false;
let isAuth = false;
let clickLocked = false;

var aliveColor = "#000000";
var deadColor = "#FFFFFF";

let cnv = $('#GoF_Canvas')[0];
let ctx = cnv.getContext("2d");
var initMatrix = Array(numberOfRows).fill(Array(numberOfCols).fill(0)).map(a => a.slice());
var iteratedMatrix = Array(numberOfRows).fill(Array(numberOfCols).fill(0)).map(a => a.slice());

let password = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,0,1,1,0,1,0,0],[0,0,1,1,0,0,1,1,0,0],
                [0,0,1,1,0,0,1,1,0,0],[0,0,1,0,1,1,0,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];

cnv.addEventListener('mousedown', function(e) {
    if(!clickLocked){
        getCellClicked(cnv, e)
    }
})

function go(){
    window.location.href = "./poetry.html";
}

drawGrid(cnv, ctx);

function drawGrid(canvas, context2D){
    let xSize = canvas.width;
    let ySize = canvas.height;
    cellWidth = xSize/numberOfCols;
    cellHeight = ySize/numberOfRows;
    context2D.beginPath();
    for(let i=0; i <= xSize; i += cellWidth){
        context2D.moveTo(i,0);
        context2D.lineTo(i, ySize);
    }
    for(let i=0; i <= ySize; i += cellHeight){
        context2D.moveTo(0,i);
        context2D.lineTo(xSize, i);
    }
    context2D.stroke();
}

function getCellClicked(canvas, event){
    let bound = canvas.getBoundingClientRect();
    let x = event.clientX - Math.round(bound.left);
    let y = event.clientY - Math.round(bound.top);
    let i = Math.floor(x/cellWidth);
    let j = Math.floor(y/cellHeight);

    if(initMatrix[i][j] == 0){
        initMatrix[i][j] = 1;
        drawCellOcuped(i, j);
    }else{
        initMatrix[i][j] = 0;
        drawCellEmpty(i, j);
    }
}

function drawCellOcuped(posX, posY){
    ctx.beginPath();
    ctx.fillStyle = this.aliveColor;
    ctx.fillRect(posX*cellWidth, posY*cellHeight, cellWidth, cellHeight);
    ctx.rect(posX*cellWidth, posY*cellHeight, cellWidth, cellHeight);
    ctx.stroke()
}

function drawCellEmpty(posX, posY){
    ctx.beginPath();
    ctx.fillStyle = this.deadColor;
    ctx.fillRect(posX*cellWidth, posY*cellHeight, cellWidth, cellHeight);
    ctx.rect(posX*cellWidth, posY*cellHeight, cellWidth, cellHeight);
    ctx.stroke()
}

function reDraw(){
    for(let i=0; i<numberOfCols; i++){
        for(let j=0; j<numberOfRows; j++){
            initMatrix[i][j] = iteratedMatrix[i][j];
            initMatrix[i][j] == 1? drawCellOcuped(i, j): drawCellEmpty(i,j);
        }
    }
}


function reset(){
    this.initMatrix = Array(numberOfRows).fill(Array(numberOfCols).fill(0)).map(a => a.slice());
    this.iteratedMatrix = Array(numberOfRows).fill(Array(numberOfCols).fill(0)).map(a => a.slice());
    this.isAuth = false;
    this.clickLocked = false;
    this.aliveColor = "#000000";
    this.deadColor = "#FFFFFF";
    this.reDraw();
}

function iterate(){
    for(let i=0; i<numberOfCols; i++){
        for(let j=0; j<numberOfRows; j++){
            let neighbors = 0;
            try{
                initMatrix[i-1][j-1] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i][j-1] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i+1][j-1] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i-1][j] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i+1][j] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i-1][j+1] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i][j+1] == 1? neighbors++: 0;
            } catch {}
            try{
                initMatrix[i+1][j+1] == 1? neighbors++: 0;
            } catch {}
            
            if(initMatrix[i][j] == 1){
                if(neighbors < 2){
                    iteratedMatrix[i][j] = 0;
                } else if(neighbors > 3){
                    iteratedMatrix[i][j] = 0;
                }else{
                    iteratedMatrix[i][j] = 1;
                }
            } else {
                if(neighbors == 3){
                    iteratedMatrix[i][j] = 1;
                }
            }
        }
    }
    //this.reDraw();
    return checkPass();
}

function checkPass(){
    for(let i=0; i<numberOfCols; i++){
        for(let j=0; j<numberOfRows; j++){
            if(initMatrix[i][j] !== password[i][j]){
                return false;
            }
        }
    }
    return true;
}


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function log(){
    for(let i=0; i<10; i++){
        await sleep(250);
        if(this.iterate()) {
            this.aliveColor = "#4EEA27";
            this.deadColor = "#C6F5BA";
            this.isAuth = true;
        }
        this.reDraw();
    }
    if(!this.isAuth){
        this.aliveColor = "#F3421F";
        this.deadColor = "#F3BCB1";
    }else{
        $('#access')[0].disabled = false;
    }
    this.reDraw()
}