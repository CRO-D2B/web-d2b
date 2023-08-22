const path = window.location.pathname
const segments = path.split("/")

const replaceContent = (id, content) => {
  document.getElementById(id).innerHTML = content
}

const replaceLink = (id, content) => {
  document.getElementById(id).href = content
}

const replaceImage = (id, url) => {
  document.getElementById(id).src = url
}
const replaceBgImage = (id, url) => {
  document.getElementById(id).style.background = "url(" + url + ")"
  document.getElementById(id).style.backgroundPosition = "center"
  document.getElementById(id).style.backgroundSize = "cover"
}

const getMonthName = (month) => {
  const monthNumber = parseInt(month)
  return [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ][monthNumber - 1]
}

const appendContent = (id, content) => {
  document.getElementById(id).innerHTML = content + document.getElementById(id).innerHTML
}

const appendContentLinear = (id, content) => {
  document.getElementById(id).innerHTML += content
}

const actualAppendContent = (id, content) => {
  document.getElementById(id).append(content)
}

const prependContent = (id, content) => {
  document.getElementById(id).prepend(content)
}

const renderQueHacemosItems = (data, index, render = "") => {
  if (index < data.length) {
    getImage(data[index].icono).then((image) => {
      const newRender =
        render +
        '<div class="hq-carrousel-content carrousel-content-hero">\
				    <div class="hq-svg-container">\
				        <img src="' +
        image +
        '" alt="">\
				    </div>\
				    <p>' +
        data[index].bajada +
        "</p>\
				</div>"
      renderQueHacemosItems(data, index + 1, newRender)
    })
  } else {
    appendContent("que_hacemos_items", render)
  }
}

const renderExpertise = (data, index) => {
  if (index < data.length) {
    getImage(data[index].imagen).then((image) => {
      let div = document.createElement("div")
      div.classList.add("expertise-item-container")
      div.innerHTML =
        '<a href="/servicio/' +
        data[index].url_segment +
        '"><div class="expertise-item-img-container"><img src="' +
        image +
        '"></div><div class="expertise-item-content-container"><h5>' +
        data[index].titulo +
        "</h5> <p>" +
        data[index].subtitulo +
        "</p> </div> </a>"

      actualAppendContent("expertise_data_container", div)
      renderExpertise(data, index + 1)
    })
  }
}

const renderExpertiseNoDescription = (data, index) => {
  if (index < data.length) {
    getImage(data[index].imagen).then((image) => {
      let a = document.createElement("a")
      a.classList.add("expertise-item-container")
      a.style.setProperty("--bgimg", "url(" + image + ")")
      a.href = "/servicio/" + data[index].url_segment
      a.innerHTML =
        "<div class='purple-border'></div><div class='expertise-item-content'>" + data[index].titulo + "</div>"
      actualAppendContent("expertise_data_container", a)
      renderExpertiseNoDescription(data, index + 1)
    })
  }
}

const renderClientes = (data, index) => {
  if (index < data.length) {
    getImage(data[index].directus_files_id).then((image) => {
      let div = document.createElement("div")
      div.classList.add("cliente-logo", "carrousel-content-cliente")
      div.innerHTML = '<img src="' + image + '">'
      actualAppendContent("clientes_container", div)
      renderClientes(data, index + 1)
    })
  }
}

const renderPartners = (data, index) => {
  if (index < data.length) {
    getPartnerImage(data[index].directus_files_id).then((partner) => {
      let a = document.createElement("a")
      a.target = "_blank"
      a.href = partner.description.replace(/<p>|<\/p>/g, "")
      a.classList.add("cliente-logo", "carrousel-content-partner")
      a.style.transform = "translateX(0%)"
      a.innerHTML = '<img src="' + partner.data.full_url + '">'
      actualAppendContent("partners_container", a)
      renderPartners(data, index + 1)
    })
  }
}

const renderCasos = (data, index) => {
  if (index < data.length) {
    getRelated("caso_categoria_casos", "caso_id", data[index].id).then((categoryRel) => {
      getSingleItem("categoria_casos", categoryRel.data[0].categoria_casos_id).then((category) => {
        getImage(category.data.icono).then((image) => {
          let div = document.createElement("div")
          let a = document.createElement("a")
          a.href = "/casos/" + data[index].url_segment
          div.classList.add("casos-item-container", "carrousel-content-casos")
          a.innerHTML =
            '<div class="casos-item-content">\
                                <div class="casos-item-title-container">\
                                    <span>' +
            category.data.titulo +
            '</span>\
                                    <div class="casos-item-icon-container">\
                                        <img src="' +
            image +
            '" alt="">\
                                    </div>\
                                </div>\
                                <div class="casos-item-content-container">\
                                    <h5>' +
            data[index].titulo +
            "</h5>\
                                    <p>" +
            data[index].bajada +
            '</p>\
                                </div>\
                                <div class="casos-link-container">\
                                    <span>Ver caso completo</span>\
                                    <div class="arrowdown-container">\
                                        <img src="/static/img/icons/flechawine.svg" alt="">\
                                    </div>\
                                </div>\
                            </div>'
          div.innerHTML = a.outerHTML
          actualAppendContent("casos_container", div)
          renderCasos(data, index + 1)
        })
      })
    })
  }
}

const renderStaff = (data, index) => {
  if (index < data.length) {
    getImage(data[index].picture).then((image) => {
      if (index < 7) {
        replaceImage("imagen_single_staff_" + index, image)
        replaceContent("nombre_single_staff_" + index, data[index].name)
        replaceContent("rol_single_staff_" + index, data[index].role)
      } else {
        const div = document.createElement("div")
        div.classList.add("qs-team-item", "carrousel-content-team")
        div.innerHTML =
          '\
					<img src="' +
          image +
          '" alt="">\
                    <div class="team-info">\
                        <h5>' +
          data[index].name +
          "</h5>\
                        <p>" +
          data[index].role +
          "</p>\
                    </div>"
        actualAppendContent("staff_container", div)
      }
    })
    renderStaff(data, index + 1)
  }
}

const renderBeneficios = (data, index) => {
  if (index > -1) {
    getImage(data[index].imagen).then((image) => {
      let div = document.createElement("div")
      div.classList.add("tr-grid-item", "carrousel-content-tr")
      div.innerHTML =
        '<div class="tr-ill-container">\
                    <img src="' +
        image +
        '"\
                        alt="">\
                </div>\
                <div class="tr-info-container">\
                    <img src="/static/img/checkcirc.svg" alt="">\
                    <p>' +
        data[index].titulo +
        "</p>\
                </div>"
      actualAppendContent("beneficios_container", div)
      renderBeneficios(data, index - 1)
    })
  }
}

const renderArticulosRelacionados = (data) => {
  data.forEach((articuloRel, index) => {
    getSingleItem("blog", articuloRel.blog_id).then((articulo) => {
      if (index === 0) {
        getImage(articulo.data.imagen_principal).then((image) => {
          replaceBgImage("articulo_1_image", image)
          replaceBgImage("articulo_1_mobile_image", image)
        })
        replaceContent("articulo_1_titulo", articulo.data.titulo)
        replaceContent("articulo_1_mobile_titulo", articulo.data.titulo)
        replaceContent("articulo_1_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_1_mobile_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_1_autor", articulo.data.autor)
        replaceContent("articulo_1_mobile_autor", articulo.data.autor)
        replaceContent("articulo_1_extracto", articulo.data.extracto.substring(0, 72) + "...")
        replaceContent("articulo_1_mobile_extracto", articulo.data.extracto)
        replaceLink("articulo_1_link", "/blog/" + articulo.data.url_segment)
        replaceLink("articulo_1_mobile_link", "/blog/" + articulo.data.url_segment)
      } else if (index == 1) {
        getImage(articulo.data.imagen_principal).then((image) => {
          replaceBgImage("articulo_2_image", image)
          replaceBgImage("articulo_2_mobile_image", image)
        })
        replaceContent("articulo_2_titulo", articulo.data.titulo)
        replaceContent("articulo_2_mobile_titulo", articulo.data.titulo)
        replaceContent("articulo_2_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_2_mobile_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_2_autor", articulo.data.autor)
        replaceContent("articulo_2_mobile_autor", articulo.data.autor)
        replaceContent("articulo_2_mobile_extracto", articulo.data.extracto)
        replaceLink("articulo_2_link", "/blog/" + articulo.data.url_segment)
        replaceLink("articulo_2_mobile_link", "/blog/" + articulo.data.url_segment)
      } else {
        getImage(articulo.data.imagen_principal).then((image) => {
          replaceBgImage("articulo_3_image", image)
          replaceBgImage("articulo_3_mobile_image", image)
        })
        replaceContent("articulo_3_titulo", articulo.data.titulo)
        replaceContent("articulo_3_mobile_titulo", articulo.data.titulo)
        replaceContent("articulo_3_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_3_mobile_fecha", articulo.data.fecha_para_mostrar)
        replaceContent("articulo_3_autor", articulo.data.autor)
        replaceContent("articulo_3_mobile_autor", articulo.data.autor)
        replaceContent("articulo_3_extracto", articulo.data.extracto.substring(0, 180) + "...")
        replaceContent("articulo_3_mobile_extracto", articulo.data.extracto)
        replaceLink("articulo_3_link", "/blog/" + articulo.data.url_segment)
        replaceLink("articulo_3_mobile_link", "/blog/" + articulo.data.url_segment)
      }
    })
  })
}

const renderCategorias = (data, index) => {
  if (index < data.length) {
    let li = document.createElement("li")
    li.innerHTML = '<a href="/blog/' + data[index].url_segment + '">' + data[index].title + "</a>"
    let stringLi = '<li><a href="/blog/' + data[index].url_segment + '">' + data[index].title + "</a></li>"
    appendContent("categorias_container", stringLi)
    appendContent("categorias_container_sidebar", stringLi)
    actualAppendContent("categorias_container_mobile_sidebar", li)
    renderCategorias(data, index + 1)
  }
}

const renderArticulos = (data, index) => {
  if (index < data.length) {
    const articulo = data[index]
    getRelatedCategorias(articulo.id).then((categorias) => {
      let renderCategorias = ""
      categorias.data.slice(0, 2).forEach((categoria) => {
        renderCategorias +=
          '<div class="tags-item-container">\
						                <span>' +
          categoria.title +
          "</span>\
						            </div>"
      })
      if (window.innerWidth > 600 || index < 3) {
        getImage(articulo.imagen_principal).then((image) => {
          let renderArticulo = document.createElement("div")
          renderArticulo.classList.add("blog-mainitems-item-container")
          renderArticulo.innerHTML =
            '\
						    <div class="blog-mainitems-item-content">\
						        <div class="tags-container">\
						            ' +
            renderCategorias +
            '\
						        </div>\
						        <div class="img-container">\
						            <img src="' +
            image +
            '" alt="">\
						        </div>\
						        <div class="info-container">\
						            <h4>' +
            articulo.titulo +
            '</h4>\
						            <a class="info-link-container" href="/blog/' +
            articulo.url_segment +
            '">\
						                <span>Continuar leyendo</span>\
						                <div class="info-link-icon-container">\
						                    <img src="/static/img/icons/flechaverde.svg" alt="">\
						                </div>\
						            </a>\
						        </div>\
						</div>'
          actualAppendContent("articulos_container", renderArticulo)
          renderArticulos(data, index + 1)
        })
      } else {
        let renderArticuloMobile = document.createElement("div")
        renderArticuloMobile.classList.add("blog-mobileitem-container")
        renderArticuloMobile.innerHTML =
          '\
				<div class="info-container">\
				    <h4>' +
          articulo.titulo +
          '</h4>\
				    <a class="info-link-container" href="/blog/' +
          articulo.url_segment +
          '">\
				        <span>Continuar leyendo</span>\
				        <div class="info-link-icon-container">\
				            <img src="/static/img/icons/flechaverde.svg" alt="">\
				        </div>\
				    </a>\
				</div>'
        actualAppendContent("articulos_container_mobile", renderArticuloMobile)
        renderArticulos(data, index + 1)
      }
    })
  }
}

const renderArticulosRecientes = (data) => {
  data.forEach((articulo) => {
    let li = '<li><a href="/blog/' + articulo.url_segment + '">' + articulo.titulo + "</a><li>"
    appendContent("entradas_recientes", li)
    appendContent("entradas_recientes_mobile", li)
  })
}

const renderArchivos = (data) => {
  const fechas = [...new Set(data.map((articulo) => articulo.fecha_para_mostrar.substr(0, 7)))]
  fechas.forEach((fecha) => {
    const año = fecha.substr(0, 4)
    const mesNumero = fecha.substr(5, 2)
    const mesNombre = getMonthName(mesNumero)
    appendContent(
      "archivo_container_mobile",
      '<li>\
			    <a href="/blog/archivo-' +
      año +
      "-" +
      mesNumero +
      '">' +
      mesNombre +
      " " +
      año +
      '</a>\
			    <div class="arrow right border-grey"></div>\
			</li>'
    )
    appendContent(
      "archivo_container",
      '<li>\
			    <a href="/blog/archivo-' +
      año +
      "-" +
      mesNumero +
      '">' +
      mesNombre +
      " " +
      año +
      '</a>\
			    <div class="arrow right border-grey"></div>\
			</li>'
    )
  })
}

const renderAreasDeInteres = (data) => {
  data.forEach((area) => {
    let option = document.createElement("option")
    option.innerHTML = area.nombre
    actualAppendContent("areas_de_interes", option)
  })
}

const renderArticuloSingle = (articulo) => {
  getRelatedCategorias(articulo.id).then((categorias) => {
    let renderCategorias = ""
    categorias.data.slice(0, 2).forEach((categoria) => {
      renderCategorias +=
        '<div class="blogitem-tag-item">\
					                <span>' +
        categoria.title +
        "</span>\
					            </div>"
    })
    getImage(articulo.imagen_principal).then((image) => {
      let renderArticulo =
        '\
				    <div class="blogitem-tags-container">\
			            ' +
        renderCategorias +
        '\
			        </div>\
			        <div class="item-title-container">\
			            <h2>' +
        articulo.titulo +
        '</h2>\
			            <div class="item-title-info-container">\
			                <div class="info-item-container">\
			                    <div class="info-item-icon"></div>\
			                    <p>' +
        articulo.fecha_para_mostrar +
        '</p>\
			                </div>\
			                <div class="info-item-container">\
			                    <div class="info-item-icon"></div>\
			                    <p>' +
        articulo.autor +
        '</p>\
			                </div>\
			            </div>\
			        </div>\
                    <div class="blogitem-img-container">\
                        <img src="' +
        image +
        '" alt="">\
                    </div>\
			        <div class="blogitem-info-container">' +
        articulo.cuerpo +
        "</div>\
				</div>"
      replaceContent("articulo_single", renderArticulo)
    })
  })
}

const renderCasoSingle = (caso) => {
  getRelated("caso_categoria_casos", "caso_id", caso.id).then((categoryRel) => {
    getSingleItem("categoria_casos", categoryRel.data[0].categoria_casos_id).then((category) => {
      getImage(category.data.icono).then((image) => {
        replaceImage("imagen_categoria", image)
        replaceImage("mobile_imagen_categoria", image)
      })
      replaceContent("categoria", category.data.titulo)
      replaceContent("mobile_categoria", category.data.titulo)
    })
  })
  getRelatedResultados(caso.id).then((resultados) => {
    let renderResultadosMobile = ""
    let renderResultados = ""
    resultados.data.forEach((resultado) => {
      let render =
        '<div class="bullet-item-container"> \
								<img src="/static/img/checkcircwine.svg" alt="">\
                        		<p class="text semibold">' +
        resultado.titulo +
        "</p>\
                            </div>"
      let renderMobile =
        '<div class="bullet-item-container"> \
								<img src="/static/img/checkcircwine.svg" alt="">\
                    			<p class="text bold">' +
        resultado.titulo +
        "</p>\
                            </div>"
      appendContentLinear("mobile_resultados_container", renderMobile)
      appendContentLinear("resultados_container", render)
    })
  })
  replaceContent("titulo", caso.titulo)
  replaceContent("mobile_titulo", caso.titulo)
  replaceContent("bajada", caso.bajada)
  replaceContent("mobile_bajada", caso.bajada)
  replaceContent("enfoque", caso.enfoque)
  replaceContent("mobile_enfoque", caso.enfoque)
}

const renderExpertiseSingle = (expertise) => {
  getRelated("dev_expertise_categoria_dev_expertise", "dev_expertise_id", expertise.id).then((categoryRel) => {
    getSingleItem("categoria_dev_expertise", categoryRel.data[0].categoria_dev_expertise_id).then((category) => {
      getImage(category.data.icono).then((image) => {
        replaceImage("imagen_categoria", image)
        replaceImage("mobile_imagen_categoria", image)
      })
      replaceContent("categoria", category.data.titulo)
      replaceContent("mobile_categoria", category.data.titulo)
    })
  })
  let contentWithBr = expertise.texto_principal.replaceAll("\n", "<br><br>")
  replaceContent("bajada", contentWithBr)
  replaceContent("mobile_bajada", contentWithBr)
  getNuestraExpertise(expertise.id).then((data) => {
    data.data.forEach((item, index) => {
      let render = document.createElement("div")
      render.className = "nuestra-expertise-item-container"
      render.innerHTML =
        "<div class='nuestra-expertise-item'><h4>" +
        item.titulo +
        "</h4><div class='nuestra-expertise-description'>" +
        item.descripcion +
        "</div></div>"
      let renderMobile = document.createElement("div")
      renderMobile.className = "nuestra-expertise-item-container"
      renderMobile.innerHTML =
        "<div class='nuestra-expertise-item'><h4>" +
        item.titulo +
        "</h4><div class='nuestra-expertise-description'>" +
        item.descripcion +
        "</div></div>"
      actualAppendContent("mobile_nuestra_expertise_items_container", renderMobile)
      actualAppendContent("nuestra_expertise_items_container", render)
      let dot = document.createElement("div")
      dot.className = `carrousel-button bg-grey-thin ${index === 0 ? 'active' : ''}`
      actualAppendContent("carrousel-buttons", dot)
    })
    document.querySelectorAll("#carrousel-buttons>.carrousel-button").forEach((dot, index) => dot.addEventListener("click", () => {
      const cardWidth = document.querySelector("#mobile_nuestra_expertise_items_container>div").offsetWidth;
      document.querySelectorAll("#carrousel-buttons>.carrousel-button").forEach(point => point.classList.remove('active'))
      dot.classList.add('active');
      document.querySelector("#mobile_nuestra_expertise_items_container").scrollTo(index * cardWidth, 0)
    }))
  })
  getMasInfoExpertise(expertise.id).then((data) => {
    if (data.data.length === 0) document.querySelectorAll('.extra-info-content').forEach(e => e.remove())
    data.data.forEach((info) => {
      let render = document.createElement("div")
      render.className = "extra-info-item"
      render.innerHTML =
        "<div class='title-container'><h5>" +
        info.titulo +
        "</h5><div class='extra-info-arrow-container'><div class='arrow arrow-down border-wine'></div></div></div>\
      <div class='extra-info-respuesta'>" +
        info.respuesta +
        "</div>"
      let renderMobile = document.createElement("div")
      renderMobile.className = "extra-info-item"
      renderMobile.innerHTML =
        "<div class='title-container'><h5>" +
        info.titulo +
        "</h5><div class='extra-info-arrow-container'><div class='arrow arrow-down border-wine'></div></div></div>\
        <div class='extra-info-respuesta'>" +
        info.respuesta +
        "</div>"
      actualAppendContent("mobile_extra_info_container", renderMobile)
      actualAppendContent("extra_info_container", render)
    })
    document.querySelectorAll(".title-container").forEach((title) =>
      title.addEventListener("click", (e) => {
        const tituloContainer = e.target.closest(".title-container")
        tituloContainer.nextElementSibling.classList.toggle("extra-info-visible")
        tituloContainer.lastElementChild.firstElementChild.classList.toggle("arrow-down")
        tituloContainer.lastElementChild.firstElementChild.classList.toggle("arrow-up")
      })
    )
  })
}

const renderHeaders = (headers) => {
  const head = document.querySelector("head")
  headers.forEach((header) => {
    const temp = document.createElement("div")
    temp.innerHTML = header.tag
    const htmlObject = temp.firstChild
    head.appendChild(htmlObject)
  })
}

switch (segments[1]) {
  case "quienes-somos":
    getHeaders("quienes_somos", 1).then((data) => {
      renderHeaders(data.data)
    })
    getQuienesSomos().then((json) => {
      const pageData = json.data
      replaceContent("bajada_principal", pageData.bajada_prinicpal)
      replaceContent("nuestra_cultura_titulo", pageData.nuestra_cultura_titulo)
      replaceContent("nuestra_cultura_cuerpo", pageData.nuestra_cultura_cuerpo)
      replaceContent("evolucionando_titulo", pageData.evolucionando_titulo)
      replaceContent("evolucionando_cuerpo", pageData.evolucionando_cuerpo)

      animate(bigContainers, observerBg)

      replaceContent("trabaja_titulo", pageData.trabaja_con_nosotros_titulo)
      replaceContent("trabaja_subtitulo", pageData.trabaja_con_nosotros_titulo)
    })
    getStaff().then((json) => {
      renderStaff(json.data, 0)
    })
    getBeneficios().then((json) => {
      renderBeneficios(json.data, json.data.length - 1)
    })
    getArticulosRelacionados().then((json) => {
      renderArticulosRelacionados(json.data)
    })
    break
  case "que-hacemos":
    getHeaders("que_hacemos", 1).then((data) => {
      renderHeaders(data.data)
    })
    getQueHacemos().then((json) => {
      const pageData = json.data
      replaceContent("bajada_principal", pageData.bajada_principal)
      replaceContent("expertise_titulo", pageData.expertise_titulo)
      replaceContent("clientes_titulo", pageData.clientes_titulo)
      replaceContent("clientes_bajada", pageData.clientes_bajada)
      replaceContent("partners_titulo", pageData.partners_titulo)
    })
    getQueHacemosItems().then((json) => {
      renderQueHacemosItems(json.data, 0)
    })
    getExpertise().then((json) => {
      renderExpertise(json.data, 0)
    })
    getClientes().then((json) => {
      renderClientes(json.data, 0)
    })
    getPartners().then((json) => {
      renderPartners(json.data, 0)
    })
    getCasos().then((json) => {
      renderCasos(json.data, 0)
    })
    break
  case "blog":
    getCategorias().then((data) => {
      renderCategorias(data.data.slice(0, 6), 0)
    })
    getArticulos().then((data) => {
      renderArticulosRecientes(data.data.slice(0, 5))
      renderArchivos(data.data)
      if (!segments[2]) {
        let headers = [{ tag: "<title>Blog | D2B</title>" }, { tag: '<meta name="title" content="Blog | D2B" />' }]
        renderHeaders(headers)
        if (window.location.search) {
          const search = window.location.search.substring(8)
          const filteredData = data.data.filter(
            (articulo) => articulo.titulo.includes(search) || articulo.cuerpo.includes(search)
          )
          renderArticulos(filteredData, 0)
          document.getElementById("search_input").value = search
        } else {
          renderArticulos(data.data, 0)
        }
      } else if (segments[2].includes("archivo")) {
        let headers = [{ tag: "<title>Blog | D2B</title>" }, { tag: '<meta name="title" content="Blog | D2B" />' }]
        renderHeaders(headers)
        const fecha = segments[2].substr(-7)
        const filteredData = data.data.filter((articulo) => articulo.fecha_para_mostrar.includes(fecha))
        renderArticulos(filteredData, 0)
      } else {
        getSingleArticulo(segments[2]).then((articulo) => {
          if (!articulo) {
            let headers = [{ tag: "<title>Blog | D2B</title>" }, { tag: '<meta name="title" content="Blog | D2B" />' }]
            renderHeaders(headers)
            getArticulosPorCategoria(segments[2]).then((articulos) => {
              renderArticulos(articulos.data, 0)
            })
          } else {
            renderArticuloSingle(articulo)
            getHeaders("blog", articulo.id).then((data) => {
              if (data.data.length) {
                renderHeaders(data.data)
              } else {
                let headers = [
                  { tag: "<title>" + articulo.titulo + " | D2B</title>" },
                  {
                    tag: '<meta name="title" content="' + articulo.titulo + ' | D2B" />',
                  },
                ]
                if (articulo.extracto) {
                  headers.push({
                    tag: '<meta name="description" content="' + articulo.extracto + '" />',
                  })
                }

                renderHeaders(headers)
              }
            })
          }
        })
      }
    })
    break
  case "casos":
    getCasos().then((json) => {
      renderCasos(json.data, 0)
      const caso = json.data.filter((caso) => caso.url_segment == segments[2])[0]

      getHeaders("caso", caso.id).then((data) => {
        if (data.data.length) {
          renderHeaders(data.data)
        } else {
          let headers = [
            { tag: "<title>" + caso.titulo + " | D2B</title>" },
            {
              tag: '<meta name="title" content="' + caso.titulo + ' | D2B" />',
            },
            {
              tag: '<meta name="description" content="' + caso.bajada + '" />',
            },
          ]

          renderHeaders(headers)
        }
      })
      renderCasoSingle(caso)
    })
    break
  case "servicio":
    getExpertise().then((json) => {
      renderExpertiseNoDescription(json.data, 0)
      const expertise = json.data.filter((exp) => exp.url_segment == segments[2])[0]

      getHeaders("dev_expertise", expertise.id).then((data) => {
        if (data.data.length) {
          renderHeaders(data.data)
        } else {
          let headers = [
            { tag: "<title>" + expertise.titulo + " | D2B</title>" },
            {
              tag: '<meta name="title" content="' + expertise.titulo + ' | D2B" />',
            },
            {
              tag: '<meta name="description" content="' + expertise.subtitulo + '" />',
            },
          ]

          renderHeaders(headers)
        }
      })
      renderExpertiseSingle(expertise)
    })
    break
  case "trabaja-con-nosotros":
    let headers = [
      { tag: "<title>Trabaja Con Nosotros | D2B</title>" },
      { tag: '<meta name="title" content="Trabaja Con Nosotros | D2B" />' },
    ]

    renderHeaders(headers)
    getAreasDeInteres().then((json) => {
      renderAreasDeInteres(json.data, 0)
    })
    break
  case "contacto":
    let contactHeaders = [
      { tag: "<title>Contacto | D2B</title>" },
      { tag: '<meta name="title" content="Contacto | D2B" />' },
    ]
    renderHeaders(contactHeaders)
    break
  default:
    let defaultHeaders = [{ tag: "<title>Home | D2B</title>" }, { tag: '<meta name="title" content="Home | D2B" />' }]
    renderHeaders(defaultHeaders)
}
