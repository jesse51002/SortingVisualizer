class QuickNode{
  constructor(origin, values){
    this.origin  = origin;
    
    this.rawValues = [...values];
    
    this.pivotNum = null;
    
    this.value = [];
    this.hasSplit = false;
    this.isBottom = false;
    
    //print(values.length)
    if(values.length <= 1){
      this.value = [...values];
      this.hasSplit = true;
      this.isBottom = true;
      this.left = null;
      this.right = null;
      
      return;
    }
    
    this.j = 1;
    
    this.pivotNum = values[0];
    
    this.leftArr = [];
    this.rightArr = [];
    
    this.left = null;
    this.right = null;
  }
  
  updateQuick(){
    
    if(this.hasSplit){
      print("Already splited this node");
      return;
    }
    
    
    if(this.j >= this.rawValues.length){
      this.hasSplit = true;
      this.left = new QuickNode(this, this.leftArr);
      this.right = new QuickNode(this, this.rightArr);
      return;
    }
    
    if(this.rawValues[this.j] <= this.pivotNum){
      this.leftArr[this.leftArr.length] = this.rawValues[this.j];
    }
    else{
      this.rightArr[this.rightArr.length] = this.rawValues[this.j];
    }

    this.j++;
  }
  
  GetArrayData(){
    
    if(this.isBottom){
      return this.value;
    }
    var curArrData = [];
    if(!this.hasSplit){
      curArrData = [...this.leftArr, this.pivotNum, ...this.rightArr];
      
      for(var j = this.j; j < this.rawValues.length ; j++){
        curArrData[curArrData.length] = this.rawValues[j];
      }
    }
    else{
      curArrData = [...this.left.GetArrayData(), this.pivotNum, ...this.right.GetArrayData()];
    }
    
    return curArrData;
  }
  
  GetDone(){
    if(this.isBottom){
      return true;
    }
    else if(!this.left || !this.right){
      return false;
    }
    else{
      return this.left.GetDone() && this.right.GetDone();
    }
  }
  
}