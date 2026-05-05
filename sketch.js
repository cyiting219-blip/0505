let capture;
let faceMesh;
let faces = []; // 變數名稱建議改為 faces 以符合新版慣例

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 建立攝影機並設定固定尺寸以利模型運算
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  imageMode(CENTER);

  // 修正 1: ml5 v1.0 改用 faceMesh (小駝峰命名) 
  // 修正 2: 使用 detectStart 進行持續偵測並更新 callback
  faceMesh = ml5.faceMesh(capture, modelReady);
  faceMesh.detectStart(capture, gotFaces);
}

function modelReady() {
  console.log("FaceMesh model ready!");
}

function gotFaces(results) {
  faces = results;
}

function draw() {
  background('#e7c6ff');

  textAlign(CENTER, CENTER);
  textSize(32);
  noStroke();
  fill(0);
  text('教科414730373', width / 2, height / 8);

  let drawW = width * 0.5;
  let drawH = height * 0.5;
  image(capture, width / 2, height / 2, drawW, drawH);

  drawFacemarks(drawW, drawH);
}

function drawFacemarks(drawW, drawH) {
  if (faces.length > 0) {
    push();
    const pts = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
    
    let startX = width / 2 - drawW / 2;
    let startY = height / 2 - drawH / 2;

    stroke(255, 0, 0);
    strokeWeight(15);

    for (let i = 0; i < faces.length; i++) {
      const keypoints = faces[i].keypoints;

      for (let j = 0; j < pts.length; j++) {
        let indexA = pts[j];
        let indexB = pts[(j + 1) % pts.length];
        
        let ptA = keypoints[indexA];
        let ptB = keypoints[indexB];
        
        if (ptA && ptB) {
          // 修正 3: ml5 v1.0 的座標格式為 {x, y} 而非舊版的陣列 [0, 1]
          let x1 = startX + (ptA.x / capture.width) * drawW;
          let y1 = startY + (ptA.y / capture.height) * drawH;
          let x2 = startX + (ptB.x / capture.width) * drawW;
          let y2 = startY + (ptB.y / capture.height) * drawH;
          
          line(x1, y1, x2, y2);
        }
      }
    }
    pop();
  }
}