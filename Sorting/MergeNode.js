class MergeNode{
  constructor(origin, values){
    this.origin  = origin;
    
    this.value = [];
    this.hasValue = false;
    
    this.mergeIL = 0;
    this.mergeIR = 0;
    this.mergeJ = 0;
    
    if(values.length == 1){
      this.value = [...values];
      this.hasValue = true;
       
      this.left = null;
      this.right = null;
      return;
    }
    
    let midPoint = Math.ceil(values.length / 2);
    
    this.leftArr = [];
    this.rightArr = [];
    
    for(let j = 0; j < midPoint; j++){
      this.leftArr[j] = values[j];
    }
    for(let j = midPoint; j < values.length; j++){
      this.rightArr[j - midPoint] = values[j];
    }
    
    this.left = new MergeNode(this, this.leftArr);
    this.right = new MergeNode(this, this.rightArr);
  }
  
  //Updates the merge node
  //Returns true if a compaision was made for the sorting algoritm and false otherwise
  updateMerge(){
    //if already has value there's nothing to update
    if(this.hasValue){
      //Shouldn't ever come to this statement, here for debugging
      print("Already merged this node");
      //Returns false because no sorting comparision was made
      return false;
    }
    
    //Contains bool of whehter left or right has finished all it's values
    let leftFinished = this.mergeIL >= this.left.value.length;
    let rightFinished = this.mergeIR >= this.right.value.length;
    
    //If both sides have finished all it's values then this node is sorted
    if(leftFinished && rightFinished){
      
      this.hasValue = true;

      //Returns true to account for the one comparision that would be made after it realizes one side is finihsed
      return true;
    }
    //If left is finished then add values the right node
    else if(leftFinished){
      
      this.value[this.mergeJ] = this.right.value[this.mergeIR];      
      this.mergeIR++;
      this.mergeJ++;

      //Returns false because ususually it would be a loop that adds the rest of the values
      //This is the case here for visualization
      return false;
    }
    //If right is finished then add values the left node
    else if(rightFinished){
      
      this.value[this.mergeJ] = this.left.value[this.mergeIL];      
      this.mergeIL++;
      this.mergeJ++;
      //Returns false because ususually it would be a loop that adds the rest of the values
      //This is the case here for visualization
      return false;
    }
    //Compare the left and right index to see which is smaller
    //If left is smaller then add it first
    else if(this.left.value[this.mergeIL] < this.right.value[this.mergeIR]){
      
      this.value[this.mergeJ] = this.left.value[this.mergeIL];      
      this.mergeIL++;
      this.mergeJ++;

      return true;

    }
    //Otherwise add the right value
    else{
      
      this.value[this.mergeJ] = this.right.value[this.mergeIR];      
      this.mergeIR++;
      this.mergeJ++;

      return true;
    }
  }
  
  GetArrayData(){
    //if the node is sorted
    if(this.hasValue){
      //Then return it's value
      return this.value;
    }
    //Holds the array data
    let curArrData = [];
    
    //if both sides have values but this node doesn't have it's value
    //That means that this is the node currently being uupdated
    if(this.left.hasValue && this.right.hasValue){
      //First adds the values that it has so far
      curArrData = [...this.value];
      //Then adds the unadded from the left node
      for(let i = this.mergeIL; i < this.left.value.length; i++){
        curArrData[curArrData.length] = this.left.value[i];
      }
      //Then adds the unadded from the right node
      for(let i = this.mergeIR; i < this.right.value.length; i++){
        curArrData[curArrData.length] = this.right.value[i];
      }
      
      return curArrData;
    }
    
    //If one sides aren't sorted then it gets both sides values and combines them

    let leftData = [];
    // if left already has it value then gets it's value
    if(this.left.hasValue){
      leftData = this.left.value;
    }
    //Otherwise use recursion to gets its value
    else{
      leftData = this.left.GetArrayData();
    }
    
    let rightData = [];
    // if right already has it value then gets it's value
    if(this.right.hasValue){
      rightData = this.right.value;
    }
    //Otherwise use recursion to get it's value
    else{
      rightData = this.right.GetArrayData();
    }
    //Combines both sides togther
    curArrData = [...leftData, ...rightData]
    //returns the combined value
    return curArrData;
    
  }
  
}