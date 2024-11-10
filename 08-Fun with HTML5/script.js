const canvas = document.querySelector("#draw");
//memberikan konteks rendering 2D pada kanvas, yang memungkinkan kita menggambar objek 2D di atas kanvas.
const ctx = canvas.getContext("2d");
//window.innerHeight adalah ukuran tinggi viewport jendela browser dalam piksel, sehingga kanvas akan mengisi seluruh tinggi layar.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//Baris ini mengatur warna garis yang akan digambar pada kanvas. ctx.strokeStyle adalah properti
//dari objek ctx yang menentukan warna atau pola garis yang akan digunakan saat menggambar.
// stroke
ctx.strokeStyle = "#BADA55";
//Baris ini mengatur jenis penggabungan garis saat dua garis bertemu (misalnya, ketika menggambar sudut atau ujung garis).
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = "multiply"; // biar warna tercampur

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  console.log(e);
  //Fungsi beginPath() digunakan untuk memulai path (jalur) baru pada kanvas.
  ctx.beginPath();
  //
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

// Canvas mouse
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
