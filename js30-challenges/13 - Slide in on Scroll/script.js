const sliderImages = document.querySelectorAll(".slide-in");

function debounce(func, wait = 10, immediate = true) {
   let timeout;
   return function () {
      let context = this,
         args = arguments;
      let later = function () {
         timeout = null;
         if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
   };
}

function checkSlide(e) {
   sliderImages.forEach((sliderImage) => {
      // halfway through image | for scroll down
      let slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
      // bottom of image | for scroll up
      let imageBottom = sliderImage.offsetTop + sliderImage.height;

      let isHalfShown = slideInAt > sliderImage.offsetTop;
      let isNotScrollPast = window.scrollY < imageBottom;

      if (isHalfShown && isNotScrollPast) {
         sliderImage.classList.add("active");
      } else {
         sliderImage.classList.remove("active");
      }
   });
}

window.addEventListener("scroll", debounce(checkSlide));
