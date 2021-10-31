class QuickNode{
  constructor(parent, values){
    // The parent node
    this.parent  = parent;
    
    //The values are stored so that it can be used in the update function
    this.rawValues = [...values];
    
    //Stores the pivot number
    this.pivotNum = null;
    //Stores the value that the array holds
    this.value = [];
    //Whether the node has split into lower branches
    this.hasSplit = false;
    //Whether this is the bottom of the tree
    this.isBottom = false;
    
    //If there is only 1 or 0 values in array then it's a bottom node
    if(values.length <= 1){
      this.value = [...values];
      this.hasSplit = true;
      this.isBottom = true;
      this.left = null;
      this.right = null;
      
      return;
    }
    //The current index for spliting
    this.j = 1;
    //Sets the pivot number
    this.pivotNum = values[0];
    
    //Holds the values for the left and right nodes
    this.leftArr = [];
    this.rightArr = [];
    
    //sets the nodes as null until ready to fully split
    this.left = null;
    this.right = null;
  }
  
  //Updates the quick node
  //Returns true if a compaision was made for the sorting algoritm and false otherwise
  updateQuick(){
    //if has already split the node nothing to update
    if(this.hasSplit){
      //Shouldn't ever come to this statement, here for debugging
      print("Already splited this node");
      //Returns false because no sorting comparision was made
      return false;
    }
    
    //if has split all the values in the array
    if(this.j >= this.rawValues.length){
      //Sets split to true
      this.hasSplit = true;
      //Creates right and left nodes
      this.left = new QuickNode(this, this.leftArr);
      this.right = new QuickNode(this, this.rightArr);
      //Returns false because no sorting comparision was made
      return false;
    }
    
    //Checks whether the value needs to be a value on the right or left node
    if(this.rawValues[this.j] <= this.pivotNum){
      this.leftArr[this.leftArr.length] = this.rawValues[this.j];
    }
    else{
      this.rightArr[this.rightArr.length] = this.rawValues[this.j];
    }
    //Goes to the next index to be split
    this.j++;
    //Returns true because a sorting comparision was made
    return true;
  }
  
  //Goes through the tree in an inorder fashion to get the array
  GetArrayData(){
    //If it's at the bottom then return the value as there is no left or right node
    if(this.isBottom){
      return this.value;
    }
    //Array to hold the data
    var curArrData = [];
    //If the node hasn't split yet that means it shows the progress
    if(!this.hasSplit){
      //First it combines the lists in an inorder fashion
      curArrData = [...this.leftArr, this.pivotNum, ...this.rightArr];
      //Then it puts the rest of the values that haven't been split yet in the back
      for(var j = this.j; j < this.rawValues.length ; j++){
        curArrData[curArrData.length] = this.rawValues[j];
      }
    }
    //If the node has been split then combines the nodes in a in order fashion using recursion
    else{
      curArrData = [...this.left.GetArrayData(), this.pivotNum, ...this.right.GetArrayData()];
    }
    //Returns the data
    return curArrData;
  }
  
  //Checks if a node sorted
  //A node is only sorted if all the nodes below it are sorted
  GetDone(){
    //if the node is the bottom then it's sorted  because it only has 1 or 0 values
    if(this.isBottom){
      return true;
    }
    //if hasn't split that means it's not sorted 
    else if(!this.hasSplit){
      return false;
    }
    //Otherwise check if the right and left nodes are sorted then it's sorted
    //This uses recursion
    else{
      return this.left.GetDone() && this.right.GetDone();
    }
  }
  
}