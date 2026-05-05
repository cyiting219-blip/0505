let capture;

function setup() {
  // 產生全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的 HTML 影片元素
  imageMode(CENTER); // 設定影像繪製模式為中心點，方便後續置中
}

function draw() {
  // 設定背景顏色為 e7c6ff
  background('#e7c6ff');

  // 設定文字屬性與內容，顯示在畫布上方（影像上方區域）且左右置中
  textAlign(CENTER, CENTER);
  textSize(32); // 可依需求調整文字大小
  fill(0); // 設定文字顏色為黑色
  text('教科414730373', width / 2, height / 8);

  // 將影像繪製在畫布中間，寬高設定為畫布寬高的 50%
  image(capture, width / 2, height / 2, width * 0.5, height * 0.5);
}
