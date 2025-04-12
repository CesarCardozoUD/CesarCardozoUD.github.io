
    // Seleccionamos el track del carousel
    const carouselTrack = document.querySelector('.carousel-track');
  
    // Definimos el tiempo de transición y la duración entre cambios
    const transitionTime = 1000; // 1 segundo de transición
    const autoScrollTime = 5000; // 5 segundos entre cada desplazamiento
  
    // Función para hacer el desplazamiento automático
    let currentIndex = 0;
  
    function moveToNextSlide() {
      currentIndex++;
      if (currentIndex >= 5) { // Si llegamos al último, volvemos al primero
        currentIndex = 0;
      }
  
      const offset = -currentIndex * 102; // Desplazamos el track hacia la siguiente tarjeta
      carouselTrack.style.transform = `translateX(${offset}%)`;
    }
  
    // Iniciamos el movimiento automático cada 5 segundos
    setInterval(moveToNextSlide, autoScrollTime);


    // daskdjaskljdlkas
