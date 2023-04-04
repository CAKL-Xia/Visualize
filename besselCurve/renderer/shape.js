class Shape extends Node {
  constructor(options) {
    super(options);
    const { opacity = 1.0 , rotate } = options || {};
    this.opacity = opacity;
    // 旋转角度
    this.rotate = typeof rotate === 'number' ?  rotate : 0;
  } 
 
  _rotate(ctx, angle, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
  }
}