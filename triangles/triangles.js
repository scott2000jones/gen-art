function drawTriangle(pointA, pointB, pointC, context) {
    context.strokeStyle = '#d8dee9';
    context.beginPath();
    context.moveTo(pointA.x, pointA.y);
    context.lineTo(pointB.x, pointB.y);
    context.lineTo(pointC.x, pointC.y);
    context.lineTo(pointA.x, pointA.y);
    context.closePath();
    //var gray = Math.floor(Math.random()*16).toString(16);

    var random = Math.random();
    var darkest = '#3b4252';
    var middle = '#434c5e';
    var lightest = '#4c566a';
    if (random < 1/3) { context.fillStyle = darkest; }
    else if (random > 2/3) { context.fillStyle = lightest; }
    else { context.fillStyle = middle; }

    //context.fillStyle = '#' + gray + gray + gray; 
    context.fill();
    context.stroke();
}  

function gen() {
    var canvas = document.getElementById('gen-canvas');
    var context = canvas.getContext('2d');

    //var size = window.innerWidth;
    var size = 512;
    var dpr = window.devicePixelRatio;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.scale(dpr, dpr);
    context.lineJoin = 'bevel';

    var line, dot,
    odd = false, 
    lines = [],
    gap = size / 8;

    for(var y = gap / 2; y <= size; y+= gap) {
        odd = !odd;
        line = [];
        for(var x = gap / 4; x <= size; x+= gap) {
            dot = {x: x + (odd ? gap/2 : 0), y: y};
            line.push({
                x: x + (Math.random()*.6 - .1) * gap  + (odd ? gap/8 : 0),
                y: y + (Math.random()*.6 - .4) * gap
            });
            context.fill();
        }
        lines.push(line);
    }

    var dotLine;
    odd = true;

    for(var y = 0; y < lines.length - 1; y++) {
        odd = !odd;
        dotLine = [];
        for(var i = 0; i < lines[y].length; i++) {
            dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
            dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
        }
        for(var i = 0; i < dotLine.length - 2; i++) {
            drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2], context);
        }
    }

}
