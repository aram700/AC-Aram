let rValue = 135;
let gValue = 205;
let bValue = 235;
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

    if (gValue >= 105 && isTrue) {
        gValue -= 2;

    }
    if (bValue >= 105 && isTrue) {
        bValue -= 2;
    }
    if (rValue >= 105 && isTrue) {
        rValue -= 2;
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
}

function mousePressed() {
    if (beat != 'mic') {
        rValue = 135;
        gValue = 205;
        bValue = 235;
        togglePlay();
        if (isTrue) {
            isTrue = false;
        }
        else {
            isTrue = true;
        }
    }
    else {
        rValue = 135;
        gValue = 205;
        bValue = 235;
        toggleListen();
        if (isTrue) {
            isTrue = false;
        }
        else {
            isTrue = true;
        }
    }
}


