class Stage {    
    _container;
    _ctx = null;
    _canvas = null; 
    _options = {};
    _elements = [];

    constructor(containerSel,options){           
        this._container = document.querySelector(containerSel); 
        this._container.style.position = 'relative';
        this._canvas = document.createElement("canvas"); 
        this._container.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight; 
        this._options = options;
  
        this._init();
        this.render()
    }  

  

    _init() { 
      this._bindEvent();
    }
  
     
    _bindEvent = () => { 
      // 鼠标按下时，相对元素基准点x, y的偏移量
      let downPointOffsetX = 0;
      let downPointOffsetY = 0;           
      let downPageX = 0;
      let downPageY = 0;
      let targetEle = null;
 

      const moveFn  = (moveEvent) => {   

        let canvasX = moveEvent.pageX - this._container.offsetLeft - downPointOffsetX;
        let canvasY = moveEvent.pageY - this._container.offsetTop - downPointOffsetY;
        const { drag } = targetEle && targetEle !== null ? targetEle : { drag: false}
      
        if (drag) {
          if (canvasX < 0) canvasX = 0;
          if (canvasX > this._canvas.width) canvasX = this._canvas.width;
          if (canvasY < 0) canvasY = 0;
          if (canvasY > this._canvas.height) canvasY = this._canvas.height;
          targetEle.onDrag(canvasX, canvasY)
         }       
         
        
        this.render();
      }; 

      this._canvas.addEventListener('mousedown', (e) => { 
        targetEle = this._pointInWitchElement(e.offsetX, e.offsetY);    
          
        if (targetEle) {
          downPointOffsetX = e.offsetX - targetEle.x;
          downPointOffsetY = e.offsetY - targetEle.y;
        }
        downPageX = e.pageX;
        downPageY = e.pageY;
        document.addEventListener('mousemove', moveFn);
      })
   

      document.addEventListener('mouseup', (upEvent) => {
        document.removeEventListener('mousemove', moveFn);
      });  
      // 更新
      this.render();
    }

    appendElement = (ele) => {   
      ele.bindCtx(this._ctx);
      this._elements.push(ele);
    }
     

    render = () => { 
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._elements.forEach(ele => ele.render());
    }  

    _pointInWitchElement(x, y) {   
        let target = this._elements.toReversed().find(ele => {
          if (typeof ele.containPoint !== 'function') return false;  
          return ele.containPoint(x, y);
        });  

        return target;
    }
}