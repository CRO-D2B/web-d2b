function animate(clases, observer) {
  clases.forEach((clase) => {
    // seleccionar clase
    const items = document.querySelectorAll(`.${clase}`)

    // si no existe no observar
    if (items.length < 1) return

    // observar clase
    items.forEach((el) => {
      observer.observe(el)
    })
  })
}

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}

const observerSm = new IntersectionObserver(callback, { threshold: 0.5 })
const observerBg = new IntersectionObserver(callback, { threshold: 0.2 })
const observerArrow = new IntersectionObserver(callback, { threshold: 0.7 })

const bigContainers = [
  // QUIENES SOMOS
  "qs-team-content",
  "info-links-container",
  "tr-grid-content",
  "blog-info-container-desktop",
  "blog-info-container-mobile",

  // QUE HACEMOS
  "hq-herocarrousel-content",
  "casos-data-container",
  "expertise-data-container",
]

const smallContainers = [
  "section-title-container",

  // QUE HACEMOS
  "clientes-logos-content",
]

animate(bigContainers, observerBg)
animate(smallContainers, observerSm)
animate(["animated-arrow-container"], observerArrow)

const closeBtn = document.querySelector(".navbar-close-container")
const openBtn = document.querySelectorAll(".header-menu-container")
const navbar = document.querySelector(".navbar-container")
const navbaritems = document.querySelectorAll(".navbar-menu-item")
const body = document.querySelector("body")

// NAVBAR
openBtn.forEach((el) => {
  el.addEventListener("click", () => {
    // no permitir scroll
    body.style.overflow = "hidden"

    navbar.classList.add("active")
  })
})

// CERRAR NAVBAR
closeBtn.addEventListener("click", () => {
  // permitir scroll
  body.style.overflow = "visible"

  navbar.classList.remove("active")
})

// CERRAR NAVBAR CUANDO APRETAN UN LINK
navbaritems.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target.localName !== "a") return

    // permitir scroll
    body.style.overflow = "visible"

    // cerrar navbar
    navbar.classList.remove("active")
  })
)

// ABRIR NAVBAR SCROLL ON SCROLL
const headernormal = document.querySelector(".header-normal")
const headerscroll = document.querySelector(".header-scroll")

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset

  if (currentScrollPos > 30) {
    headernormal.firstElementChild.classList.add("animate-header")
    headernormal.style.display = "none"
    headerscroll.style.display = "block"
  } else {
    headernormal.style.display = "block"
    headerscroll.style.display = "none"
  }
})

// QUE HACEMOS HTML

// STATE DE CARROUSELS
const carrState = {}

// CARROUSEL DE POSICION ESPECIFICA
class SpecCarrousel {
  constructor(classname) {
    this.buttons = document.querySelectorAll(`.carrousel-button.${classname}`)
    this.content = document.querySelectorAll(`.carrousel-content-${classname}`)
    this.prevMovement = this.content[0].classList.contains("hq-carrousel-content") ? 1 : 0
  }

  goTo(n) {
    let direction = n

    if (n + 1 > this.buttons.length || n < 0) {
      return false
    }

    // agregar clase a boton
    this.buttons.forEach((el) => {
      el.classList.remove("active")
    })

    this.buttons[direction].classList.add("active")

    if (this.buttons[0].classList.contains("team")) {
      direction = n * 2
    }

    // cambiar posicion
    this.content.forEach((el) => {
      el.style.transform = `translateX(-${direction * 100}%)`
    })

    return true
  }
}

class Carrousel {
  constructor(classname) {
    this.content = document.querySelectorAll(`.carrousel-content-${classname}`)
    this.buttons = document.querySelectorAll(`.carrousel-arrow-${classname}`)
    this.containerWidth = document.querySelector(".clientes-logos-content.animate").offsetWidth
    this.carWidth = 700
    this.curPos = 0
    this.averageSize = this.carWidth / this.content.length
    this.start()
  }

  start() {
    // calcular width
    let totalWidth = 0
    this.content.forEach((el) => (totalWidth += el.offsetWidth))
    if (totalWidth > 0) {
      this.carWidth = totalWidth
      this.averageSize = totalWidth / this.content.length
    }
  }

  calcularPosicion(dir) {
    return dir === -1 ? this.curPos + this.averageSize : this.curPos - this.averageSize
  }

  activarFlechas() {
    this.buttons.forEach((el) => {
      el.classList.remove("inactive")
    })
  }

  desactivarFlecha(n) {
    this.buttons[n].classList.add("inactive")
  }

  goTo(n) {
    if (n === 1 && !this.buttons[1].classList.contains("inactive")) {
      this.activarFlechas()

      this.content.forEach((el) => {
        el.style.transform = `translateX(${this.curPos - this.averageSize}px)`
      })

      if (this.curPos - this.averageSize <= 0 - (this.carWidth + this.averageSize - this.containerWidth)) {
        this.desactivarFlecha(1)
      }

      return true
    } else if (n === -1 && !this.buttons[0].classList.contains("inactive")) {
      this.activarFlechas()

      this.content.forEach((el) => {
        el.style.transform = `translateX(${this.curPos + this.averageSize}px)`
      })

      if (this.curPos + this.averageSize * 1.5 > 0) {
        this.desactivarFlecha(0)
      }
      return true
    } else {
      return false
    }
  }
}

function ChangeCarrContent(n, classname, dragged = false) {
  if (!carrState[classname]) {
    carrState[classname] = new SpecCarrousel(classname)
  }

  let result
  if (!dragged) {
    result = carrState[classname].goTo(n)
    // si no se hizo el movimiento volver
    if (!result) return

    carrState[classname].prevMovement = n
  } else if (dragged) {
    result = carrState[classname].goTo(carrState[classname].prevMovement + n)

    // si no se hizo el movimiento volver
    if (!result) return

    carrState[classname].prevMovement += n
  }
}

function ChangeLogoCar(classname, dir) {
  if (!carrState[classname]) {
    carrState[classname] = new Carrousel(classname)
  }

  const result = carrState[classname].goTo(dir)

  if (result) {
    carrState[classname].curPos = carrState[classname].calcularPosicion(dir)
  }
}

// AGREGAR DRAG EVENT CARROUSELS CONTAINERS
const carrouselsContainers = document.querySelectorAll(".carrousel-container")

carrouselsContainers.forEach((el) => {
  let itemclass = ""
  let startTouchX = 0

  el.addEventListener("touchstart", (e) => {
    // e.preventDefault()
    // e.stopPropagation()

    let classindex = 2
    el.classList.forEach((el, i) => (el === "carrousel-container" ? (classindex = i + 1) : ""))
    itemclass = el.classList[classindex]
    startTouchX = e.changedTouches[0].clientX
  })

  el.addEventListener("touchend", (e) => touchEnd(e))
  el.addEventListener("touchcancel", (e) => touchEnd(e))

  function touchEnd(e) {
    // e.preventDefault()
    e.stopPropagation()

    const finalTouchX = e.changedTouches[0].clientX
    const movement = startTouchX - finalTouchX

    if (movement > 30) {
      if (itemclass === "partner" || itemclass === "cliente") {
        ChangeLogoCar(itemclass, 1)
      } else {
        ChangeCarrContent(1, itemclass, true)
      }
    } else if (movement < -30) {
      if (itemclass === "partner" || itemclass === "cliente") {
        ChangeLogoCar(itemclass, -1)
      } else {
        ChangeCarrContent(-1, itemclass, true)
      }
    }
  }
})

// CARROUSEL LOOP
const carCliente = document.querySelector(".carrousel-content-cliente")
const carPartner = document.querySelector(".carrousel-content-partner")

function carLoop(clase, curDir) {
  let dir = curDir

  if (!carrState[clase]) {
    carrState[clase] = new Carrousel(clase)
  }

  // si el primer boton esta desabilitado y el segundo habilitado
  if (
    carrState[clase].buttons[0].classList.contains("inactive") &&
    !carrState[clase].buttons[1].classList.contains("inactive")
  ) {
    dir = 1
  } else if (
    carrState[clase].buttons[1].classList.contains("inactive") &&
    !carrState[clase].buttons[0].classList.contains("inactive")
  ) {
    dir = -1
  }

  // ir a la posicion
  carrState[clase].goTo(dir)

  // guradar posicion en clase
  carrState[clase].curPos = carrState[clase].calcularPosicion(dir)

  // empezar loop de nuevo
  setTimeout(() => {
    carLoop(clase, dir)
  }, 2000)
}

if (carCliente) {
  ;[carCliente, carPartner].forEach((el) =>
    el.addEventListener("animationend", (e) => {
      const clase = e.target.classList[1].split("-")[2]
      setTimeout(() => {
        carLoop(clase)
      }, 500)
    })
  )
}

// CASOS HTML
const arrowbtns = document.querySelectorAll(".casos-arrow-container")

arrowbtns.forEach((el) => {
  el.addEventListener("click", (e) => {
    const casoscardinfo = document.querySelector(`.casos-info-container.${e.target.classList[1]}`)

    HandleOpen(casoscardinfo)
    HandleOpen(e.target, "down")
    HandleOpen(e.target, "up")
  })
})

// BLOG HTML
const menu = document.querySelector(".blog-more-container")
const menucontent = document.querySelector(".blog-links-container")
const menubtn = document.querySelector(".blog-more-container")
const inputcontainer = document.querySelector(".blog-input-container")
const searchbtn = document.querySelector(".blog-search-container")

// ABRIR MENU
if (menu) {
  menu.addEventListener("click", () => {
    HandleClose(inputcontainer)
    HandleOpen(menucontent)
    HandleOpen(menubtn)
  })
}

// ABRIR INPUT
if (searchbtn) {
  searchbtn.addEventListener("click", () => {
    HandleClose(menucontent)
    HandleClose(menubtn)
    HandleOpen(inputcontainer)
  })
}

function HandleClose(item) {
  if (item.classList.contains("active")) {
    item.classList.remove("active")
  }
}

function HandleOpen(item, clase = "active") {
  if (item.classList.contains(clase)) {
    item.classList.remove(clase)
  } else {
    item.classList.add(clase)
  }
}

// EXPERTISE HTML
const leftArrow = document.querySelector(".left-arrow")
const rightArrow = document.querySelector(".right-arrow")
const expertiseCards = Number(localStorage.getItem("expertiseCards"))
const translate = -100

leftArrow.addEventListener("click", () => {
  const prevCard = Number(localStorage.getItem("actualExpertiseCard"))
  const actualCard = prevCard - 1
  localStorage.setItem("actualExpertiseCard", actualCard)
  if (actualCard === 1) leftArrow.classList.toggle("no-visible")
  if (prevCard === expertiseCards) rightArrow.classList.toggle("no-visible")
  document
    .querySelectorAll(".nuestra-expertise-item-container")
    .forEach((card) => (card.style.transform = "translateX(" + translate * (actualCard - 1) + "%)"))
})

rightArrow.addEventListener("click", () => {
  const prevCard = Number(localStorage.getItem("actualExpertiseCard"))
  const actualCard = prevCard + 1
  localStorage.setItem("actualExpertiseCard", actualCard)
  if (actualCard === expertiseCards) rightArrow.classList.toggle("no-visible")
  if (prevCard === 1) leftArrow.classList.toggle("no-visible")
  document
    .querySelectorAll(".nuestra-expertise-item-container")
    .forEach((card) => (card.style.transform = "translateX(" + translate * (actualCard - 1) + "%)"))
})
