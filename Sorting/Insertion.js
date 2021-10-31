class Insertion{
  constructor(list, canvasX, canvasY){
    //The canvas size
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    
    //Randomized List
    this.list = list;
    
    //The index that needs to be inserted
    this.i = 1;
    //Current index being checked for insertion
    this.j = this.i-1;
    //The value looking for insertion
    this.insertValue = this.list[this.i];
    
    //If the sorting has been finished
    this.sorted = false;
    
    //Logs the number of comparison and swaps
    this.comparisons = 0;
    this.swaps = 0;
    
    //Indexs being swapped for visualization
    this.checkingIndex = [];
  }
  
  UpdateInsertion(){
    //if I is at the end that means sorting is finished
    if(this.i >= this.list.length){
      this.sorted = true;
      this.checkingIndex = []
      return;
    }
    
    //if j is less than 0 that means it's found its spot to be inserted
    if(this.j < 0){
      
      //Goes to the next index that needs to be inserted in the sorted portion
      this.i++;
      //Sets the element at that index to the insert value
      this.insertValue = this.list[this.i];
      
      //Sets j to the next index that needs to compared for insertion
      this.j = this.i - 1;
      
      //Logs the swap
      this.swaps++;  
      return;
    }
    
    //Checks the index j to see if its greatar than the swap value
    //If its greater than move it up an index
    if(this.list[this.j] > this.insertValue){
      this.list[this.j+1] = this.list[this.j];           
    }
    //Else insert the value at the index above it
    else{
      this.list[this.j + 1] = this.insertValue;
      //Sets j to -1 to show that it has been inserted
      this.j = -1;      
    }
    
    //Logs the comparison
    this.comparisons++;
    
    //Goes to the next index (j) to be checked
    this.j--;
    
    //This means that index 0 is the place it should be inserted
    if(this.j == -1){
      this.list[0] = this.insertValue; 
    }
    
    //Adds this to the checking indexs for visualization
    this.checkingIndex[this.checkingIndex.length] = this.j;
    
  }
  
  DrawInsertion(){
    
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
      //Limits the amount that can be displayed at once
      if(i > Math.max(1, this.list.length / 40)){
        break;
      }
      
      //j is the actual index being visualized
      //it displays the most recent information first
      let j = this.checkingIndex.length - i- 1;
      
      //Gets decmial percentage value of what percent of the y it should take up
      let valPerc = (this.list[this.checkingIndex[j]] + 1) / this.list.length;
      
      //Multiples the percentage by canvsaY to make it scale to the canvas
      let ySize = valPerc * this.canvasY;
      let startY = Math.round(this.canvasY - ySize);
      let startX = Math.round(lineWidth * this.checkingIndex[j]);
      //Draws the rectangle for the element
      rect(startX, startY, lineWidth, ySize);
    }
    //Resets the comparison array for the next draw function
    this.checkingIndex = []
    
    //Displays Comparisons and swaps
    fill(0,200,0);
    textSize(20);
    text('Sorting Algorithm: Insertion Sort', 0, 20);
    text('Comaprisons: ' + this.comparisons, 0, 40);
    text('Swaps: ' + this.swaps, 0, 60);
  }
}