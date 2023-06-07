const token = sessionStorage.getItem('token')
const form = document.querySelector('form')
const urlPath = window.location.pathname

if (urlPath == '/login' && token) {
  authentication('', '', token)
    .then(res => res.json())
    .then(data => {
      console.log('hola:' + data.id + data.user + data.password + data.token);
      if (data.token) window.location.pathname = '/'
    })
}

if (urlPath == '/login' && !token) {
  form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form))

    authentication(
      user = formData.user,
      password = formData.password,
    )
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          sessionStorage.setItem('token', data.token)
          window.location.pathname = '/'
        }
        if (data.error) {
          document.querySelector('form span').style.display = 'block'
        }
      })
  })
}

if (urlPath != '/login' && token) {
  authentication('', '', token)
    .then(res => res.json())
    .then(data => {
      if (data.token) return
    })
}

if (urlPath != '/login' && !token) {
  window.location.pathname = '/login'
}

