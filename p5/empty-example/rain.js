let rValue = 0;
let gValue = 0;
let bValue = 0;
var song;
var button;
var fft;
var barWidth;
var isTrue = false;
var amplitude;
var isDrop = false;
var beat;
var vol;
var mic;
var maxvolume;
var minvolume;
var fade;

var ampHistory = [];

function preload() {
    beat = prompt('Input Song Number');
    if (beat != 'mic') {
        song = loadSound("audio/myBeat" + beat + ".mp3");
        maxvolume = 0.5;
        minvolume = 0.3;
    }
    else {
        maxvolume = 0.2;
        minvolume = 0.1;
        mic = new p5.AudioIn();
        mic.start();
    }
}


function setup() {
    frameRate(10)
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //colorMode(HSB);
    // song.loop();
    fft = new p5.FFT(.6, 64);
    barWidth = width / 64;
    amplitude = new p5.Amplitude();

}

function togglePlay() {
    if (!song.isPlaying()) {
        song.loop();
    } else {
        song.stop();
    }
}

function toggleListen() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function volGetLevel() {
    if (beat != 'mic') {
        vol = amplitude.getLevel();
    }
    else {
        vol = mic.getLevel();
    }
}



//DRAW--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function draw() {


    volGetLevel();
    if (beat != 'mic') {
        song.setVolume(1);
    }
    else {

    }
    strokeWeight(1);

    if (gValue <= 105 && isTrue) {
        gValue += 2;

    }
    if (bValue <= 105 && isTrue) {
        bValue += 2;
    }
    if (rValue <= 105 && isTrue) {
        rValue += 2;
    }
    /* else if (lyub <= 5 && lyub > 0) {
         b += 5;
     }
     if(lyub <= 0){
         lyub = 40;
     }*/

    fill(rValue, gValue, bValue);
    rect(0, 0, width, height);
    stroke(255, 80);



    if (vol >= minvolume) {
        if (vol >= maxvolume) {

            isDrop = true;
            console.log(isDrop)
            fill(255);
        }
        else if (vol >= minvolume) {
            isDrop = false;
            fill(100, 0, 160, 50);
        }

        rect(0, 0, width, height);
        xy = [];
        xy2 = [];
        firstxy = {
            x: random(width),
            y: 0
        }
        xy.push(firstxy);

        for (var i = 1; i <= 4; i++) {
            var newxy = {
                x: random(xy[i - 1].x - 50, xy[i - 1].x + 50),
                y: random(xy[i - 1].y, xy[i - 1].y + height / 2)
            }
            xy.push(newxy);
        }
        for (var i = 1; i < xy.length; i++) {
            strokeWeight(6);
            if (isDrop) {
                stroke(0);
            }
            else {
                stroke(255);
            }
            line(xy[i - 1].x, xy[i - 1].y, xy[i].x, xy[i].y);
            stroke(255);
        }
        // line(x-10,y+20,x-60,y+40);
    }

    for (let i = 0; i < vol * 1000; i++) {
        strokeWeight(1);
        if (isDrop) {
            stroke(0, 50);
        }
        else {
            stroke(255, 50)
        }
        var a = random(width);
        var b = random(height / 2, height)
        line(a, b, a + random(-20, 20), 0);
    }
    if (beat == 7) {
        fade = vol * 300;
        if (isDrop) {
            stroke(0, 255, 255, 255);
        }
        else {
            stroke(255, fade);
        }
        strokeWeight(10);
        line(100, 100, 200, 300);
        line(200, 300, 250, 200);
        line(250, 200, 310, 310);
        line(310, 310, 370, 150);
        if (isDrop) {
            stroke(0, 100, 255, 255);
        }
        else {
            stroke(255, fade);
        }
        line(250, 150, 160, 300);
        line(250, 150, 340, 300);
    }
}

//END_OF_DRAW----------------------------------------------------------------------------------------------------
//MOUSE_PRESSED----------------------------------------------------------------------------------------------------

function mousePressed() {
    if (beat != 'mic') {
        rValue = 0;
        gValue = 0;
        bValue = 0;
        togglePlay();
        if (isTrue) {
            isTrue = false;
            fade = 0;
            time = 0;
        }
        else {
            isTrue = true;
            fade = 255;
            time = 120;
        }
    }
    else {
        rValue = 0;
        gValue = 0;
        bValue = 0;

        toggleListen();
        if (isTrue) {
            isTrue = false;

        }
        else {
            isTrue = true;

        }
    }
}
//KEY_PRESSED----------------------------------------------------------------------------------------------------
function keyPressed() {
    if (keyCode == 32) {
        if (beat != 'mic') {
            rValue = 0;
            gValue = 0;
            bValue = 0;
            togglePlay();
            if (isTrue) {
                isTrue = false;
                fade = 0;
                time = 0;
            }
            else {
                isTrue = true;
                fade = 255;
                time = 120;
            }
        }
        else {
            rValue = 0;
            gValue = 0;
            bValue = 0;

            toggleListen();
            if (isTrue) {
                isTrue = false;
            }
            else {
                isTrue = true;
            }
        }
    }
}

