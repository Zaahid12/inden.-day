const sliderTrack = document.getElementById('sliderTrack');
const cards = sliderTrack.children;
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');

let currentIndex = 0;
let autoSlide = true;
let slideInterval;

function showSlide(idx) {
  sliderTrack.style.transform = `translateX(-${idx * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % cards.length;
  showSlide(currentIndex);
}
function prevSlide() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000);
  autoSlide = true;
  pauseBtn.style.display = '';
  resumeBtn.style.display = 'none';
}
function stopAutoSlide() {
  clearInterval(slideInterval);
  autoSlide = false;
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = '';
}

pauseBtn.onclick = stopAutoSlide;
resumeBtn.onclick = startAutoSlide;
nextBtn.onclick = () => { nextSlide(); if(autoSlide) stopAutoSlide(); };
prevBtn.onclick = () => { prevSlide(); if(autoSlide) stopAutoSlide(); };

// Touch support
let startX = 0;
sliderTrack.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
sliderTrack.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prevSlide();
  else if (startX - endX > 50) nextSlide();
  if(autoSlide) stopAutoSlide();
});

showSlide(currentIndex);
startAutoSlide();