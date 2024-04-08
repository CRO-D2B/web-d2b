const submitBtn = document.getElementById('form_submit')

submitBtn.addEventListener('click', () => {
  const form = document.getElementById('form')
  const formData = new FormData(form)

  fetch('https://us-central1-d2b-data-management.cloudfunctions.net/email-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      empresa: formData.get('empresa'),
      interes: formData.get('area_de_interes'),
      comentario: formData.get('comentario')
    })
  }).then(res => res.json()).then(console.log)
});