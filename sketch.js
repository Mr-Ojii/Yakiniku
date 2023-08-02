let scene = "result";
let SP = 0;
let countdown = 3 * 30;
let list = [
    { e: false },
    { e: false },
    { e: false },
    { e: false },
    { e: false },
    { e: false },
    { e: false },
    { e: false },
    { e: false },
];
let beforeMouse = false;
let score = [
    0,0,0,0
]


function setup() {
    createCanvas(400, 400);
    frameRate(30);
}

function draw() {
    background(162, 62, 44);
    switch(scene) {
        case "title":
            textAlign(LEFT, BOTTOM);
            fill(219, 33, 82);
            strokeWeight(3);
            rect(50, 200, 300, 100);
            fill(255);
            textSize(40);
            text("Game Start!", 75, 265);
            if (mouseIsPressed) {
                if (mouseX >= 50 && mouseX <= 350 && mouseY >= 200 && mouseY <= 300) {
                    scene = "countdown";
                    countdown = 3 * 30;
                }
            }
            break;
        case "countdown":
            textSize(100);
            fill(255);
            textAlign(CENTER, CENTER);
            text(String(Math.ceil(countdown / 30)), 200, 200);
            countdown--;
            if(countdown == 0) {
                scene = "game";
                countdown = 90 * 30;
                list = [
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                    { e: false },
                ];
                score = [
                    0,0,0,0
                ];
            }
            break;
        case "game":
            countdown--;
            textSize(20);
            textAlign(LEFT, TOP);
            fill(100);
            ellipse(200, 200, 300, 250);
            fill(255);
            text("Time:" + String(Math.ceil(countdown / 30)).padStart(2, '0'), 300, 0);
            text("SP:" + String(SP).padStart(8, '0'), 20, 0);
            for(let i = 0; i < 9; i++) {
                if (list[i].e) {
                    let x = i % 3;
                    let y = Math.floor(i / 3);
                    if(list[i].time - countdown <= 5 * 30) {
                        fill(200, 0, 48);
                    } else if(list[i].time - countdown <= 8 * 30) {
                        fill(189, 119, 67);
                    } else if(list[i].time - countdown <= 9 * 30) {
                        fill(225, 224, 118);
                    } else if(list[i].time - countdown <= 12 * 30) {
                        fill(189, 119, 67);
                    } else if(list[i].time - countdown <= 32 * 30) {
                        fill(0);
                    } else {
                        list[i].e = false;
                        continue;
                    }
                    rect(x * 60 + 120, y * 50 + 130, 50, 40);
                } else {
                    if(Math.random() < ((90 * 30 - countdown) / 30 / 100)) {
                        list[i].e = true;
                        list[i].time = countdown;
                    }
                }
            }

            if(mouseIsPressed && !beforeMouse) {
                let x = Math.floor((mouseX - 120) / 60);
                let y = Math.floor((mouseY - 130) / 50);
                let i = y * 3 + x;
                if((mouseX - 120) % 60 <= 50 && 0 <= x && x <= 2 && (mouseY - 120) % 50 <= 40 && 0 <= y && y <= 2) {
                    if(list[i].e) {
                        list[i].e = false;

                        if(list[i].time - countdown <= 5 * 30) {
                            SP -= 5;
                            score[0]++;
                        } else if(list[i].time - countdown <= 8 * 30) {
                            SP += 2;
                            score[1]++;
                        } else if(list[i].time - countdown <= 9 * 30) {
                            SP += 10;
                            score[2]++;
                        } else if(list[i].time - countdown <= 12 * 30) {
                            SP += 2;
                            score[1]++;
                        } else if(list[i].time - countdown <= 32 * 30) {
                            SP -= 10;
                            score[3]++;
                        }
                        if(SP < 0)
                            SP = 0;
                    }
                }
            }
            beforeMouse = mouseIsPressed;

            if(countdown <= 0) {
                scene = "result";
            }
            break;
        case "result":
            fill(200);
            rect(50, 50, 300, 300);
            textSize(20);
            textAlign(LEFT, TOP);
            fill(0);
            let y = 50;
            textSize(40);
            text("Result", 50, y);
            y += 60;
            textSize(20);
            text("SP: " + String(SP).padStart(8, '0'), 50, y);
            y += 20;
            text("生: " + String(score[0]).padStart(3, '0'), 50, y);
            y += 20;
            text("焼: " + String(score[1]).padStart(3, '0'), 50, y);
            y += 20;
            text("金: " + String(score[2]).padStart(3, '0'), 50, y);
            y += 20;
            text("炭: " + String(score[2]).padStart(3, '0'), 50, y);
            y += 50;
            text("Click to return to title.", 50, y);
            if(mouseIsPressed)
                scene = "title";
            break;
    }
}
