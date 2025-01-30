const images = ['1.jpg', '2.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']

let activeImage = 0
let autoSlideInterval
let isAutoSliding = true

const sliderPlace = document.querySelector('.main-slider__line')
const pauseIcon = document.getElementById('pause-icon')
const playIcon = document.getElementById('play-icon')
const widthoffset = document.querySelector('.main-slider').clientWidth
sliderPlace.style.width = widthoffset + 'px'
sliderPlace.style.heigth = widthoffset + 'px'
sliderPlace.style.left = '-' + widthoffset + 'px'
let flag = true

let startX = 0
let endX = 0


const initSlider = () => {
  const img = document.createElement('img')
  img.alt = ''
  img.src = './images/' + images[activeImage]
  img.className = 'main-img'
  sliderPlace.append(img)
  nextImageGenerate()
  prevImageGenerage()
}
const nextImageGenerate = () => {
  let nextImage = activeImage + 1
  if (nextImage >= images.length) nextImage = 0
  const img = document.createElement('img')
  img.alt = ''
  img.src = 'images/' + images[nextImage]
  img.className = 'main-img'
  sliderPlace.append(img)
}

const prevImageGenerage = (w = false) => {
  let prevImage = activeImage - 1
  if (prevImage < 0) prevImage = images.length - 1
  const img = document.createElement('img')
  img.alt = ''
  img.src = 'images/' + images[prevImage]
  img.className = 'main-img'
  if (w) img.style.width = 0
  sliderPlace.prepend(img)
}
const nextSlide = () => {
  if (!flag) return
  flag = !flag
  activeImage++
  if (activeImage >= images.length) activeImage = 0
  nextImageGenerate()
  animate({
    duration: 1000,
    draw: function (progress) {
      document.querySelector('.main-slider__line .main-img').style.width = (widthoffset * (1 - progress)) + 'px'
    },
    removeElement: document.querySelector('.main-slider__line .main-img')
  })
  
}

const prevSlide = () => {
  if (!flag) return
  flag = !flag

  activeImage--
  if (activeImage < 0) activeImage = images.length - 1
  prevImageGenerage(true)
  animate({
    duration: 1000,
    draw: function (progress) {
      document.querySelector('.main-slider__line .main-img').style.width = (widthoffset * progress) + 'px'
    },
    removeElement: document.querySelector('.main-slider__line .main-img:last-child')
  })
 }
 
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000)
  isAutoSliding = true
  hidePauseIconAfterDelay()
  showPlayIcon()
}

const pauseAutoSlide = () => {
  clearInterval(autoSlideInterval)
  isAutoSliding = false
  showPauseIcon()
}

const toggleAutoSlide = () => {
  if (isAutoSliding) {
    pauseAutoSlide()
  } else {
    startAutoSlide()
  }
}
const showPauseIcon = () => {
  pauseIcon.classList.remove('visually-hidden')
  hidePauseIconAfterDelay()
}

const hidePauseIconAfterDelay = () => {
  setTimeout(() => {
    pauseIcon.classList.add('visually-hidden')
  }, 1000)
}
const showPlayIcon = () => {
  playIcon.classList.remove('visually-hidden')
  hidePlayIconAfterDelay()
}

const hidePlayIconAfterDelay = () => {
  setTimeout(() => {
    playIcon.classList.add('visually-hidden')
  }, 1000) 
}
const handleKeydown = (event) => {
  if (event.key === 'ArrowRight') {
    nextSlide()
  } else if (event.key === 'ArrowLeft') {
    prevSlide()
  }
}

const handleTouchStart = (event) => {
  startX = event.touches[0].clientX
}

const handleTouchMove = (event) => {
  endX = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (startX - endX > 50) {
    nextSlide()
  } else if (endX - startX > 50) {
    prevSlide()
  }
}

const handleMouseDown = (event) => {
  startX = event.clientX
}

const handleMouseMove = (event) => {
  endX = event.clientX
}

const handleMouseUp = () => {
  if (startX - endX > 50) {
    nextSlide()
  } else if (endX - startX > 50) {
    prevSlide()
  }
}

initSlider()

document.querySelector('.main-slider__next').addEventListener('click', nextSlide)
document.querySelector('.main-slider__prev').addEventListener('click', prevSlide)
sliderPlace.addEventListener('click', toggleAutoSlide)
document.addEventListener('keydown', handleKeydown)

sliderPlace.addEventListener('touchstart', handleTouchStart)
sliderPlace.addEventListener('touchmove', handleTouchMove)
sliderPlace.addEventListener('touchend', handleTouchEnd)

sliderPlace.addEventListener('mousedown', handleMouseDown)
sliderPlace.addEventListener('mousemove', handleMouseMove)
sliderPlace.addEventListener('mouseup', handleMouseUp)

startAutoSlide()

const animate = ({ duration, draw, removeElement }) => {
  const start = performance.now()
  requestAnimationFrame(function animate(time) {
    let step = (time - start) / duration
    if (step > 1) step = 1
    draw(step)
    if (step < 1) {
      requestAnimationFrame(animate)
    } else {
      removeElement.remove()
      flag = true
    }
  })
}
