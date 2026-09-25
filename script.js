// МУЗИЧНИЙ ПЛЕЄР
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

// Встановлюємо гучність (не дуже голосно)
bgMusic.volume = 0.5; 

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        musicToggle.classList.remove('playing');
    } else {
        // Браузери вимагають взаємодії перед відтворенням
        bgMusic.play().catch(e => console.log("Браузер блокує автовідтворення аудіо."));
        musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
        musicToggle.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

// Ефект друкарської машинки для підзаголовка
const typeWriterElement = document.querySelector('.typewriter');
const text = "Для найкращого, найрозумнішого і найгарнішого хлопця у Всесвіті...";
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typeWriterElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 1000);

// Scroll Reveal - Анімація появи елементів при скролінгу
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var j = 0; j < reveals.length; j++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[j].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[j].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// Логіка слайдшоу
let slideIndex = 1;
showSlides(slideIndex);
let slideInterval = setInterval(() => plusSlides(1), 4000);

function plusSlides(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    slideInterval = setInterval(() => plusSlides(1), 4000);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    slideInterval = setInterval(() => plusSlides(1), 4000);
}

function showSlides(n) {
    let j;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";  
    }
    for (j = 0; j < dots.length; j++) {
        dots[j].className = dots[j].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// ТЕРМІНАЛ ПРИКОЛ І ВИБУХ ФОТОГРАФІЙ
const verifyBtn = document.getElementById('verify-btn');
const prankProcess = document.getElementById('prank-process');
const photoWall = document.getElementById('photo-wall');

verifyBtn.addEventListener('click', function() {
    this.style.display = 'none';
    prankProcess.classList.remove('hidden');
    
    // Якщо музика ще не грає, автоматично вмикаємо її на кульмінації!
    if (!isMusicPlaying) {
        bgMusic.play().catch(e => console.log("Блокування аудіо"));
        musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
        musicToggle.classList.add('playing');
        isMusicPlaying = true;
    }
    
    // Запускаємо кульмінацію через 4.5 секунди (коли з'явиться фінальний текст)
    setTimeout(() => {
        // 1. Конфеті
        fireConfetti();
        // 2. Показуємо стіну фотографій (вони почнуть вилітати завдяки CSS анімації)
        photoWall.classList.remove('hidden');
    }, 4500);
});

function fireConfetti() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff007f', '#00f2fe', '#ffffff']
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff007f', '#00f2fe', '#ffffff']
      }));
    }, 250);
}
