const board = document.getElementById('board');
let white = parseInt(document.getElementById('white-score').innerHTML );
let black = parseInt(document.getElementById('black-score').innerHTML );


let color = [
    [0,0,0 ,0, 0,0,0,0],
    [0,0,0, 0, 0,0,0,0],
    [0,0,0 ,0, 0,0,0,0],
    [0,0,0, 1,-1,0,0,0],
    [0,0,0,-1, 1,0,0,0],
    [0,0,0, 0, 0,0,0,0],
    [0,0,0, 0, 0,0,0,0],
    [0,0,0, 0, 0,0,0,0]
];

let OK =[
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false],
]

let state = 1;

function initializeBoard() {
    for (let i = 0; i < 8; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            const flag = document.createElement('div');
            flag.className = 'flag';
            cell.className = 'cell';
            if (i == 3 && j == 3) {
                flag.className += ' black';
            }
            if (i == 3 && j == 4) {
                flag.className += ' white';
            }
            if (i == 4 && j == 3) {
                flag.className += ' white';
            }
            if (i == 4 && j == 4) {
                flag.className += ' black';
            }
            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener('click', handleCellClick);
            cell.appendChild(flag);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}


function handleCellClick(event){
    let clickedCell = event.currentTarget.querySelector('.flag');
    let x = parseInt(event.currentTarget.dataset.row);
    let y = parseInt(event.currentTarget.dataset.col);

    if (clickedCell.classList.contains('info')) {
        console.log(color);
        console.log(x,y);
        put(x,y);
    }
}

function put(x,y){
    if (state === 1){
        queryBoard(x,y).querySelector('.flag').classList.add('black');
        color[x][y] = state;
    }   
    else if (state === -1){
        queryBoard(x,y).querySelector('.flag').classList.add('white');
        color[x][y] = state;
    }
    directionReverse(x,y);
    removeInfo();
    directionReverse(x, y);
    changeState();
    OKdetect(0);
    updateBoard();
}

function changeState(){
    state *= -1;
    let style = document.querySelector('style');
    if (state==1){
        style.innerHTML = ".cell:hover {.flag.info{background-color: rgba(0, 0, 0, 0.13);}";
    }
    else if (state==-1){
        style.innerHTML = ".cell:hover {.flag.info{background-color: rgba(235, 235, 235, 0.13);border: 1px solid rgba(0, 0, 0, 0.13); }";
    }
}
function removeInfo(){
    let info = board.querySelectorAll('.info');
    info.forEach(element => {
        element.classList.remove('info');
    });
    for (let i = 0; i < 8; i++  ){
        for (let j = 0; j <8; j++ ){
            OK[i][j] = false;
        }
    }
}


function inBoard(x,y){  //return true if the board is not ouy of range
    return x >= 0 && y >= 0 && x < 8 && y < 8;
}


function canPut(x,y){ // returns true if canPut
    return (
        checkDirection(x, y, -1, -1) ||
        checkDirection(x, y, -1,  0) ||
        checkDirection(x, y, -1,  1) ||
        checkDirection(x, y,  0, -1) ||
        checkDirection(x, y,  0,  1) ||
        checkDirection(x, y,  1, -1) ||
        checkDirection(x, y,  1,  0) ||
        checkDirection(x, y,  1,  1)
    );
}

function checkDirection(x,y,dx,dy){ // check this direction can be put or not
    let x1, y1;
    let flag = false;
    x1 = x + dx;
    y1 = y + dy;
    while( inBoard(x1, y1) && color[x1][y1] !== state && color[x1][y1] !== 0 ) {
        x1 += dx;
        y1 += dy;
        flag = true;
    }
    if (flag && inBoard(x1, y1) && color[x1][y1] === state){
        return true;
    }
    return false;
}

function OKdetect(x){
    let flag = false;
    for (i = 0; i <8;i++){
        for (j=0;j<8;j++){
            if (color[i][j] === 0 && canPut(i,j)){
                OK[i][j] = true;
                flag = true;
            }
        }
    }
    if (!flag){
        if (x==1){
            alert('Game end');
            gameEnd();
            return;
        }
        alert('Change to other color!!!!');
        state *= -1;
        OKdetect(x+1);
        updateBoard();
    }
}
function gameEnd(){
    if (white>black){
        alert('White Win');
        document.querySelector('.title').innerHTML = "White Win";
        document.querySelector('.title').setAttribute("style", "color:red;");
    }
    else if (white<black){
        alert('Black Win');
        document.querySelector('.title').innerHTML = "Black Win";
        document.querySelector('.title').setAttribute("style", "color:red;");
    }
    else if (white===black){
        alert('Draw');
        document.querySelector('.title').innerHTML = "Draw";
        document.querySelector('.title').setAttribute("style", "color:red;");
    }
}
function queryBoard(x,y){
    let row = board.querySelectorAll('.row');
    let col = row[x].querySelectorAll('.cell')[y];
    return col;
}


function updateBoard(x,y){
    for (i = 0; i <8;i++){
        for (j=0;j<8;j++){
            if (OK[i][j]){
               let cell = queryBoard(i,j).querySelector('.flag');
               cell.classList.add('info');
            }
        }
    }
    score();
}

function directionReverse(x, y){
    for (let dx=-1;dx<=1;dx++){
        for (let dy=-1;dy<=1;dy++){
            if (dx==0 && dy==0){continue;}
            
            if (checkDirection(x,y,dx,dy)){
                reverse(x,y,dx,dy);
            }
        }
    }
}

function score(){
    black = 0;
    white = 0; 
    for(var i=0;i<8 ; i++){
        for (var j=0;j<8 ; j++){
            if(color[i][j]==1){
                black++;
            }
            else if (color[i][j]==-1){
                white++;
            }
        }
    }
    document.getElementById('white-score').innerHTML = white;
    document.getElementById('black-score').innerHTML = black;
}

function reverse(x, y, dx, dy){
    let x1, y1;
    x1 = x + dx;
    y1 = y + dy;
    console.log("[IN reverse]: ",x1,y1);
    while (inBoard(x1, y1) && color[x1][y1] !==  state && color[x1][y1] !== 0){
        x1 += dx;
        y1 += dy;
    }
    let delay = 100;
    if (inBoard(x1, y1) && color[x1][y1] === state){
        do{
            x1 -= dx;
            y1 -= dy;
            if ((x1 !== x || y1 !== y)){
                const x2 = x1;
                const y2 = y1;
                //alert(`${x2}  ${y2}`);
                color[x2][y2] *= -1;
                setTimeout(() => {
                    reverseColor(x2, y2);
                    score();
                }, delay);
                // reverseColor(x2, y2);
                // const initTime = (new Date()).getTime();
                // while((new Date()).getTime() <= initTime + 500) {}
            }
            delay += 100;
        } while ((x1 !== x || y1 !== y));
    }
}

function reverseColor(x, y){
    //alert(`reverse, ${x}, ${y}`);
    //color[x][y] *= -1;
    queryBoard(x, y).querySelector('.flag').classList.toggle('black');
    queryBoard(x, y).querySelector('.flag').classList.toggle('white');
}



// Call the initialization function
initializeBoard();
OKdetect(0);
updateBoard();

