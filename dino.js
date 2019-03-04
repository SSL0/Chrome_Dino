var KEY_CODES = {
    KEY_UP: 38,
    KEY_DOWN: 40,
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function keydown(keyCode) {
    var e = new Event("keydown");
    e.keyCode = keyCode;
    e.which = e.keyCode;
    e.altKey = false;
    e.ctrlKey = true;
    e.shiftKey = false;
    e.metaKey = false;
    e.bubbles = true;
    document.dispatchEvent(e);
}

function keyup(keyCode) {
    var e = new Event("keyup");
    e.keyCode = keyCode;
    e.which = e.keyCode;
    e.altKey = false;
    e.ctrlKey = true;
    e.shiftKey = false;
    e.metaKey = false;
    e.bubbles = true;
    document.dispatchEvent(e);
}

async function main() {
    var canvas = document.getElementsByClassName("runner-canvas")[0];
    var width = canvas.width;
    var height = canvas.height;

    var widthRatio = 1;
    //if (width < 600) {
        //widthRatio = width / 600.0;
    //}
    
    var downArea = {
        x: 100,//width * 0.183333333 / widthRatio,
        y: 105,//height * 0.666666667,
        width: 40 * widthRatio,
        height: 20 * widthRatio
    };
    var upArea = {
        x: 100, //width * 0.141666667 / widthRatio,
        y: 85, //height * 0.666666667,
        width: 40 * widthRatio,
        height: 10 * widthRatio
    };
    var underArea = {
        x: width * 0.045 / widthRatio,
        y: height * 0.733333333,
        width: 91 * widthRatio,
        height: 10 * widthRatio
    }
   
    var downData = canvas.getContext('2d').getImageData(downArea.x, downArea.y, downArea.width, downArea.height).data;
    var upData = canvas.getContext('2d').getImageData(upArea.x, upArea.y, upArea.width, upArea.height).data;
    var underData = canvas.getContext('2d').getImageData(underArea.x, underArea.y, underArea.width, underArea.height).data;

    var downCount = downData.reduce((acc, item) => acc += item, 0);
    var upCount = upData.reduce((acc, item) => acc += item, 0);
    var underCount = underData.reduce((acc, item) => acc += item, 0);

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(downArea.x, downArea.y, downArea.width, downArea.height);
    ctx.rect(upArea.x, upArea.y, upArea.width, upArea.height);
    ctx.rect(underArea.x, underArea.y, underArea.width, underArea.height);
    ctx.stroke();

    if(upCount > 100000){
        keydown(KEY_CODES.KEY_DOWN);
        await sleep(230);
        keyup(KEY_CODES.KEY_DOWN);
    }
    else if (downCount > 100000) {
        keydown(KEY_CODES.KEY_UP); 
    }
    if (underCount == 0) {
        keyup(KEY_CODES.KEY_UP);
        keydown(KEY_CODES.KEY_DOWN);
        await sleep(100);
        keyup(KEY_CODES.KEY_DOWN);
    }
    setTimeout(main, 33);
}
main();