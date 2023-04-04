class Circle extends Shape { 
    constructor(options) {
        super(options);
        this.type = 'circle';
      } 
 
      containPoint(px, py) {
        const { x, y, radius } = this;
        return Math.sqrt((px - x) * (px - x) + (py - y) * (py - y)) <= radius;
      }  


      render() {   
        const { ctx, x, y, radius, background = 'white', borderColor = 'black', opacity, backgroundImage }  = this;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);  
        ctx.fillStyle = background;
        ctx.fill();
         
        if (backgroundImage) {
          ctx.save();
          ctx.clip();
          ctx.drawImage(backgroundImage, x - radius, y - radius, radius * 2, radius * 2);
          ctx.restore();
        }  

        if (borderColor) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = borderColor;
          ctx.stroke();
          ctx.closePath();
        }
       
        ctx.globalAlpha = 1;
      }
}