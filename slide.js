    let slideIndex = 1;
let autoPlayInterval = 4500; // tempo em ms (4000 = 4s)

showSlides(slideIndex);
startAutoPlay();

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoPlay();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoPlay();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }    
      if (n < 1) { slideIndex = slides.length }

          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";  
        dots[slideIndex - 1].className += " active";
    }

    function startAutoPlay() {
      autoplay = setInterval(() => {
        plusSlides(1);
    }, autoPlayInterval);
  }

  function resetAutoPlay() {
      clearInterval(autoplay);
      startAutoPlay();
  }