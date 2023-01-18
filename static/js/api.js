const BASE_API = 'https://admin.d2b.cl/d2badmin/'
const BASE_URL = 'https://d2b.cl/'

const getQuienesSomos = () => {
  return getSinglePageData('quienes_somos')
}

const getCasos = () => {
  return getAll('caso')
}

const getArticulos = () => {
  return getAll('blog')
}

const getCategorias = () => {
  return getAll('category')
}

const getAreasDeInteres = () => {
  return getAll('contacto_areas_de_interes')
}

const getNuestraExpertise = (id) => {
  return getRelatedSorted('nuestra_dev_expertise', 'dev_expertise_id', id)
}

const getHeaders = (collection, id) => {
  return getRelated(collection + '_headers', collection + '_id', id).then((data) => {
    let idsFilter = ''
    data.data.forEach((item) => {
      idsFilter += item.headers_id + ','
    })
    return getFilter('headers', '[id][in]=' + idsFilter)
  })
}

const getArticulosPorCategoria = (slug) => {
  return getSingleCategoria(slug).then((categoria) => {
    return getRelated('blog_category', 'category_id', categoria.id).then((data) => {
      let idsFilter = ''
      data.data.forEach((item) => {
        idsFilter += item.blog_id + ','
      })
      return getFilter('blog', '[id][in]=' + idsFilter)
    })
  })
}

const getRelatedCategorias = (id) => {
  return getRelated('blog_category', 'blog_id', id).then((data) => {
    let idsFilter = ''
    data.data.forEach((item) => {
      idsFilter += item.category_id + ','
    })
    return getFilter('category', '[id][in]=' + idsFilter)
  })
}

const getRelatedResultados = (id) => {
  return getRelated('caso_resultados_casos', 'caso_id', id).then((data) => {
    let idsFilter = ''
    data.data.forEach((item) => {
      idsFilter += item.resultados_casos_id + ','
    })
    return getFilter('resultados_casos', '[id][in]=' + idsFilter)
  })
}

const getQueHacemos = () => {
  return getSinglePageData('que_hacemos')
}

const getQueHacemosItems = () => {
  return getRelatedSorted('que_hacemos_items', 'que_hacemos_rel', 1)
}

const getStaff = () => {
  return getRelatedSorted('staff', 'quienes_somos', 1)
}

const getBeneficios = () => {
  return getRelatedSorted('beneficios', 'quienes_somos', 1)
}

const getExpertise = () => {
  return getRelatedSorted('dev_expertise', 'que_hacemos_relation', 1)
}

const getArticulosRelacionados = () => {
  return getRelated('quienes_somos_blog', 'quienes_somos_id', 1)
}

const getSingleArticulo = (slug) => {
  return getFilter('blog', '[url_segment]=' + slug).then((data) => {
    return data.data[0]
  })
}

const getSingleCategoria = (slug) => {
  return getFilter('category', '[url_segment]=' + slug).then((data) => {
    return data.data[0]
  })
}

const getClientes = () => {
  return getRelated('que_hacemos_directus_files', 'que_hacemos_id', 1)
}

const getPartners = () => {
  return getRelated('partners_que_hacemos_directus_files', 'que_hacemos_id', 1)
}

const getSinglePageData = (collection) => {
  return doFetch('items/' + collection + '/1')
}

const getSingleItem = (collection, id) => {
  return doFetch('items/' + collection + '/' + id)
}

const getAll = (collection) => {
  return doFetch('items/' + collection)
}

const getImage = (id) => {
  return doFetch('files/' + id).then((json) => {
    return json.data.data.full_url
  })
}

const getRelated = (collection, relationship_field, id) => {
  return doFetch('items/' + collection + '?filter[' + relationship_field + ']=' + id)
}

const getFilter = (collection, filter) => {
  return doFetch('items/' + collection + '?filter' + filter)
}

const getRelatedSorted = (collection, relationship_field, id) => {
  return doFetch('items/' + collection + '?sort=sort&filter[' + relationship_field + ']=' + id)
}

const doFetch = (endpoint) => {
  return fetch(BASE_API + endpoint).then((res) => res.json())
}
