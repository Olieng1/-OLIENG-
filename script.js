let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.index');
const textContainer = document.querySelector('#text-container');

// Function to show next slide
function showNextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0; // Infinite scroll
  }
  updateSlides();
}

// Function to show previous slide
function showPreviousSlide() {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1; // Infinite scroll
  }
  updateSlides();
}

let slideAnimation = null; // เก็บการอ้างอิง Animation
function updateSlides() {
  const sliderWidth = document.querySelector('.slide').offsetWidth;

  // ยกเลิก Animation เดิมก่อนเริ่มใหม่
  if (slideAnimation) {
    slideAnimation.kill();
  }

  slideAnimation = gsap.timeline({
    onComplete: () => {
      // หลังจากแอนิเมชันเสร็จสิ้น ให้ทำการอัปเดตเนื้อหาหรือเปลี่ยนแปลงอื่น ๆ
      console.log('Animation complete, waiting before updating content...');
      gsap.delayedCall(1, updateContent);  // หน่วงเวลา 1 วินาที ก่อนการเรียก updateContent
    }
  });

  slideAnimation = gsap.to('.slide', {
    x: -currentSlideIndex * sliderWidth,
    duration: 2,
    ease: 'power2.inOut',
  });

  // Update Indicators
  indicators.forEach((indicator, index) => {
    if (index === currentSlideIndex) {
      gsap.to(indicator, {
        scale: 1.0,
        duration: 0.3,
      });
    } else {
      gsap.to(indicator, {
        scale: 0.5,
        duration: 0.3,
      });
    }
  });

  // Update Product Number
  const productNumberElement = document.querySelector('.product-number');
  productNumberElement.innerHTML = ` 0${currentSlideIndex + 1}`;
  updateContent();
}

function updateContent() {
    const productNumberElement = document.querySelector('.product-number');
    const productNumber = productNumberElement.innerHTML.trim(); // จัดการช่องว่างที่นี่
    let newText = '';
  
    switch (productNumber) {
      case '01':
        newText = "DUNKLOW";
        break;
      case '02':
        newText = 'DUNKLOW';
        break;
      case '03':
        newText = 'AIRFORCE';
        break;
      case '04':
        newText = 'AIRMAX';
        break;
    }
  
    updateText(newText);
  }

function updateText(newText) {
    const productName = textContainer.querySelector('.product-name');
    if (!productName) return; // ถ้าไม่มี element ให้ return
  
    if (textContainer.dataset.animating === 'true') return;
  
    textContainer.dataset.animating = 'true';
  
    let newTextEl = document.createElement('div');
    newTextEl.classList.add('product-name');
    newTextEl.textContent = newText;
  
    // ใช้ตำแหน่งเดียวกับข้อความเดิม
    newTextEl.style.position = 'absolute';
    newTextEl.style.top = '50%';
    newTextEl.style.left = '50%';
    newTextEl.style.transform = 'translate(-50%, -50%)';
    newTextEl.style.opacity = 0.1;
  
    textContainer.appendChild(newTextEl);
  
    let timeline = gsap.timeline({
      onComplete: () => {
        textContainer.removeChild(productName);
        textContainer.dataset.animating = 'false';
      }
    });
  
    timeline.to(productName, {
      duration: 0.6,
      rotateX: 90,
      opacity: 0,
      transformOrigin: "center",
      ease: "power2.in"
    });
  
    timeline.fromTo(newTextEl, {
      rotateX: -90,
      opacity: 0.1,
      transformOrigin: "center"
    }, {
      duration: 0.6,
      rotateX: 0,
      opacity: 0.1,
      ease: "power2.out"
    });
  }
// Add scroll event listener to change slides
window.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    showNextSlide();
  } else {
    showPreviousSlide();
  }
});
/////////////////////////////////////////////////
let startX = 0;
let endX = 0;

// ฟังก์ชันเริ่มต้นเมื่อแตะหน้าจอ
function handleTouchStart(event) {
  startX = event.touches[0].clientX; // ตำแหน่ง X ตอนเริ่มสัมผัส
}

// ฟังก์ชันเมื่อเลื่อนนิ้ว
function handleTouchMove(event) {
  endX = event.touches[0].clientX; // ตำแหน่ง X ตอนเลื่อน
}

// ฟังก์ชันเมื่อปล่อยนิ้ว
function handleTouchEnd() {
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) { // หากการเลื่อนมากกว่า 50px
    if (deltaX > 0) {
      showPreviousSlide(); // ปัดไปทางขวา -> สไลด์ก่อนหน้า
    } else {
      showNextSlide(); // ปัดไปทางซ้าย -> สไลด์ถัดไป
    }
  }

  // รีเซ็ตค่า
  startX = 0;
  endX = 0;
}

// เพิ่ม Event Listeners สำหรับ Touch Events
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('touchstart', handleTouchStart);
sliderContainer.addEventListener('touchmove', handleTouchMove);
sliderContainer.addEventListener('touchend', handleTouchEnd);






