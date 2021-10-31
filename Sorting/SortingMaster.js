var listSize = 200;

var list = [];

var randomizing = false;
var randomized = false;
var randomI = 0;

var canvasSizeX = 700;
var canvasSizeY = 400;

var speedMultipler = 1;
const speedMax = 15;
const speedMin = 0.2;

var ALGORITHMS = [
  "None",
  "Selection",
  "Insertion",
  "Bubble",
  "Merge",
  "Quick"
];

var currentAlgorithm = ALGORITHMS.indexOf("None");

var madeSortClass = false;
var sorting = false;

var sortClass;

function randomize(){
  //Sets randomizing to true to start the randomization
  randomizing = true;
  //Sets randomized to false since list is not fully randomized
  randomized = false;
  //Sets made Sort class to false because it's need to be reintialized with the new randomized array
  madeSortClass = false;

  //Resets the list
  list = [];
  //Reinitializes the list 
  for(i = 0; i < listSize; i++){
    list[i] = i;
  }

  //Sets the index to 0 so it starts from the first index
  randomI = 0;
}

function setup() {
  //Makes a canvas
  myCanvas = createCanvas(canvasSizeX, canvasSizeY);
  // Puts the canvas in a div
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

  //Only runs the sort code if sorting and randomized
  if(!sorting || !randomized){
    return;
  }

  //Runs the algorithm it needs to
  switch(currentAlgorithm){
    case ALGORITHMS.indexOf("None"):
      return;
      break;
    case ALGORITHMS.indexOf("Selection"):
      //Makes the sorting class if it hasn't been made
      if(!madeSortClass){
        sortClass = new Selection(list, canvasSizeX,canvasSizeY);
        madeSortClass = true;
      }
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10 * speedMultipler; i ++){
        sortClass.UpdateSelection();
      }
      sortClass.DrawSelection();
      break;
    case ALGORITHMS.indexOf("Insertion"):
      //Makes the sorting class if it hasn't been made
      if(!madeSortClass){
        sortClass = new Insertion(list, canvasSizeX,canvasSizeY);
        madeSortClass = true;
      }
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10 * speedMultipler; i ++){
        sortClass.UpdateInsertion();
      }
      sortClass.DrawInsertion();
      break;
      
    case ALGORITHMS.indexOf("Bubble"):
      //Makes the sorting class if it hasn't been made
      if(!madeSortClass){
        sortClass = new Bubble(list, canvasSizeX,canvasSizeY);
        madeSortClass = true;
      }
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/10 * speedMultipler; i ++){
        sortClass.UpdateBubble();
      }
      sortClass.DrawBubble();
      break;
    case ALGORITHMS.indexOf("Merge"):
      //Makes the sorting class if it hasn't been made
      if(!madeSortClass){
        sortClass = new Merge(list, canvasSizeX,canvasSizeY);
        madeSortClass = true;
      }
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/60 * speedMultipler; i ++){
        sortClass.UpdateMerge();
      }
      sortClass.DrawMerge();
      break;
    case ALGORITHMS.indexOf("Quick"):
      //Makes the sorting class if it hasn't been made
      if(!madeSortClass){
        sortClass = new Quick(list, canvasSizeX,canvasSizeY);
        madeSortClass = true;
      }
      if(sortClass.sorted){
        return;
      }
      for(i = 0; i< Math.max(1,listSize)/70 * speedMultipler; i ++){
      
        sortClass.UpdateQuick();
      }
      sortClass.DrawQuick();
      break;
  }
}

//Code for the sort speed slider
document.getElementById("SpeedSlider").oninput = function() {
  //Gets the value in the slider
  let sliderValue = document.getElementById("SpeedSlider").value;

  //If the value is less than half that means the speed multiplier should be less than 1
  if(sliderValue <= 50){
    perc = sliderValue / 50;
    speedMultipler = perc * (1 - speedMin) + speedMin;
  }
  //Otherwise the speed multiples is greater than 1
  else{
    perc = (sliderValue-50) / 50;
    speedMultipler = perc * (speedMax - 1) + 1;
  }

  //Shows the value on the slider on the website
  document.getElementById("SpeedText").innerText = "Speed: " +  document.getElementById("SpeedSlider").value;
};
//Shows the value on the slider on the website
document.getElementById("SpeedText").innerText = "Speed: " +  document.getElementById("SpeedSlider").value;

//Code for the sort speed slider
document.getElementById("SizeSlider").oninput = function() {
  //Gets the value in the slider
  listSize = document.getElementById("SizeSlider").value;

  //If its sorting then it needs to start over
  if(sorting){
    randomize();
  }
  //Shows the value on the slider on the website
  document.getElementById("SizeText").innerText = "Size: " +  document.getElementById("SizeSlider").value;
};
//Shows the value on the slider on the website
listSize = document.getElementById("SizeSlider").value;
document.getElementById("SizeText").innerText = "Size: " +  document.getElementById("SizeSlider").value;

//Makes the algorithm selection when the button is pressed
var selectionFunc = () =>{
  currentAlgorithm = ALGORITHMS.indexOf("Selection");
  sorting = true;
  randomize();
  document.getElementById("SortShower").innerText = "Selection Sort";
}
document.getElementById("Selection").onclick = selectionFunc;

//Makes the algorithm insertion when the button is pressed
var insertionFunc = () =>{
  currentAlgorithm = ALGORITHMS.indexOf("Insertion");
  sorting = true;
  randomize();
  document.getElementById("SortShower").innerText = "Insertion Sort";
}
document.getElementById("Insertion").onclick = insertionFunc;

//Makes the algorithm bubble when the button is pressed
var bubbleFunc = () =>{
  currentAlgorithm = ALGORITHMS.indexOf("Bubble");
  sorting = true;
  randomize();
  document.getElementById("SortShower").innerText = "Bubble Sort";
}
document.getElementById("Bubble").onclick = bubbleFunc;

//Makes the algorithm merge when the button is pressed
var mergeFunc = () =>{
  currentAlgorithm = ALGORITHMS.indexOf("Merge");
  sorting = true;
  randomize();
  document.getElementById("SortShower").innerText = "Merge Sort";
}
document.getElementById("Merge").onclick = mergeFunc;

//Makes the algorithm quick when the button is pressed
var quickFunc = () =>{
  currentAlgorithm = ALGORITHMS.indexOf("Quick");
  sorting = true;
  randomize();
  document.getElementById("SortShower").innerText = "Quick Sort";
}
document.getElementById("Quick").onclick = quickFunc;