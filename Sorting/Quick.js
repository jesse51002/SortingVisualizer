class Quick{
  constructor(list, canvasX, canvasY){
    //The canvas size
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    
    //Randomized List
    this.list = list;   
    
    //The top node of the binary search tree
    this.searchTree = new QuickNode(null, [...list]);
    
    //Can't use typical recursion because the function has to be done in a while loop(the update function)
    //So use an array that will simulate recusion
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
    //Is sorted if the binary search tree top node is sorted
    if(this.searchTree.GetDone()){
      this.sorted = true;
      return;
    }
    
    //Gets the current node in the array recursion
    let curQuickNode = this.quickRec[this.quickRec.length - 1];
    
    //if the node has 1 or 0 values in it then it can't be split anymore hence it's sorted
    if(curQuickNode.isBottom){
      //Since the node is sorted remove it from the array recursion
      this.quickRec.length -= 1;
      return;
    }
    
    //If the node hasn't been split into two yet then it needs to be updated
    if(!curQuickNode.hasSplit){
      //Updates the node, returns true if the update had a comparision
      let comparisionMade = curQuickNode.updateQuick();
      if(comparisionMade){
        this.comparisons++;
      }
    }
    //If the left node hasn't been split then it need to be split next
    else if(!curQuickNode.left.hasSplit){
      //Adds it to the array recursion
      this.quickRec[this.quickRec.length] = curQuickNode.left;
      
    }
    //If the right node hasn't been split then it need to be split next
    else if(!curQuickNode.right.hasSplit){
      //Adds it to the array recursion
      this.quickRec[this.quickRec.length] = curQuickNode.right;
    }
    //If they have both been split that means this node has been sorted
    else{
      //Removes it fromt the array recursion
      this.quickRec.length -= 1;
    }
    
    //Gets the current list from the top node
    this.list = this.searchTree.GetArrayData();
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