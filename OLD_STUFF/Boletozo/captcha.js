
// Establecer las imágenes de ejemplo (4 correctas y 12 incorrectas)
const allImages = [
    "img4.jpg", "img2.png", "img21.png", "img6.jpg", "img111.jpg", "img15.webp", "img7.jpeg", "img10.png",
    "img33.jpeg", "img9.jpg", "img11.jpeg", "img12.webp","img5.png", "img1k.webp", "img8.jpg",  "img16.jpg"
];

const correctImages = ["img2.png", "img5.png", "img7.jpeg", "img11.jpeg"]; 


function loadImages() {
    const captchaContainer = document.getElementById("captcha-images");
    captchaContainer.innerHTML = ''; 

    let shuffledImages = allImages; 

    const desktopCorrect = correctImages.slice(0, 2);
    const mobileCorrect = correctImages.slice(2);

    shuffledImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = `assets/captcha/${image}`;
        imgElement.alt = image;
        imgElement.classList.add("captcha-img");

        const isDesktop = index < 8;

        if (isDesktop) {
            imgElement.classList.add("img-desktop-only");
            if (!desktopCorrect.includes(image)) {
                imgElement.classList.add("img-hidden");
            }
        } else {
            imgElement.classList.add("img-mobile-only");
            if (!mobileCorrect.includes(image)) {
                imgElement.classList.add("img-hidden");
            }
        }

        imgElement.addEventListener("click", handleImageClick);
        captchaContainer.appendChild(imgElement);
    });
}

let selectedImages = [];
function handleImageClick(event) {
    const imgSrc = event.target.src.split('/').pop(); 
    if (selectedImages.includes(imgSrc)) {
        selectedImages = selectedImages.filter(img => img !== imgSrc);
        event.target.style.border = "none"
    } else {
        selectedImages.push(imgSrc);
        event.target.style.border = "solid red 2px"
    }
    checkSelection();
}

function checkSelection() {
    const submitButton = document.getElementById("submit-btn");
    if (selectedImages.length === 4 && selectedImages.every(img => correctImages.includes(img))) {
        submitButton.disabled = false; 
    } else {
        submitButton.disabled = true;
    }
}

// Mostrar el texto parpadeante cada 5 minutos
let countdown = 30; // 5 minutos en segundos
const blinkingText = document.getElementById("blinking-text");

function startCountdown() {
    setInterval(() => {
        countdown -= 1;
        if (countdown === 0) {
            blinkingText.style.display = "block"; // Mostrar el texto
            setTimeout(() => blinkingText.style.display = "none", 5000); // Esconder después de 30 segundos
            countdown = 30; // Reiniciar el contador
        }
    }, 1000);
}

function prize(){
    window.location.href = "./prize.html"
}

// Llamar a las funciones cuando cargue la página
window.onload = () => {
    loadImages();
    startCountdown();
};
