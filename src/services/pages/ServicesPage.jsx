import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/auth/authContext"
import { FirebaseDB } from "../../firebase/config"
import { nanoid } from 'nanoid'

const categories = [
  {
    'nombre': 'Mantenimiento inmuebles',
    'articulos': ['Baños', 'Cielo raso', 'Eléctrico', 'Pared', 'Puerta']
  },
  {
    'nombre': 'Mantenimiento muebles',
    'articulos': ['Aire acondicionado', 'Archivador', 'Puesto de trabajo', 'Silla']
  },
  {
    'nombre': 'Servicios',
    'articulos': ['Aseo', 'Transporte', 'Vigilancia']
  }
]

export const ServicesPage = () => {

  const { state } = useContext(AuthContext)
  const [editionMode, setEditionMode] = useState(false)
  const [category, setCategoria] = useState(-1)
  const [tipeService, setTipeService] = useState('')
  const [service, setService] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [arrayData, setArrayData] = useState([])
  const [idReq, setIdReq] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const collectionRef = collection(FirebaseDB, `/requerimientos`)
        const docs = await getDocs(collectionRef)
        const requerimientos = []
        docs.forEach(doc => {
          requerimientos.push({ id: doc.id, ...doc.data() })
        })
        filtro(requerimientos)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])

  const filtro = (arrayNoFiltrado) => {
    const arrayFiltrado = arrayNoFiltrado.filter(req => req.uid === state.uid)
    setArrayData(arrayFiltrado)
  }

  useEffect(() => {
    setCategoria(-1)
    setTipeService('')
    setService('')
    setDescription('')
    setDate('')
    setError(null)
  }, [editionMode])


  useEffect(() => {
    category > -1 &&
      setTipeService(categories[category].nombre)
  }, [category])

  useEffect(() => {
    category > -1 &&
      setService(categories[category].articulos[0])
  }, [tipeService])



  const onSelectTipeService = (e) => {
    setCategoria(e.target.value)
  }

  const onSelectService = (e) => {
    setService(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeDate = (e) => {
    setDate(e.target.value)
  }


  const crearRequirement = () => {

    if (category === -1) {
      setError('Escoja una categoría, por favor.')
      return
    }

    if (!description.trim()) {
      setError('Digite la descripción, por favor.')
      return
    }

    if (!date.trim()) {
      setError('Digite la fecha, por favor.')
      return
    }

    const { uid } = state
    
    const id_req = nanoid()

    const newReq = {
      id_req: id_req,
      uid: uid,
      type_service: tipeService,
      service: service,
      description: description,
      fecha: date,
    }

    setArrayData([newReq, ...arrayData])

    const docRef = doc(FirebaseDB, `/requerimientos/${id_req}`)
    setDoc(docRef, newReq)

    clear()

  }

  const clear = () => {
    setCategoria(-1)
    setTipeService('')
    setService('')
    setDescription('')
    setDate('')
    setError(null)
  }

  const deleteRequirement = (id_req) => {

    const docRef = doc(FirebaseDB, `/requerimientos/${id_req}`)
    deleteDoc(docRef)

    setArrayData(arrayData.filter(req => req.id_req !== id_req))

  }


  const editRequirement = (idReq) => {

    setEditionMode(true)
    setIdReq(idReq)

  }

  const editar = (idReq) => {

    if (category === -1) {
      setError('Escoja una categoría, por favor.')
      return
    }

    if (!description.trim()) {
      setError('Digite la descripción, por favor.')
      return
    }

    if (!date.trim()) {
      setError('Digite la fecha, por favor.')
      return
    }

    const { uid } = state

    const newReq = {
      id_req: idReq,
      uid: uid,
      type_service: tipeService,
      service: service,
      description: description,
      fecha: date
    }

    const docRef = doc(FirebaseDB, `/requerimientos/${idReq}`)
    updateDoc(docRef, newReq)

    const index = arrayData.findIndex(req => req.id_req === idReq)
    arrayData[index] = newReq

    setIdReq('')
    setEditionMode(false)
    clear()

  }

  const cancel = () => {

    setEditionMode(false)

  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-2 animate__animated animate__fadeInLeftBig">Hola, {state.displayName}!</h1>
        <div className="col-12 row">
          <div className="col-12 row">
            <h1 className="display-4 animate__animated animate__fadeIn">{editionMode ? 'Edita un requerimiento' : 'Crea un requerimiento'}</h1>
            <div className="col-4">
              <select className="form-select m-1" onChange={onSelectTipeService}>
                <option value={-1}>Seleccione una opcion</option>
                {
                  categories.map((item, i) => {

                    return (<option key={'categoria' + i} value={i}>{item.nombre}</option>)
                  })
                }
              </select>
              <select className="form-select m-1" onChange={onSelectService}>
                {
                  category > -1 &&
                  (
                    categories[category].articulos.map((item, i) => (
                      <option key={'category' + i} value={item}>{item}</option>
                    ))
                  )
                }
              </select>
            </div>
            <div className="col-4">
              <input onChange={onChangeDescription} className="form-control m-1" type="text" placeholder="Descripcion" value={description} />
              <input onChange={onChangeDate} className="form-control m-1" type="text" placeholder="Fecha" value={date} />
            </div>
            {
              editionMode ? <button onClick={() => { editar(idReq) }} className="btn btn-success m-1 col-1">Actualizar</button>
                : <button onClick={crearRequirement} className="btn btn-success m-1 col-1">Crear</button>
            }

            {
              editionMode ?
                <button onClick={cancel} className="btn btn-warning m-1 col-1">Cancelar</button>
                :
                <button onClick={clear} className="btn btn-warning m-1 col-1">Limpiar</button>
            }
            {
              error ?
              <div class="alert alert-danger col-3 m-3 animate__animated animate__flash" role="alert">
                {error}
              </div>
              :
              null
            }
          </div>


          <div className="col-12 row mt-3">
            <h1 className="display-4 animate__animated animate__fadeIn">Mis requerimientos</h1>
            {
              arrayData.map(req => (
                <div key={req.id_req} className="card col-5 m-3 animate__animated animate__pulse">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Tipo de servicio: {req.type_service}</li>
                    <li className="list-group-item">Servicio: {req.service}</li>
                    <li className="list-group-item">Descripcion: {req.description}</li>
                    <li className="list-group-item">Fecha: {req.fecha}</li>
                    <button onClick={() => editRequirement(req.id_req)} className={`btn btn-warning m-1  ${editionMode ? 'disabled' : null}`}>Editar</button>
                    <button onClick={() => deleteRequirement(req.id_req)} className={`btn btn-danger m-1  ${editionMode ? 'disabled' : null}`}>Eliminar</button>
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
