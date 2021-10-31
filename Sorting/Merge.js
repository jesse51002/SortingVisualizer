class Merge{
  constructor(list, canvasX, canvasY){
    //The canvas size
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    
    //Randomized List
    this.list = list;   

    //The top node of the binary search tree
    this.searchTree = new MergeNode(null, [...list]);
    
    //Can't use typical recursion because the function has to be done in a while loop(the update function)
    //So use an array that will simulate recusion
    this.mergeRec = [this.searchTree];
    
    //Logs the number of comparison and swaps
    this.comparisons = 0;
    this.swaps = 0;
    
    //If the sorting has been finished
    this.sorted = false;
    
    //Indexs being swapped for visualization
    this.checkingIndex = [];
  }
  
  UpdateMerge(){
    //if the top node has it's value then it's sorted
    if(this.searchTree.hasValue){
      this.sorted = true;
      return;
    }
    
    //Gets the current node in the array recursion
    let curMergeNode = this.mergeRec[this.mergeRec.length - 1];
    
    //If the node has it's value that means it's been sorted
    if(curMergeNode.hasValue){
      //So remove it from the recursion
      this.mergeRec.length -= 1;
      return;
    }
    //If the left ndoe doesn't have it's value then add it to the array recursion
    if(!curMergeNode.left.hasValue){
      this.mergeRec[this.mergeRec.length] = curMergeNode.left;
      return;
      
    }
    //If the right node doesn't have it's value then add it to the array recursion
    else if(!curMergeNode.right.hasValue){
      this.mergeRec[this.mergeRec.length] = curMergeNode.right;
      return;
    }
    
    //Updates the current merge node
    //Return true if a comparision was made
    let madeComparison = curMergeNode.updateMerge();
    if(madeComparison){
      this.comparisons++;
    }
    
    //Gets the current array data from the tree's top node
    this.list = this.searchTree.GetArrayData();
  }
  
  
  DrawMerge(){
    
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
    text('Sorting Algorithm: Merge Sort', 0, 20);
    text('Comaprisons: ' + this.comparisons, 0, 40);
    text('Swaps: ' + this.swaps, 0, 60);
  }
}