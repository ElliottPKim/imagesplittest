let source; 

let tiles = [];
let cols = 4;
let rows = 4;
let w,h;
let board = [];

function preload() {
    source = loadImage("kekw.jpg");
}

function setup() {
    createCavnas(400,400);
    w = width/cols;
    h = height/rows;    

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * w;
            let y = j * h;
            let img = createImage(w,h);
            img.copy(source, x, y, w, h, 0, 0, w, h);
            let index = i + j * cols;
            board.push(index);
            let tile = new Tile(index, img);
            tiles.push(tile);
        }  
    }
    simpleShuffle(board);
}

function swap(i,j,arr){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function simpleShuffle(arr){
    for (let i = 0; i < 100; i++){
        let r1 = floor(random(0,arr.length));
        let r2 = floor(random(0,arr.length));
        swap(r1,r2,arr);
    }
}

function draw(){
    for (let i = 0; i < tiles.length; i++){
        for (let j = 0; j < rows; j++){
            let index = i + j * cols;
            let x = i * w;
            let y = j * h;
            let tilesIndex = board[index];
            let img = tiles[tilesIndex].img;
            image (img, x, y, w, h);
        }
   }
   for (let i = 0; i < cols; i++){
       for (let j = 0; j < rows; j++){
           let x = i * w;
           let y = j * h;
           strokeWeight(2);
           noFill();
           rect(x,y,w,h);
       }
   }
}


const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
})