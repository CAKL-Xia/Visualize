const startItem = { 
	startX: 0, 
	startY: 450,
}

const endItem = { 
	endX: 800, 
	endY: 150, 
	
}
  

let mousedownListener = null; 
let mousemoveListener = null;

const collection = {};
const bordersMap = {};  


class GiveLineAbilities { 
    constructor(topNode, context, type = '2d'){ 
		this.graph = document.getElementById(topNode); 
		this.container = document.getElementById(context);   
		this.nodes = [];  


		const width = this.graph.offsetWidth;
		// //  计算画布的高度
		const height = this.graph.offsetHeight;


		this.graph.width = width;
		this.graph.height = height;

		this.graphLeft = this.graph.offsetLeft
		this.graphTop = this.graph.offsetTop

		this.ctx = this.graph.getContext(type);
		this.ctx.strokeStyle="#000000";
		this.ctx.lineWidth = 2;

		this.controlOnceX = 0;
		this.controlOnceY = 0; 
		this.controlTowX = 0;
		this.controlTowY = 0; 
  
    
 
    


        this.initLine();
	}

  
   
   initLine = () => { 
		this.ctx.beginPath();
		this.ctx.moveTo(startItem.startX,startItem.startY);
		this.ctx.bezierCurveTo(200,10,200,100,endItem.endX,endItem.endY);
		this.ctx.stroke();  
   }
 
    
	actionRect = () => {
		this.clearRect()  
		this.renderRect()
		this.createLine()
	 } 


	 createControl = (nodes) => { 
		let containers = document.createDocumentFragment()
    
		for (let index = 0; index < nodes.length; index++) {
	  	  const nodeItem = nodes[index]
		  const tempSpan = document.createElement('span')
		  tempSpan.className = 'control-point'
		  tempSpan.title = nodeItem.type  


		  collection[nodeItem.type] = { 
			endX: nodeItem.left, 
			endY: nodeItem.top, 
		    startX: nodeItem.type  === 'linkStart' ? startItem.startX : endItem.endX, 
			startY: nodeItem.type  === 'linkStart' ? startItem.startY : endItem.endY,
		  }


		  tempSpan.style.top = nodeItem.top + 'px';
		  tempSpan.style.left = nodeItem.left + 'px';
		  tempSpan.style.userSelect = 'none' 
		  containers.appendChild(tempSpan)
		}
		this.container.appendChild(containers)    
		this.nodes = Array.from(this.container.children);   

   
		this.bindEvents()  

		this.createLine()
	 }

  
   createLine = () => { 
	 
	Object.keys(collection).forEach((key) => { 
		const coordinates = collection[key]; 
		this.drawScreen(coordinates)
	})
   }
	  
 
    clearRect =() => {  
	  const w = this.graph.width;
	  const h = this.graph.height;
	  this.ctx?.clearRect(0, 0, w, h);
	}
	

	renderRect = () => {    
		this.ctx.beginPath();
		this.ctx.moveTo(startItem.startX,startItem.startY);
		this.ctx.bezierCurveTo(this.controlOnceX,this.controlOnceY,this.controlTowX,this.controlTowY,endItem.endX,endItem.endY);
		this.ctx.stroke();  
	}  

  
  
	  drawScreen({ startX,  startY , endX, endY}){
		this.ctx.moveTo(startX,startY);    
		this.ctx.lineTo(endX,endY);    
		this.ctx.stroke();	
      }


 
	bindEvents() {   
		  
		function mousedownFn(elem, e) {

			let curNode = elem[0]
			this.startX = e.pageX - this.graphLeft - curNode.offsetLeft;
			this.startY = e.pageY - this.graphTop - curNode.offsetTop; 
		 
			mousemoveListener = mousemoveFn.bind(this, ...arguments)
			document.addEventListener('mousemove', mousemoveListener)
		  }  
		
   

		function mousemoveFn() {
			this.calculate.call(this, ...arguments)
		}

		for (let index = 0; index < this.nodes.length; index++) { 
			 
			const nodesItem = this.nodes[index]; 
	
		    if (nodesItem?.title) {
			
			if (!bordersMap[nodesItem.title]) { 
				  bordersMap[nodesItem.title] = [0,0] 
			   }
				let x = this.graph.clientWidth - nodesItem.clientWidth
				let y = this.graph.clientHeight - nodesItem.clientHeight

				bordersMap[nodesItem.title] = [x, y];  

				mousedownListener = mousedownFn.bind(this, [...arguments].concat(this.nodes[index]))          
				this.nodes[index].addEventListener('mousedown', mousedownListener)
				
			}
           

			document.addEventListener('mouseup', () => {
				document.removeEventListener('mousemove', mousemoveListener)
				document.removeEventListener('mousedown', mousedownListener)
		   })
  
		}

	}


  
  
	calculate() {  
		let curNode = arguments[0][0]
		let e = arguments[2]
		let x = e.pageX - this.graphLeft - this.startX
		let y = e.pageY - this.graphTop - this.startY
	  
		const [maxX, maxY] = bordersMap[curNode.title]  

		if (curNode.title === 'linkStart' ) {
			this.controlOnceX = x;
			this.controlOnceY = y;   


			collection['linkStart'] = { 
				endX: x, 
				endY: y, 
				startX: startItem.startX,
				startY: startItem.startY, 
			  }
	


		} 

		if (curNode.title === 'linkEnd') {
			this.controlTowX = x;
			this.controlTowY = y;  
			collection['linkEnd'] = { 
				endX: x, 
				endY: y, 
				startX: endItem.endX,
				startY: endItem.endY, 
			}

		}

		if (x <= 0) x = 0
		if (y <= 0) y = 0
		if ( x >= maxX) x = maxX
		if ( y >= maxY) y = maxY 

		curNode.style.top = y + 'px'
		curNode.style.left = x + 'px'    

    if ( this.onChange ) {
		this.onChange(x,y)
	}
		 

		this.actionRect()
	  }
	  





  };