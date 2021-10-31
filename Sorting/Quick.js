class Quick{
  constructor(list, canvasX, canvasY){
    //The canvas size
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    
    //Randomized List
    this.list = list;   
    
    this.searchTree = new QuickNode(null, [...list]);
  
    this.quickRec = [this.searchTree];
    
    
    //Logs the number of comparison and swaps
    this.comparisons = 0;
    this.swaps = 0;
    
    //If the sorting has been finished
    this.sorted = false;
    
    //Indexs being swapped for visualization
    this.checkingIndex = [];
  }
  
  UpdateQuick(){
    if(this.searchTree.GetDone()){
      this.sorted = true;
      return;
    }
    
    
    let curQuickNode = this.quickRec[this.quickRec.length - 1];
    
    if(curQuickNode.isBottom){
      print("int bottom")
      this.quickRec.length -= 1;
      return;
    }
    
    if(!curQuickNode.hasSplit){
      curQuickNode.updateQuick();
      this.comparisons++;
    }
    else if(!curQuickNode.left.hasSplit){
      this.quickRec[this.quickRec.length] = curQuickNode.left;
      
    }
    else if(!curQuickNode.right.hasSplit){
      this.quickRec[this.quickRec.length] = curQuickNode.right;
    }
    else{
      this.quickRec.length -= 1;
    }
    
    this.list = this.searchTree.GetArrayData();
    //print(this.list)
  }
  
  
  DrawQuick(){
    
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
    //this.checkingIndex = []
    
    //Displays Comparisons and swaps
    fill(0,200,0);
    textSize(20);
    text('Sorting Algorithm: Quick Sort', 0, 20);
    text('Comaprisons: ' + this.comparisons, 0, 40);
    text('Swaps: ' + this.swaps, 0, 60);
  }
}