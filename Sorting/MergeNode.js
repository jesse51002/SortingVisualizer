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
  
  updateMerge(){
    
    if(this.hasValue){
      print("Already merged this node");
      return;
    }
    
    let leftFinished = this.mergeIL >= this.left.value.length;
    let rightFinished = this.mergeIR >= this.right.value.length;
    
    if(leftFinished && rightFinished){
      this.hasValue = true;
    }
    else if(leftFinished){
      
      this.value[this.mergeJ] = this.right.value[this.mergeIR];      
      this.mergeIR++;
      this.mergeJ++;
    }
    else if(rightFinished){
      
      this.value[this.mergeJ] = this.left.value[this.mergeIL];      
      this.mergeIL++;
      this.mergeJ++;
    }
    else if(this.left.value[this.mergeIL] < this.right.value[this.mergeIR]){
      
      this.value[this.mergeJ] = this.left.value[this.mergeIL];      
      this.mergeIL++;
      this.mergeJ++;
    }
    else{
      
      this.value[this.mergeJ] = this.right.value[this.mergeIR];      
      this.mergeIR++;
      this.mergeJ++;
    }
  }
  
  GetArrayData(){
    if(this.hasValue){
      return this.value;
    }
    
    let curArrData = [];
    
    if(this.left.hasValue && this.right.hasValue){
      curArrData = [...this.value];
      
      for(let i = this.mergeIL; i < this.left.value.length; i++){
        curArrData[curArrData.length] = this.left.value[i];
      }
      
      for(let i = this.mergeIR; i < this.right.value.length; i++){
        curArrData[curArrData.length] = this.right.value[i];
      }
      
      return curArrData;
    }
    
    let leftData = [];
    if(this.left.hasValue){
      leftData = this.left.value;
    }
    else{
      leftData = this.left.GetArrayData();
    }
    
    for(let i =0; i < leftData.length; i++){
      curArrData[i] = leftData[i];
    }
    
    let rightData = [];
    if(this.right.hasValue){
      rightData = this.right.value;
    }
    else{
      rightData = this.right.GetArrayData();
    }
    
    for(let i =0; i < rightData.length; i++){
      curArrData[curArrData.length] = rightData[i];
    }
    
    return curArrData;
    
  }
  
}