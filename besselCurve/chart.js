
const startItem = { 
	startX: 0, 
	startY: 450,
}

const endItem = { 
	endX: 800, 
	endY: 150, 
	
}



class Chart { 
  constructor(context,type= '2d') { 
    this.context = document.getElementById(context); 
    this.canvasEx = null;
    this.initCanvas(type)
  }

  
   
  initCanvas (type) { 
    const canvas = document.createElement('canvas')
    canvas.width = 600;
    canvas.height = 400;
    this.context.appendChild(canvas)    
	this.canvasEx = canvas.getContext(type);
  }

   

  clearRect =() => {  
    const w = this.context.width;
    const h = this.context.height;
    this.canvasEx.clearRect(0, 0, w, h);
  }
    
    
  renderRect = () => {    
    this.ctx.beginPath();
    this.ctx.moveTo(startItem.startX,startItem.startY);
    this.ctx.bezierCurveTo(this.controlOnceX,this.controlOnceY,this.controlTowX,this.controlTowY,endItem.endX,endItem.endY);
    this.ctx.stroke();  
 }  

  
  

 }