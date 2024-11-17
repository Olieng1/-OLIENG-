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
        newText = 'AIRMAX';
        break;
      case '02':
        newText = 'AIRFORCE';
        break;
      case '03':
        newText = 'DUNKLOW';
        break;
      case '04':
        newText = 'NIKE';
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






