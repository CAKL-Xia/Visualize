class Bezier extends Shape { 
    constructor(options){ 
     super(options);
     this.type = 'bezier';
    } 

    render() { 
      const { ctx, x, y, ex, ey, c1x, c1y, c2x, c2y, opacity, color = 'black' , lineWidth = 1 } = this;
      ctx.globalAlpha = opacity;  
      ctx.strokeStyle = color; 
      ctx.lineWidth = lineWidth; 
 
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        c1x, c1y, 
        c2x, c2y, 
        ex, ey
      );
      ctx.stroke();
      ctx.closePath();   

      ctx.globalAlpha = 1;
    }
}