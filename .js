const genBtn = document.getElementById('gen');
const dlBtn = document.getElementById('download');
const urlInput = document.getElementById('url');
const canvasWrap = document.getElementById('canvas');
const copyBtn = document.getElementById('copylink');

function make(url){
  canvasWrap.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvasWrap.appendChild(canvas);

  QRCode.toCanvas(canvas, url, { errorCorrectionLevel: 'M', width: 600 }, function(err){
    if(err){
      alert("Lỗi khi tạo QR: " + err);
      dlBtn.disabled = true;
      return;
    }
    dlBtn.disabled = false;
    dlBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'star-garden-qr.png';
      a.click();
    };
  });
}

genBtn.addEventListener('click', ()=> make(urlInput.value.trim()));

copyBtn.addEventListener('click', ()=>{
  navigator.clipboard?.writeText(urlInput.value.trim()).then(()=>{
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent = 'Copy URL', 1200);
  });
});

// auto generate on load
window.addEventListener('load', ()=> make(urlInput.value.trim()));
