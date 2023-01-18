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
