var listSize = 200;

var list = [];

var randomizing = false;
var randomized = false;
var randomI = 0;

var canvasSizeX = 700;
var canvasSizeY = 400;

var ALGORITHMS = [
  "None",
  "Selection",
  "Insertion",
  "Bubble",
  "Merge",
  "Quick"
];

var currentAlgorithm = ALGORITHMS.indexOf("None");

var sorting = false;

var sortClass;

function randomize(){
  //Sets randomizing to true to start the randomization
  randomizing = true;
  //Sets randomized to false since list is not fully randomized
  randomized = false;
  
  //Reinitializes the list 
  for(i = 0; i < listSize; i++){
    list[i] = i;
  }

  //Sets the index to 0 so it starts from the first index
  randomI = 0;
}

function setup() {
  myCanvas = createCanvas(canvasSizeX, canvasSizeY);
  //Starts by randomizing
  randomize();

  myCanvas.parent("P5Canvas");
}

function randomizeUpdate(){
  //Switches with the current index with a random index
  let switchIndex = Math.floor(Math.random() * listSize);
  let switchVal = list[switchIndex];
  list[switchIndex] = list[randomI];
  list[randomI] = switchVal;
  
  //Goes to the next index
  randomI++;
  //If there is no index randomization is finished
  if(randomI >= listSize){
      randomizing = false;
      randomized = true;
  }
}

function randomizeDraw(){
  //Sets the background to erase past drawings
  background(0,50,0);
  //Changes rectangle color
  fill(0,200,0);
  
  //Gets the thickness of the line by canvasSize divided by the list size
  let lineWidth = canvasSizeX / listSize;
  //Removes the rect outline to make it look cleaner
  noStroke(); 
  
  //Loops through to draw every element
  for(i = 0; i < listSize; i++){
    //Gets decmial percentage value of what percent of the y it should take up
    let valPerc = (list[i] + 1) / listSize;

    //Multiples the percentage by canvsaY to make it scale to the canvas
    let ySize = valPerc * canvasSizeY;
    let startY = Math.round(canvasSizeY - ySize);
    let startX = Math.round(lineWidth * i);
    //Draws the rectangle for the element
    rect(startX, startY, lineWidth, ySize);
  }
  
  fill(0,200,0);
  textSize(20);
  text('Randomizing...', 0, 20);
}

function draw() {
  //Updates randomize function and visalizies randomize if randomizing
  if(randomizing){
    //Loops so that randomization will be quicker
    for(i = 0; i< listSize / 120; i ++){
      //Updates random function
      randomizeUpdate();
      //If randomization is finished leave the loop
      if(!randomizing){
        break;
      }
    }
    //Visualizes random
    randomizeDraw();
  }

  switch(currentAlgorithm){
    case ALGORITHMS.indexOf("None"):
      if(randomized){
        currentAlgorithm = ALGORITHMS.indexOf("Selection");
        sortClass = new Selection(list, canvasSizeX,canvasSizeY);
      }
      break;
    case ALGORITHMS.indexOf("Selection"):
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10; i ++){
        sortClass.UpdateSelection();
      }
      sortClass.DrawSelection();
      break;
    case ALGORITHMS.indexOf("Insertion"):
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10; i ++){
        sortClass.UpdateInsertion();
      }
      sortClass.DrawInsertion();
      break;
      
    case ALGORITHMS.indexOf("Bubble"):
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10; i ++){
        sortClass.UpdateBubble();
      }
      sortClass.DrawBubble();
      break;
    case ALGORITHMS.indexOf("Merge"):
      if(sortClass.sorted){
        return;
      }

       for(i = 0; i< Math.max(1,listSize)/40; i ++){
      
        sortClass.UpdateMerge();
      }
      sortClass.DrawMerge();
      break;
    case ALGORITHMS.indexOf("Quick"):
      if(sortClass.sorted){
        return;
      }
  
      for(i = 0; i< Math.max(1,listSize)/40; i ++){
      
        sortClass.UpdateQuick();
      }
      sortClass.DrawQuick();
      break;
  }
}

