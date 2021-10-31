class Selection{
  constructor(list, canvasX, canvasY){
    //The canvas size
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    
    //Randomized List
    this.list = list;
    
    //The index that needs ot be swapped
    this.i = 0;
    //Current index being checked for swapability
    this.j = 0;
    //The index of the smallest to swap
    this.leastIndex = 0;
    this.leastValue = this.list[0];
    
    //If the sorting has been finished
    this.sorted = false;
    
    //Logs the number of comparison and swaps
    this.comparisons = 0;
    this.swaps = 0;
    
    //Indexs being swapped for visualization
    this.checkingIndex = [];
  }
  
  UpdateSelection(){
    //if I is at the end that means sorting is finished
    if(this.i >= this.list.length - 1){
      this.sorted = true;
      this.checkingIndex = []
      return;
    }
    
    //if j is at the end that means it's found the next smallest index and it ready to swap
    if(this.j >= this.list.length){
      //Swaps the indexs
      this.list[this.leastIndex] = this.list[this.i];
      this.list[this.i] = this.leastValue; 
      this.swaps++;  
      
      //Goes to the next index that needs to be swapped
      this.i++
      //Sets the least index and value as i for a base
      this.leastIndex = this.i;
      this.leastValue = this.list[this.i];
      //Sets j to the next index that needs to compared for swappability
      this.j = this.i + 1;
      return;
    }
    
    //Checks the index j to see if it's less than current least value
    if(this.list[this.j] < this.leastValue){
      //if its less then make it the value to swap unless a less value is found
      this.leastIndex = this.j;
      this.leastValue = this.list[this.leastIndex]
      
      
      //Adds this to the checking indexs for visualization
      this.checkingIndex[this.checkingIndex.length] = this.j;
    }
    this.comparisons++;
    //Goes to the next index (j) to be checked
    this.j++;
    
  }
  
  DrawSelection(){
    
    //Sets the background to erase past drawings
    background(0,50,0);
    //Changes rectangle color
    fill(0,200,0);

    //Gets the thickness of the line by canvasSize divided by the list size
    let lineWidth = this.canvasX / this.list.length;
    //Removes the rect outline to make it look cleaner
    noStroke(); 
    

    //Loops through to draw every element
    for(i = 0; i < this.list.length; i++){
      //Gets decmial percentage value of what percent of the y it should take up
      let valPerc = (this.list[i] + 1) / this.list.length;
      
      //Multiples the percentage by canvsaY to make it scale to the canvas
      let ySize = valPerc * this.canvasY;
      let startY = Math.round(this.canvasY - ySize);
      let startX = Math.round(lineWidth * i);
      //Draws the rectangle for the element
      rect(startX, startY, lineWidth, ySize);
    }
    
    //Sets the fill for the comparison fill
    fill(150);
    //Fills the comparison indexs for visualizatoins
    for(i = 0; i < this.checkingIndex.length; i++){
      //Gets decmial percentage value of what percent of the y it should take up
      let valPerc = (this.list[this.checkingIndex[i]] + 1) / this.list.length;
      
      //Multiples the percentage by canvsaY to make it scale to the canvas
      let ySize = valPerc * this.canvasY;
      let startY = Math.round(this.canvasY - ySize);
      let startX = Math.round(lineWidth * this.checkingIndex[i]);
      //Draws the rectangle for the element
      rect(startX, startY, lineWidth, ySize);
    }
    //Resets the comparison array for the next draw function
    this.checkingIndex = []
    
    //Displays Comparisons and swaps
    fill(0,200,0);
    textSize(20);
    text('Sorting Algorithm: Selection Sort', 0, 20);
    text('Comaprisons: ' + this.comparisons, 0, 40);
    text('Swaps: ' + this.swaps, 0, 60);
  }
}