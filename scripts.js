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
element.onmousedown = dragMouseDown;

function dragMouseDown(e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  offsetX = element.offsetLeft;
  offsetY = element.offsetTop;
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  e.preventDefault();
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

function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;
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

html2canvas(canvasContainer, {
  scale: 3, // Increase scale for higher resolution
  useCORS: true, // Allow cross-origin images
  allowTaint: true, // Allow tainted images
  scrollX: 0, // Prevent horizontal scrolling offsets
  scrollY: 0, // Prevent vertical scrolling offsets
  width: canvasWidth - 0.1, // Use exact width
  height: canvasHeight - 0.1, // Use exact height
  backgroundColor: null // Preserve transparency
}).then(canvasExport => {

  // Restore the original box shadow
  canvasContainer.style.boxShadow = originalBoxShadow;

  const link = document.createElement('a');
  link.download = `design.${format}`;
  link.href = format === 'jpg' 
    ? canvasExport.toDataURL('image/jpeg', 1.0) // JPEG does not support transparency
    : canvasExport.toDataURL('image/png'); // PNG supports transparency
  link.click();
});
}