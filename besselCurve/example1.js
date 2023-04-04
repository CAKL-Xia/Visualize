const example1 = () => { 
  const stage = new Stage("#container");
 
    // 起始，结束线
    const endStartLine = new Line({ x1: 10, y1: 390, x2: 590, y2: 10, lineWidth: 6, color: 'rgba(200, 200, 200, .6)'  }) 
    stage.appendElement(endStartLine);
    
    // 辅助线 
    const line1 = new Line({x1: 10, y1: 390, x2: 150, y2: 100, lineWidth: 1, color: 'black'});
    const line2 = new Line({x1: 590, y1: 10, x2: 450, y2: 300, lineWidth: 1, color: 'black'});
    stage.appendElement(line1);
    stage.appendElement(line2);
   
 
   // 辅助节点 
    const ctl1Circle = new Circle({x: 150, y: 100, radius: 8, background: 'red', borderColor: 'black', drag: true});
    const ctl2Circle = new Circle({x: 450, y: 300, radius: 8, background: 'blue', borderColor: 'black', drag: true}); 
    stage.appendElement(ctl1Circle);
    stage.appendElement(ctl2Circle);


    // 开始节点，尾部节点
    const startCircle = new Circle({x: 10, y: 390, radius: 8, background: 'white', borderColor: 'black', drag: true});
    const endCircle = new Circle({x: 590, y: 10, radius: 8, background: 'white', borderColor: 'black', drag: true});   
    stage.appendElement(startCircle);
    stage.appendElement(endCircle);   


    // startCircle.onDrag((x,y) => {             
   
      
    // })   


   console.log('====================================');
   console.log( 'startCircle', startCircle);
   console.log('====================================');
    



  stage.render();
}