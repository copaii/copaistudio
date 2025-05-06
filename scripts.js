// Utility to parse WxH string
function parseSize(sizeStr) {
    const [w, h] = sizeStr.split('x').map(Number);
    return { width: w, height: h };
  }

  const canvasContainer = document.getElementById('canvasContainer');
  const backgroundImage = document.getElementById('backgroundImage');
  const foregroundImage = document.getElementById('foregroundImage');
  const logoImage = document.getElementById('logoImage');
  const textBlocks = document.getElementById('textBlocks');
  const textBlockSizeControls = document.getElementById('textBlockSizeControls');
const textBlockWidthSlider = document.getElementById('textBlockWidthSlider');
const textBlockHeightSlider = document.getElementById('textBlockHeightSlider');
const textBlockWidthValue = document.getElementById('textBlockWidthValue');
const textBlockHeightValue = document.getElementById('textBlockHeightValue');
const textBlockBgColor = document.getElementById('textBlockBgColor');
const transparentBgBtn = document.getElementById('transparentBgBtn');

  let currentCanvasSize = '1280x1280';

  function parseSize(size) {
const [width, height] = size.split('x').map(Number);
return { width, height };
}

function updateCanvasDimension(size) {
const { width, height } = parseSize(size);
const dpr = window.devicePixelRatio || 1;

// Set container styles
canvasContainer.style.aspectRatio = `${width} / ${height}`;
canvasContainer.style.maxHeight = '66.666vh';
canvasContainer.style.height = '100%';
canvasContainer.style.width = 'auto';

// Set canvas internal size (actual pixel dimensions)
canvas.width = width * dpr;
canvas.height = height * dpr;

// Set canvas CSS size to fill container
canvas.style.width = `${canvasContainer.clientWidth}px`;
canvas.style.height = `${canvasContainer.clientHeight}px`;

// Scale the canvas context for crisp rendering
const ctx = canvas.getContext('2d');
ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
ctx.scale(dpr, dpr);

console.log('Canvas Dimensions Updated:', canvas.width, canvas.height);

// Optional: redraw your image or content after resize here
}


window.addEventListener('DOMContentLoaded', () => {
updateCanvasDimension(currentCanvasSize);
});

window.addEventListener('resize', () => {
updateCanvasDimension(currentCanvasSize);
});


  // Dimension tabs
  document.querySelectorAll('.dimension-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dimension-tab').forEach(t => {
        t.classList.remove('active', 'gradient-ring');
        // t.classList.add('bg-gray-200');
      });
      tab.classList.add('active', 'gradient-ring');
      // tab.classList.remove('bg-gray-200');

      currentCanvasSize = tab.dataset.size;
      updateCanvasDimension(currentCanvasSize);
    });
  });

  window.addEventListener('resize', () => {
    updateCanvasDimension(currentCanvasSize);
  });

  function setupImageUpload(inputId, imageElement) {
const input = document.getElementById(inputId);
if (!input || !imageElement) return;

input.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = event => {
    imageElement.src = event.target.result;
    imageElement.classList.remove('hidden');
    imageElement.style.transform = '';
    imageElement.style.opacity = '1';

    // Wait for the image to load to calculate its dimensions
    imageElement.onload = () => {
      const canvas = document.getElementById('canvas');
      const canvasRect = canvas.getBoundingClientRect();
      const imageWidth = imageElement.offsetWidth;
      const imageHeight = imageElement.offsetHeight;

      // Center the image
      const centerX = (canvasRect.width - imageWidth) / 2;
      const centerY = (canvasRect.height - imageHeight) / 2;

      imageElement.style.left = `${centerX}px`;
      imageElement.style.top = `${centerY}px`;
    };
  };
  reader.readAsDataURL(file);
});
}

  setupImageUpload('backgroundUpload', backgroundImage);
  setupImageUpload('foregroundUpload', foregroundImage);
  setupImageUpload('logoUpload', logoImage);


  // Simulated file structure for the image gallery
  const fileStructure = {
    "image-gallery": {
      "Black": {
        "AP": {
          "AP New Left - B .png": "image-gallery/Black/AP/AP New Left - B .png",
          "AP New Right - B .png": "image-gallery/Black/AP/AP New Right - B .png",
          "AP Sold - B.png": "image-gallery/Black/AP/AP Sold - B.png",
          "AP Used Left - B .png": "image-gallery/Black/AP/AP Used Left - B .png",
          "AP Used Right - B .png": "image-gallery/Black/AP/AP Used Right - B .png",
          "AP New Story - B .png": "image-gallery/Black/AP/AP New Story - B .png",
          "AP Sold Story - B .png": "image-gallery/Black/AP/AP Sold Story - B .png",
          "AP Used Story - B .png": "image-gallery/Black/AP/AP Used Story - B .png",
        },
        "BVLGARI": {
          "BVLGARI New Left - B .png": "image-gallery/Black/BVLGARI/BVLGARI New Left - B .png",
          "BVLGARI New Right - B .png": "image-gallery/Black/BVLGARI/BVLGARI New Right - B .png",
          "BVLGARI Sold - B .png": "image-gallery/Black/BVLGARI/BVLGARI Sold - B .png",
          "BVLGARI Used Left - B .png": "image-gallery/Black/BVLGARI/BVLGARI Used Left - B .png",
          "BVLGARI Used Right - B .png": "image-gallery/Black/BVLGARI/BVLGARI Used Right - B .png",
          "BVLGARI New Story - B .png": "image-gallery/Black/BVLGARI/BVLGARI New Story - B .png",
          "BVLGARI Sold Story - B .png": "image-gallery/Black/BVLGARI/BVLGARI Sold Story - B .png",
          "BVLGARI Used Story - B .png": "image-gallery/Black/BVLGARI/BVLGARI Used Story - B .png",
        },
        "CARTIER": {
          "CARTIER New Left - B  .png": "image-gallery/Black/CARTIER/CARTIER New Left - B  .png",
          "CARTIER New Right - B .png": "image-gallery/Black/CARTIER/CARTIER New Right - B .png",
          "CARTIER Sold - B  .png": "image-gallery/Black/CARTIER/CARTIER Sold - B  .png",
          "CARTIER Used Left - B  .png": "image-gallery/Black/CARTIER/CARTIER Used Left - B  .png",
          "CARTIER Used Right - B  .png": "image-gallery/Black/CARTIER/CARTIER Used Right - B  .png",
          "CARTIER New Story - B  .png": "image-gallery/Black/CARTIER/CARTIER New Story - B  .png",
          "CARTIER Used Story - B  .png": "image-gallery/Black/CARTIER/CARTIER Used Story - B  .png",
          "CARTIER Sold Story - B  .png": "image-gallery/Black/CARTIER/CARTIER Sold Story - B  .png",
        },
        "FRANCK MULLER": {
          "FM New Left - B .png": "image-gallery/Black/FRANCK MULLER/FM New Left - B .png",
          "FM New Right - B .png": "image-gallery/Black/FRANCK MULLER/FM New Right - B .png",
          "FM Sold - B .png": "image-gallery/Black/FRANCK MULLER/FM Sold - B .png",
          "FM Used Left - B .png": "image-gallery/Black/FRANCK MULLER/FM Used Left - B .png",
          "FM Used Right - B .png": "image-gallery/Black/FRANCK MULLER/FM Used Right - B .png",
          "FM New Story - B .png": "image-gallery/Black/FRANCK MULLER/FM New Story - B .png",
          "FM Sold Story - B .png": "image-gallery/Black/FRANCK MULLER/FM Sold Story - B .png",
          "FM Used Story - B .png": "image-gallery/Black/FRANCK MULLER/FM Used Story - B .png",
        },
        "HUBLOT": {
          "HUBLOT New Left - B .png": "image-gallery/Black/HUBLOT/HUBLOT New Left - B .png",
          "HUBLOT New Right - B .png": "image-gallery/Black/HUBLOT/HUBLOT New Right - B .png",
          "HUBLOT Sold - B .png": "image-gallery/Black/HUBLOT/HUBLOT Sold - B .png",
          "HUBLOT Used Left - B .png": "image-gallery/Black/HUBLOT/HUBLOT Used Left - B .png",
          "HUBLOT Used Right - B .png": "image-gallery/Black/HUBLOT/HUBLOT Used Right - B .png",
          "HUBLOT New Story - B .png": "image-gallery/Black/HUBLOT/HUBLOT New Story - B .png",
          "HUBLOT Sold Story - B .png": "image-gallery/Black/HUBLOT/HUBLOT Sold Story - B .png",
          "HUBLOT Used Story - B .png": "image-gallery/Black/HUBLOT/HUBLOT Used Story - B .png",
        },
        "IWC": {
          "IWC New Left - B .png": "image-gallery/Black/IWC/IWC New Left - B .png",
          "IWC New Right - B .png": "image-gallery/Black/IWC/IWC New Right - B .png",
          "IWC Sold - B .png": "image-gallery/Black/IWC/IWC Sold - B .png",
          "IWC Used Left - B .png": "image-gallery/Black/IWC/IWC Used Left - B .png",
          "IWC Used Right - B .png": "image-gallery/Black/IWC/IWC Used Right - B .png",
          "IWC New Story - B .png": "image-gallery/Black/IWC/IWC New Story - B .png",
          "IWC Sold Story - B .png": "image-gallery/Black/IWC/IWC Sold Story - B .png",
          "IWC Used Story - B .png": "image-gallery/Black/IWC/IWC Used Story - B .png",
        },
        "JAEGER LE COULTRE": {
          "JAEGER New Left - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER New Left - B .png",
          "JAEGER New Right - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER New Right - B .png",
          "JAEGER Sold - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER Sold - B .png",
          "JAEGER Used Left - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER Used Left - B .png",
          "JAEGER Used Right - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER Used Right - B .png",
          "JAEGER New Story - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER New Story - B .png",
          "JAEGER Sold Story - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER Sold Story - B .png",
          "JAEGER Used Story - B .png": "image-gallery/Black/JAEGER LE COULTRE/JAEGER Used Story - B .png",
        },
        "OMEGA": {
          "OMEGA New Left - B .png": "image-gallery/Black/OMEGA/OMEGA New Left - B .png",
          "OMEGA New Right - B .png": "image-gallery/Black/OMEGA/OMEGA New Right - B .png",
          "OMEGA Sold - B .png": "image-gallery/Black/OMEGA/OMEGA Sold - B .png",
          "OMEGA Used Left - B .png": "image-gallery/Black/OMEGA/OMEGA Used Left - B .png",
          "OMEGA Used Right - B .png": "image-gallery/Black/OMEGA/OMEGA Used Right - B .png",
          "OMEGA New Story - B .png": "image-gallery/Black/OMEGA/OMEGA New Story - B .png",
          "OMEGA Sold Story - B .png": "image-gallery/Black/OMEGA/OMEGA Sold Story - B .png",
          "OMEGA Used Story - B .png": "image-gallery/Black/OMEGA/OMEGA Used Story - B .png",
        },
        "PATEK PHILLIPE": {
          "PP New Left - B .png": "image-gallery/Black/PATEK PHILLIPE/PP New Left - B .png",
          "PP New Right - B .png": "image-gallery/Black/PATEK PHILLIPE/PP New Right - B .png",
          "PP Sold - B .png": "image-gallery/Black/PATEK PHILLIPE/PP Sold - B .png",
          "PP Used Left - B .png": "image-gallery/Black/PATEK PHILLIPE/PP Used Left - B .png",
          "PP Used Right - B.png": "image-gallery/Black/PATEK PHILLIPE/PP Used Right - B.png",
          "PP New Story - B.png": "image-gallery/Black/PATEK PHILLIPE/PP New Story - B.png",
          "PP Sold Story - B .png": "image-gallery/Black/PATEK PHILLIPE/PP Sold Story - B .png",
          "PP Used Story - B .png": "image-gallery/Black/PATEK PHILLIPE/PP Used Story - B .png",
        },
        "RICHARD MILLE": {
          "RM New Left - B .png": "image-gallery/Black/RICHARD MILLE/RM New Left - B .png",
          "RM New Right - B .png": "image-gallery/Black/RICHARD MILLE/RM New Right - B .png",
          "RM Sold - B .png": "image-gallery/Black/RICHARD MILLE/RM Sold - B .png",
          "RM Used Left - B .png": "image-gallery/Black/RICHARD MILLE/RM Used Left - B .png",
          "RM Used Right - B .png": "image-gallery/Black/RICHARD MILLE/RM Used Right - B .png",
          "RM New Story - B .png": "image-gallery/Black/RICHARD MILLE/RM New Story - B .png",
          "RM Sold Story - B .png": "image-gallery/Black/RICHARD MILLE/RM Sold Story - B .png",
          "RM Used Story - B .png": "image-gallery/Black/RICHARD MILLE/RM Used Story - B .png",
        },
        "ROLEX": {
          "ROLEX New Left - B .png": "image-gallery/Black/ROLEX/ROLEX New Left - B .png",
          "ROLEX New Right - B .png": "image-gallery/Black/ROLEX/ROLEX New Right - B .png",
          "ROLEX Sold - B.png": "image-gallery/Black/ROLEX/ROLEX Sold - B.png",
          "ROLEX Used Left - B.png": "image-gallery/Black/ROLEX/ROLEX Used Left - B.png",
          "ROLEX Used Right - B .png": "image-gallery/Black/ROLEX/ROLEX Used Right - B .png",
          "ROLEX New Story - B .png": "image-gallery/Black/ROLEX/ROLEX New Story - B .png",
          "ROLEX Sold Story - B .png": "image-gallery/Black/ROLEX/ROLEX Sold Story - B .png",
          "ROLEX Used Story - B.png": "image-gallery/Black/ROLEX/ROLEX Used Story - B.png",
        },
        "TAG HEUER": {
          "TAG HEUER New Left - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER New Left - B  .png",
          "TAG HEUER New Right - B .png": "image-gallery/Black/TAG HEUER/TAG HEUER New Right - B .png",
          "TAG HEUER Sold - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER Sold - B  .png",
          "TAG HEUER Used Left - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER Used Left - B  .png",
          "TAG HEUER Used Right - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER Used Right - B  .png",
          "TAG HEUER New Story - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER New Story - B  .png",
          "TAG HEUER Sold Story - B.png": "image-gallery/Black/TAG HEUER/TAG HEUER Sold Story - B.png",
          "TAG HEUER Used Story - B  .png": "image-gallery/Black/TAG HEUER/TAG HEUER Used Story - B  .png",
        },
        "TUDOR": {
          "TUDOR New Left - B .png": "image-gallery/Black/TUDOR/TUDOR New Left - B .png",
          "TUDOR New Right - B .png": "image-gallery/Black/TUDOR/TUDOR New Right - B .png",
          "TUDOR Sold - B .png": "image-gallery/Black/TUDOR/TUDOR Sold - B .png",
          "TUDOR Used Left - B .png": "image-gallery/Black/TUDOR/TUDOR Used Left - B .png",
          "TUDOR Used Right - B .png": "image-gallery/Black/TUDOR/TUDOR Used Right - B .png",
          "TUDOR New Story - B .png": "image-gallery/Black/TUDOR/TUDOR New Story - B .png",
          "TUDOR Sold Story - B .png": "image-gallery/Black/TUDOR/TUDOR Sold Story - B .png",
          "TUDOR Used Story - B .png": "image-gallery/Black/TUDOR/TUDOR Used Story - B .png",
        },
        "VACHERON CONSTANTIN": {
          "VACHERON New Left - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON New Left - B .png",
          "VACHERON New Right - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON New Right - B .png",
          "VACHERON Sold - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON Sold - B .png",
          "VACHERON Used Left - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON Used Left - B .png",
          "VACHERON Used Right - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON Used Right - B .png",
          "VACHERON New Story - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON New Story - B .png",
          "VACHERON Used Story - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON Used Story - B .png",
          "VACHERON Sold Story - B .png": "image-gallery/Black/VACHERON CONSTANTIN/VACHERON Sold Story - B .png",
        },
      },
      "White": {
        "AP": {
          "AP New Left .png": "image-gallery/White/AP/AP New Left .png",
          "AP New Right.png": "image-gallery/White/AP/AP New Right.png",
          "AP Sold .png": "image-gallery/White/AP/AP Sold .png",
          "AP Used Left .png": "image-gallery/White/AP/AP Used Left .png",
          "AP Used Right .png": "image-gallery/White/AP/AP Used Right .png",
          "AP New Story.png": "image-gallery/White/AP/AP New Story.png",
          "AP Sold Story .png": "image-gallery/White/AP/AP Sold Story .png",
          "AP Used Story.png": "image-gallery/White/AP/AP Used Story.png",
        },
        "BVLGARI": {
          "BVLGARI New Left .png": "image-gallery/White/BVLGARI/BVLGARI New Left .png",
          "BVLGARI New Right .png": "image-gallery/White/BVLGARI/BVLGARI New Right .png",
          "BVLGARI Sold .png": "image-gallery/White/BVLGARI/BVLGARI Sold .png",
          "BVLGARI Used Left .png": "image-gallery/White/BVLGARI/BVLGARI Used Left .png",
          "BVLGARI Used Right .png": "image-gallery/White/BVLGARI/BVLGARI Used Right .png",
          "BVLGARI New Story .png": "image-gallery/White/BVLGARI/BVLGARI New Story .png",
          "BVLGARI Sold Story .png": "image-gallery/White/BVLGARI/BVLGARI Sold Story .png",
          "BVLGARI Used Story .png": "image-gallery/White/BVLGARI/BVLGARI Used Story .png",
        },
        "CARTIER": {
          "CARTIER New Left .png": "image-gallery/White/CARTIER/CARTIER New Left .png",
          "CARTIER New Right .png": "image-gallery/White/CARTIER/CARTIER New Right .png",
          "CARTIER Sold .png": "image-gallery/White/CARTIER/CARTIER Sold .png",
          "CARTIER Used Left .png": "image-gallery/White/CARTIER/CARTIER Used Left .png",
          "CARTIER Used Right .png": "image-gallery/White/CARTIER/CARTIER Used Right .png",
          "CARTIER New Story .png": "image-gallery/White/CARTIER/CARTIER New Story .png",
          "CARTIER Used Story .png": "image-gallery/White/CARTIER/CARTIER Used Story .png",
          "CARTIER Sold Story .png": "image-gallery/White/CARTIER/CARTIER Sold Story .png",
        },
        "FRANCK MULLER": {
          "FM New Left .png": "image-gallery/White/FRANCK MULLER/FM New Left .png",
          "FM New Right .png": "image-gallery/White/FRANCK MULLER/FM New Right .png",
          "FM Sold .png": "image-gallery/White/FRANCK MULLER/FM Sold .png",
          "FM Used Left .png": "image-gallery/White/FRANCK MULLER/FM Used Left .png",
          "FM Used Right .png": "image-gallery/White/FRANCK MULLER/FM Used Right .png",
          "FM New Story .png": "image-gallery/White/FRANCK MULLER/FM New Story .png",
          "FM Sold Story .png": "image-gallery/White/FRANCK MULLER/FM Sold Story .png",
          "FM Used Story .png": "image-gallery/White/FRANCK MULLER/FM Used Story .png",
        },
        "HUBLOT": {
          "HUBLOT New Left .png": "image-gallery/White/HUBLOT/HUBLOT New Left .png",
          "HUBLOT New Right .png": "image-gallery/White/HUBLOT/HUBLOT New Right .png",
          "HUBLOT Sold .png": "image-gallery/White/HUBLOT/HUBLOT Sold .png",
          "HUBLOT Used Left .png": "image-gallery/White/HUBLOT/HUBLOT Used Left .png",
          "HUBLOT Used Right .png": "image-gallery/White/HUBLOT/HUBLOT Used Right .png",
          "HUBLOT New Story .png": "image-gallery/White/HUBLOT/HUBLOT New Story .png",
          "HUBLOT Sold Story .png": "image-gallery/White/HUBLOT/HUBLOT Sold Story .png",
          "HUBLOT Used Story .png": "image-gallery/White/HUBLOT/HUBLOT Used Story .png",
        },
        "IWC": {
          "IWC New Left .png": "image-gallery/White/IWC/IWC New Left .png",
          "IWC New Right - B .png": "image-gallery/White/IWC/IWC New Right .png",
          "IWC Sold .png": "image-gallery/White/IWC/IWC Sold .png",
          "IWC Used Left .png": "image-gallery/White/IWC/IWC Used Left .png",
          "IWC Used Right .png": "image-gallery/White/IWC/IWC Used Right .png",
          "IWC New Story .png": "image-gallery/White/IWC/IWC New Story .png",
          "IWC Sold Story .png": "image-gallery/White/IWC/IWC Sold Story .png",
          "IWC Used Story .png": "image-gallery/White/IWC/IWC Used Story .png",
        },
        "JAEGER LE COULTRE": {
          "JAEGER New Left .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER New Left .png",
          "JAEGER New Right .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER New Right .png",
          "JAEGER Sold .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER Sold .png",
          "JAEGER Used Left .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER Used Left .png",
          "JAEGER Used Right .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER Used Right .png",
          "JAEGER New Story .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER New Story .png",
          "JAEGER Sold Story .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER Sold Story .png",
          "JAEGER Used Story .png": "image-gallery/White/JAEGER LE COULTRE/JAEGER Used Story .png",
        },
        "OMEGA": {
          "OMEGA New Left .png": "image-gallery/White/OMEGA/OMEGA New Left .png",
          "OMEGA New Right .png": "image-gallery/White/OMEGA/OMEGA New Right .png",
          "OMEGA Sold .png": "image-gallery/White/OMEGA/OMEGA Sold .png",
          "OMEGA Used Left .png": "image-gallery/White/OMEGA/OMEGA Used Left .png",
          "OMEGA Used Right .png": "image-gallery/White/OMEGA/OMEGA Used Right .png",
          "OMEGA New Story .png": "image-gallery/White/OMEGA/OMEGA New Story .png",
          "OMEGA Sold Story .png": "image-gallery/White/OMEGA/OMEGA Sold Story .png",
          "OMEGA Used Story .png": "image-gallery/White/OMEGA/OMEGA Used Story .png",
        },
        "PATEK PHILLIPE": {
          "PP New Left .png": "image-gallery/White/PATEK PHILLIPE/PP New Left .png",
          "PP New Right .png": "image-gallery/White/PATEK PHILLIPE/PP New Right .png",
          "PP Sold .png": "image-gallery/White/PATEK PHILLIPE/PP Sold .png",
          "PP Used Left .png": "image-gallery/White/PATEK PHILLIPE/PP Used Left .png",
          "PP Used Right .png": "image-gallery/White/PATEK PHILLIPE/PP Used Right .png",
          "PP New Story .png": "image-gallery/White/PATEK PHILLIPE/PP New Story .png",
          "PP Sold Story .png": "image-gallery/White/PATEK PHILLIPE/PP Sold Story .png",
          "PP Used Story .png": "image-gallery/White/PATEK PHILLIPE/PP Used Story .png",
        },
        "RICHARD MILLE": {
          "RM New Left .png": "image-gallery/White/RICHARD MILLE/RM New Left .png",
          "RM New Right .png": "image-gallery/White/RICHARD MILLE/RM New Right .png",
          "RM Sold .png": "image-gallery/White/RICHARD MILLE/RM Sold .png",
          "RM Used Left .png": "image-gallery/White/RICHARD MILLE/RM Used Left .png",
          "RM Used Right .png": "image-gallery/White/RICHARD MILLE/RM Used Right .png",
          "RM New Story .png": "image-gallery/White/RICHARD MILLE/RM New Story .png",
          "RM Sold Story .png": "image-gallery/White/RICHARD MILLE/RM Sold Story .png",
          "RM Used Story .png": "image-gallery/White/RICHARD MILLE/RM Used Story .png",
        },
        "ROLEX": {
          "ROLEX New Left.png": "image-gallery/White/ROLEX/ROLEX New Left.png",
          "ROLEX New Right.png": "image-gallery/White/ROLEX/ROLEX New Right.png",
          "ROLEX Sold.png": "image-gallery/White/ROLEX/ROLEX Sold.png",
          "ROLEX Used Left.png": "image-gallery/White/ROLEX/ROLEX Used Left.png",
          "ROLEX Used Right.png": "image-gallery/White/ROLEX/ROLEX Used Right.png",
          "ROLEX New Story.png": "image-gallery/White/ROLEX/ROLEX New Story.png",
          "ROLEX Sold Story.png": "image-gallery/White/ROLEX/ROLEX Sold Story .png",
          "ROLEX Used Story.png": "image-gallery/White/ROLEX/ROLEX Used Story.png",
        },
        "TAG HEUER": {
          "TAG HEUER New Left .png": "image-gallery/White/TAG HEUER/TAG HEUER New Left .png",
          "TAG HEUER New Right .png": "image-gallery/White/TAG HEUER/TAG HEUER New Right .png",
          "TAG HEUER Sold .png": "image-gallery/White/TAG HEUER/TAG HEUER Sold .png",
          "TAG HEUER Used Left .png": "image-gallery/White/TAG HEUER/TAG HEUER Used Left .png",
          "TAG HEUER Used Right - B .png": "image-gallery/White/TAG HEUER/TAG HEUER Used Right .png",
          "TAG HEUER New Story .png": "image-gallery/White/TAG HEUER/TAG HEUER New Story .png",
          "TAG HEUER Sold Story .png": "image-gallery/White/TAG HEUER/TAG HEUER Sold Story .png",
          "TAG HEUER Used Story .png": "image-gallery/White/TAG HEUER/TAG HEUER Used Story .png",
        },
        "TUDOR": {
          "TUDOR New Left .png": "image-gallery/White/TUDOR/TUDOR New Left .png",
          "TUDOR New Right .png": "image-gallery/White/TUDOR/TUDOR New Right .png",
          "TUDOR Sold .png": "image-gallery/White/TUDOR/TUDOR Sold .png",
          "TUDOR Used Left - B .png": "image-gallery/White/TUDOR/TUDOR Used Left .png",
          "TUDOR Used Right .png": "image-gallery/White/TUDOR/TUDOR Used Right .png",
          "TUDOR New Story .png": "image-gallery/White/TUDOR/TUDOR New Story .png",
          "TUDOR Sold Story .png": "image-gallery/White/TUDOR/TUDOR Sold Story .png",
          "TUDOR Used Story .png": "image-gallery/White/TUDOR/TUDOR Used Story .png",
        },
        "VACHERON CONSTANTIN": {
          "VACHERON New Left .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON New Left .png",
          "VACHERON New Right .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON New Right .png",
          "VACHERON Sold .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON Sold .png",
          "VACHERON Used Left .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON Used Left .png",
          "VACHERON Used Right .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON Used Right .png",
          "VACHERON New Story .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON New Story .png",
          "VACHERON Used Story .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON Used Story .png",
          "VACHERON Sold Story .png": "image-gallery/White/VACHERON CONSTANTIN/VACHERON Sold Story .png",
        },
      },
    },
  };

// Show the "Add Image from Gallery" button if the URL contains "/#brandname"
document.addEventListener('DOMContentLoaded', () => {
  const addImageButton = document.getElementById('addImageFromGalleryBtn');
  if (window.location.hash === '#joon') {
    addImageButton.classList.remove('hidden'); // Show the button
  } else {
    addImageButton.classList.add('hidden'); // Hide the button
  }
});

// Current folder path
let currentFolderPath = "image-gallery";

// Open the Image Gallery Modal
function openImageGalleryModal() {
  const modal = document.getElementById("imageGalleryModal");
  modal.classList.remove("hidden");
  navigateToFolder("image-gallery"); // Load the root folder
}

// Close the Image Gallery Modal
function closeImageGalleryModal() {
  const modal = document.getElementById("imageGalleryModal");
  modal.classList.add("hidden");
}

// Navigate to a specific folder
function navigateToFolder(folderPath) {
  currentFolderPath = folderPath;
  const breadcrumb = document.getElementById("breadcrumbGallery");
  const folderImageContainer = document.getElementById("folderImageContainer");

  // Clear existing content
  folderImageContainer.innerHTML = "";

  // Update breadcrumb
  const pathParts = folderPath.split("/");
  breadcrumb.innerHTML = pathParts
    .map((part, index) => {
      const path = pathParts.slice(0, index + 1).join("/");
      return `<span class="cursor-pointer hover:text-gray-200" onclick="navigateToFolder('${path}')">${part || "Home"}</span>`;
    })
    .join(" / ");

  // Get the current folder contents
  const folderContents = getFolderContents(folderPath);

  // Display folders
  Object.keys(folderContents).forEach((key) => {
    if (typeof folderContents[key] === "object") {
      // It's a folder
      const folderDiv = document.createElement("div");
      folderDiv.className =
        "cursor-pointer rounded border border-[#333740] hover:border-indigo-500 p-4 text-center";
      folderDiv.innerHTML = `<i class="fa-solid fa-folder text-yellow-500 mb-2"></i><br>${key}`;
      folderDiv.onclick = () => navigateToFolder(`${folderPath}/${key}`);
      folderImageContainer.appendChild(folderDiv);
    }
  });

  // Display images
  Object.keys(folderContents).forEach((key) => {
    if (typeof folderContents[key] === "string") {
      // It's an image
      const img = document.createElement("img");
      img.src = folderContents[key];
      img.alt = key;
      img.className =
        "cursor-pointer rounded border border-[#333740] hover:border-indigo-500";
      img.onclick = () => addImageToForegroundLayer(folderContents[key]);
      folderImageContainer.appendChild(img);
    }
  });
}

// Get the contents of a folder
function getFolderContents(folderPath) {
  const parts = folderPath.split("/");
  let current = fileStructure;
  for (const part of parts) {
    if (part && current[part]) {
      current = current[part];
    }
  }
  return current;
}

// Add the Selected Image to the Foreground Layer
function addImageToForegroundLayer(imagePath) {
  const foregroundImage = document.getElementById("foregroundImage");
  foregroundImage.src = imagePath;
  foregroundImage.classList.remove("hidden");
  foregroundImage.style.transform = ""; // Reset transformations
  foregroundImage.style.opacity = "1"; // Reset opacity

  // Center the image on the canvas
  foregroundImage.onload = () => {
    const canvas = document.getElementById("canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const imageWidth = foregroundImage.offsetWidth;
    const imageHeight = foregroundImage.offsetHeight;

    const centerX = (canvasRect.width - imageWidth) / 2;
    const centerY = (canvasRect.height - imageHeight) / 2;

    foregroundImage.style.left = `${centerX}px`;
    foregroundImage.style.top = `${centerY}px`;
  };

  closeImageGalleryModal(); // Close the modal after selecting an image
}


  // Layer controls helper
  function setupLayerControls(layerPrefix, fileInputPrefix, imageElement) {
const scale = document.getElementById(layerPrefix + 'Scale');
const rotation = document.getElementById(layerPrefix + 'Rotation');
const opacity = document.getElementById(layerPrefix + 'Opacity');
const xPos = document.getElementById(layerPrefix + 'X');
const yPos = document.getElementById(layerPrefix + 'Y');
const clearBtn = document.getElementById(layerPrefix + 'Clear');
const fileInput = document.getElementById(fileInputPrefix + 'Upload'); // Use the new file input prefix

if (!fileInput) {
  console.error(`File input with ID "${fileInputPrefix}Upload" not found.`);
  return;
}

// Function to dynamically adjust slider ranges based on scale
function updateSliderRange(sc) {
  const baseRange = 550; // Base range for sliders
  const adjustedRange = baseRange * Math.pow(sc, 0.2); // Inverse scaling for more movement when scaled down

  if (xPos) {
    xPos.min = -adjustedRange;
    xPos.max = adjustedRange;
  }
  if (yPos) {
    yPos.min = -adjustedRange;
    yPos.max = adjustedRange;
  }
}

// Function to update the image's transform properties
function updateTransform() {
  const tx = xPos ? parseFloat(xPos.value) : 0;
  const ty = yPos ? parseFloat(yPos.value) : 0;
  const rot = rotation ? parseFloat(rotation.value) : 0;
  const sc = scale ? parseFloat(scale.value) : 1;

  // Ensure scaling happens relative to the center of the image
  imageElement.style.transformOrigin = 'center';

  // Apply transformations
  imageElement.style.transform = `translate(${tx * 1.2}px, ${ty * 1.2}px) rotate(${rot}deg) scale(${sc})`;
  imageElement.style.opacity = opacity ? opacity.value : 1;

  // Dynamically update slider ranges based on scale
  updateSliderRange(sc);
}

// Event listeners for controls
if (scale) {
  scale.addEventListener('input', () => {
    updateTransform();
    updateSliderRange(scale.value); // Update slider range when scale changes
  });
}
if (rotation) rotation.addEventListener('input', updateTransform);
if (opacity) opacity.addEventListener('input', updateTransform);
if (xPos) xPos.addEventListener('input', updateTransform);
if (yPos) yPos.addEventListener('input', updateTransform);

// Clear button functionality
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    // Clear the image element
    imageElement.src = '';
    imageElement.classList.add('hidden');
    imageElement.style = '';
    if (scale) scale.value = 1;
    if (rotation) rotation.value = 0;
    if (opacity) opacity.value = 1;
    if (xPos) xPos.value = 0;
    if (yPos) yPos.value = 0;

    // Reset slider range
    updateSliderRange(1);

    // Clear the file input value
    fileInput.value = ''; // Explicitly clear the value
  });
}
}

  // Apply the function to all layers
  setupLayerControls('bg', 'background', backgroundImage); // For background
  setupLayerControls('fg', 'foreground', foregroundImage); // For foreground
  setupLayerControls('logo', 'logo', logoImage);           // For logo

  // Text controls
  // Register custom font size whitelist
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['10px', '12px', '14px', '18px', '24px', '32px', '48px'];
Quill.register(SizeStyle, true);

let currentTextBlock = null;

// Initialize Quill editor
const quill = new Quill('#textEditor', {
modules: {
  toolbar: [
    [{ 'header': [1, 2, false] }], // Headers first
    [{ 'size': SizeStyle.whitelist }], // Then size dropdown
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }]
  ]
},
theme: 'snow'
});

// Add a new text block
function addTextBlock() {
const textBlock = document.createElement('div');
textBlock.className = 'text-block';
textBlock.style.top = '20px';
textBlock.style.left = '20px';
textBlock.style.width = '200px';
textBlock.style.height = '50px';
textBlock.style.backgroundColor = '#ffffff';
textBlock.innerHTML = '<div class="ql-editor">Click to edit</div>';

textBlock.addEventListener('click', (e) => {
  e.stopPropagation();
  selectTextBlock(textBlock);
});

textBlocks.appendChild(textBlock);
makeDraggable(textBlock);
}

// Remove the selected text block
document.getElementById('removeTextBlockBtn').addEventListener('click', () => {
if (currentTextBlock) {
  currentTextBlock.remove(); // Remove the selected text block from the DOM
  currentTextBlock = null; // Clear the reference to the current text block

  // Hide the text editor and controls
  document.getElementById('textEditor').classList.add('hidden');
  textBlockSizeControls.classList.add('hidden');
} else {
  alert('No text block selected to remove.');
}
});

// Select a text block
function selectTextBlock(textBlock) {
// Deselect all other text blocks
document.querySelectorAll('.text-block').forEach(el => el.classList.remove('selected'));
textBlock.classList.add('selected');
currentTextBlock = textBlock;

// Show the text editor and sync its content
document.getElementById('textEditor').classList.remove('hidden');
quill.root.innerHTML = textBlock.querySelector('.ql-editor').innerHTML;

// Sync sliders with the current text block dimensions
textBlockSizeControls.classList.remove('hidden');
textBlockWidthSlider.value = parseInt(textBlock.style.width) || 200;
textBlockHeightSlider.value = parseInt(textBlock.style.height) || 50;
textBlockWidthValue.textContent = textBlockWidthSlider.value + 'px';
textBlockHeightValue.textContent = textBlockHeightSlider.value + 'px';

// Sync background color
const currentBg = textBlock.style.backgroundColor || '#ffffff';
textBlockBgColor.value = rgbToHex(currentBg) || '#ffffff';

// Show the "Remove Selected Text Block" button
document.getElementById('removeTextBlockBtn').classList.remove('hidden');
}

// Make text blocks draggable
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0;
  let isDragging = false; // Track if the user is dragging

  // Mouse events
  element.onmousedown = dragMouseDown;

  // Touch events
  element.ontouchstart = dragTouchStart;

  function dragMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    offsetX = element.offsetLeft;
    offsetY = element.offsetTop;
    isDragging = false;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function dragTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    offsetX = element.offsetLeft;
    offsetY = element.offsetTop;
    isDragging = false;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDragTouch;
  }

  function elementDrag(e) {
    e.preventDefault();
    isDragging = true; // Mark as dragging
    const canvas = document.getElementById('canvas');
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    let newLeft = offsetX + e.clientX - startX;
    let newTop = offsetY + e.clientY - startY;
    newLeft = Math.max(0, Math.min(newLeft, canvasRect.width - elemRect.width));
    newTop = Math.max(0, Math.min(newTop, canvasRect.height - elemRect.height));
    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;
  }

  function elementDragTouch(e) {
    e.preventDefault();
    isDragging = true; // Mark as dragging
    const touch = e.touches[0];
    const canvas = document.getElementById('canvas');
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    let newLeft = offsetX + touch.clientX - startX;
    let newTop = offsetY + touch.clientY - startY;
    newLeft = Math.max(0, Math.min(newLeft, canvasRect.width - elemRect.width));
    newTop = Math.max(0, Math.min(newTop, canvasRect.height - elemRect.height));
    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;
  }

  function closeDragElement(e) {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;

    // If not dragging, treat it as a tap to select the text block
    if (!isDragging) {
      selectTextBlock(element);
    }
  }
}

// Update text block size
textBlockWidthSlider.addEventListener('input', function() {
if (currentTextBlock) {
  currentTextBlock.style.width = this.value + 'px';
  textBlockWidthValue.textContent = this.value + 'px';
}
});

textBlockHeightSlider.addEventListener('input', function() {
if (currentTextBlock) {
  currentTextBlock.style.height = this.value + 'px';
  textBlockHeightValue.textContent = this.value + 'px';
}
});

// Update text block background color
textBlockBgColor.addEventListener('input', function(e) {
e.stopPropagation();
if (currentTextBlock) {
  currentTextBlock.style.backgroundColor = this.value;
}
});

// Set transparent background
transparentBgBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (currentTextBlock) {
  currentTextBlock.style.backgroundColor = 'transparent';
  textBlockBgColor.value = '#ffffff';
}
});

// Sync Quill content with the selected text block
quill.on('text-change', () => {
if (currentTextBlock) {
  const textContainer = currentTextBlock.querySelector('.ql-editor');
  requestAnimationFrame(() => {
    const selection = quill.getSelection();
    textContainer.innerHTML = quill.root.innerHTML;
    textContainer.querySelectorAll('h1').forEach(h1 => {
      if (!h1.style.fontSize) h1.style.fontSize = '2em';
      h1.style.fontWeight = 'bold';
    });
    if (selection) quill.setSelection(selection.index, selection.length);
  });
}
});

// Handle editor changes
quill.on('editor-change', () => {
if (currentTextBlock) {
  const textContainer = currentTextBlock.querySelector('.ql-editor');
  textContainer.innerHTML = quill.root.innerHTML;
  Array.from(textContainer.querySelectorAll('*')).forEach(el => {
    if (el.style.fontSize) el.style.fontSize = el.style.fontSize;
    if (el.tagName.match(/^h[1-2]$/i)) {
      el.style.fontWeight = 'bold';
      if (!el.style.fontSize) el.style.fontSize = '2em';
    }
  });
}
});

// Handle canvas clicks to deselect text blocks
document.getElementById('canvas').addEventListener('click', () => {
document.querySelectorAll('.text-block').forEach(el => {
  el.classList.remove('selected');
});
currentTextBlock = null;

// Hide the text editor, controls, and "Remove Selected Text Block" button
document.getElementById('textEditor').classList.add('hidden');
textBlockSizeControls.classList.add('hidden');
document.getElementById('removeTextBlockBtn').classList.add('hidden');
});


// Handle clicks outside text blocks and editor
document.addEventListener('click', function(e) {
const textEditor = document.getElementById('textEditor');
const isTextBlock = e.target.closest('.text-block');
const isEditor = e.target.closest('#textEditor');
const isToolbar = e.target.closest('.ql-toolbar');
const isSlider = e.target.closest('#textBlockSizeControls');

if (!isTextBlock && !isEditor && !isToolbar && !isSlider) {
  document.querySelectorAll('.text-block').forEach(el => {
    el.classList.remove('selected');
  });
  currentTextBlock = null;

  // Hide the text editor, controls, and "Remove Selected Text Block" button
  textEditor.classList.add('hidden');
  textBlockSizeControls.classList.add('hidden');
  document.getElementById('removeTextBlockBtn').classList.add('hidden');
}
});

// Convert RGB to Hex
function rgbToHex(rgb) {
if (!rgb) return '#ffffff';
const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.*\d*)?\)$/);
if (!match) return rgb.startsWith('#') ? rgb : '#ffffff';
const r = parseInt(match[1]).toString(16).padStart(2, '0');
const g = parseInt(match[2]).toString(16).padStart(2, '0');
const b = parseInt(match[3]).toString(16).padStart(2, '0');
return `#${r}${g}${b}`;
}

  // Canvas background color picker
const canvasBgColorPicker = document.getElementById('canvasBgColor');
const transparentCanvasBgBtn = document.getElementById('transparentCanvasBgBtn');

// Update canvas background color
canvasBgColorPicker.addEventListener('input', e => {
canvasContainer.style.backgroundColor = e.target.value;
});

// Set transparent background
transparentCanvasBgBtn.addEventListener('click', () => {
canvasContainer.style.backgroundColor = 'transparent';
canvasBgColorPicker.value = '#ffffff00'; // Update the color picker to reflect transparency
});

  // Download/export function using html2canvas
  function download(format) {
    if (typeof html2canvas === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.onload = () => exportCanvas(format);
      document.body.appendChild(script);
    } else {
      exportCanvas(format);
    }
  }

  function exportCanvas(format) {
const canvasRect = canvasContainer.getBoundingClientRect(); // Get exact dimensions
const canvasWidth = Math.round(canvasRect.width); // Round to nearest integer
const canvasHeight = Math.round(canvasRect.height); // Round to nearest integer

console.log('Exporting Canvas Dimensions:', canvasWidth, canvasHeight);

// Temporarily remove the box shadow
const originalBoxShadow = canvasContainer.style.boxShadow;
canvasContainer.style.boxShadow = 'none';

// Adjust padding of text blocks for export
const textBlocks = document.querySelectorAll('.text-block');
const originalPaddings = [];
textBlocks.forEach((textBlock, index) => {
  const editor = textBlock.querySelector('.ql-editor');
  if (editor) {
    // Store the original padding
    originalPaddings[index] = editor.style.padding;

    // Adjust the padding for better alignment
    editor.style.padding = '3px 0'; // Adjust this value as needed
  }
});

html2canvas(canvasContainer, {
  scale: 4, // Increase scale for higher resolution
  useCORS: true, // Allow cross-origin images
  allowTaint: true, // Allow tainted images
  scrollX: 0, // Prevent horizontal scrolling offsets
  scrollY: 0, // Prevent vertical scrolling offsets
  width: canvasWidth - 0.55, // Use exact width
  height: canvasHeight - 0.5, // Use exact height
  backgroundColor: null // Preserve transparency
}).then(canvasExport => {

  // Restore the original box shadow
  canvasContainer.style.boxShadow = originalBoxShadow;

  // Restore the original paddings
  textBlocks.forEach((textBlock, index) => {
    const editor = textBlock.querySelector('.ql-editor');
    if (editor) {
      editor.style.padding = originalPaddings[index];
    }
  });

  const link = document.createElement('a');
  link.download = `design.${format}`;
  link.href = format === 'jpg' 
    ? canvasExport.toDataURL('image/jpeg', 1.0) // JPEG does not support transparency
    : canvasExport.toDataURL('image/png'); // PNG supports transparency
  link.click();
});
}


function showRenderedImageModal(format) {
  // Check if html2canvas is loaded
  if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => renderAndShowModal(format); // Call the rendering function after loading
    document.body.appendChild(script);
  } else {
    renderAndShowModal(format); // Call the rendering function directly if html2canvas is already loaded
  }
}

// Function to render the canvas and show the modal
function renderAndShowModal(format) {
  const canvasRect = canvasContainer.getBoundingClientRect();
  const canvasWidth = Math.round(canvasRect.width);
  const canvasHeight = Math.round(canvasRect.height);

  // Temporarily remove the box shadow
  const originalBoxShadow = canvasContainer.style.boxShadow;
  canvasContainer.style.boxShadow = 'none';

  // Render the canvas using html2canvas
  html2canvas(canvasContainer, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    width: canvasWidth - 0.1,
    height: canvasHeight - 0.1,
    backgroundColor: null,
  }).then((canvasExport) => {
    // Restore the original box shadow
    canvasContainer.style.boxShadow = originalBoxShadow;

    // Get the image data URL
    const imageDataUrl =
      format === 'jpg'
        ? canvasExport.toDataURL('image/jpeg', 1.0)
        : canvasExport.toDataURL('image/png');

    // Set the image preview in the modal
    const renderedImagePreview = document.getElementById('renderedImagePreview');
    renderedImagePreview.src = imageDataUrl;

    // Set the download button link
    const downloadButton = document.getElementById('downloadRenderedImageBtn');
    downloadButton.onclick = () => {
      const link = document.createElement('a');
      link.download = `design.${format}`;
      link.href = imageDataUrl;
      link.click();
    };

    // Show the modal
    const modal = document.getElementById('renderedImageModal');
    modal.classList.remove('hidden');
  });
}

// Close the rendered image modal
function closeRenderedImageModal() {
  const modal = document.getElementById('renderedImageModal');
  modal.classList.add('hidden');
}


// Anti-debugging protection
setInterval(() => {  
  if (typeof console._commandLineAPI !== 'undefined') {  
    document.body.innerHTML = '<h1>Debugging blocked</h1>';  
  }  
}, 1000);
