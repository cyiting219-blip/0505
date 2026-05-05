let capture;
let faceMesh;
let faces = [];
const pts = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  
  // 初始化 ml5 v1.0 faceMesh
  faceMesh = ml5.faceMesh(capture, () => console.log("Model Ready"));
  faceMesh.detectStart(capture, (results) => { faces = results; });
}

function draw() {
  background('#e7c6ff');
  
  // 繪製文字
  textAlign(CENTER, CENTER);
  textSize(32);
  noStroke();
  fill(0);
  text('教科414730373', width / 2, height / 8);

  // 影像置中縮放
  let drawW = width * 0.5;
  let drawH = height * 0.5;
  let startX = width / 2 - drawW / 2;
  let startY = height / 2 - drawH / 2;
  image(capture, width / 2, height / 2, drawW, drawH);

  if (faces.length > 0) {
    stroke(255, 0, 0); // 紅色線條
    strokeWeight(15);   // 粗細 15
    noFill();

    for (let i = 0; i < faces.length; i++) {
      let keypoints = faces[i].keypoints;
      
      for (let j = 0; j < pts.length; j++) {
        let currIdx = pts[j];
        let nextIdx = pts[(j + 1) % pts.length]; // 連回起點閉合
        
        let ptA = keypoints[currIdx];
        let ptB = keypoints[nextIdx];
        
        if (ptA && ptB) {
          let x1 = startX + (ptA.x / capture.width) * drawW;
          let y1 = startY + (ptA.y / capture.height) * drawH;
          let x2 = startX + (ptB.x / capture.width) * drawW;
          let y2 = startY + (ptB.y / capture.height) * drawH;
          line(x1, y1, x2, y2);
        }
      }
    }
  }
}