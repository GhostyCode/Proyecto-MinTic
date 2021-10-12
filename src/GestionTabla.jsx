import React, { useEffect } from 'react'
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import './GestionTabla.css';
import editar from "./editar.png"

function GestionTabla() {

  const [usuarios, setUsuarios] = React.useState([

    { identificacion: '0001', correo: 'user1@gmail.com', estado: 'Pendiente', rol: 'Vendedor' },
    { identificacion: '0002', correo: 'user2@gmail.com', estado: 'Pendiente', rol: 'Vendedor' },
    { identificacion: '0003', correo: 'user3@gmail.com', estado: 'Autorizado', rol: 'Administrador' },
    { identificacion: '0004', correo: 'user4@gmail.com', estado: 'Pendiente', rol: 'Vendedor' },
    { identificacion: '0005', correo: 'user5@gmail.com', estado: 'Pendiente', rol: 'Vendedor' },
    { identificacion: '0006', correo: 'user6@gmail.com', estado: 'Autorizado', rol: 'Administrador' },
    { identificacion: '0007', correo: 'user7@gmail.com', estado: 'No autorizado', rol: 'Vendedor' },
    { identificacion: '0008', correo: 'user8@gmail.com', estado: 'Autorizado', rol: 'Vendedor' },
    { identificacion: '0009', correo: 'user9@gmail.com', estado: 'No autorizado', rol: 'Vendedor' },
    { identificacion: '00010', correo: 'user10@gmail.com', estado: 'Autorizado', rol: 'Administrador' },
    { identificacion: '00011', correo: 'user11@gmail.com', estado: 'No Autorizado', rol: 'Vendedor' },
    { identificacion: '00012', correo: 'user12@gmail.com', estado: 'Autorizado', rol: 'Vendedor' },
  ]);

  const [usuario, setUsuario] = React.useState({
    identificacion: '',
    correo: '',
    estado: '',
    rol: ''
  });

  // const urlUsuarios = 'https://us-central1-misiontic-d982c.cloudfunctions.net/getUsers'

  // const fetchApi = async () => {
  //   const res = await fetch(urlUsuarios)
  //   console.log(res.type)
  // }

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  const [idCambiada, setIdCambiada] = React.useState('');
  const [idBuscada, setIdBuscada] = React.useState('');

  //  const [listaUsuarios, setListaUsuarios] = React.useState([]);

  // setListaUsuarios(usuarios); 

  const handleBuscador = (e) =>{
    setIdBuscada(e.target.value)
  }

  const handleBotonBuscador = (e) =>{
    e.preventDefault()

    if(!idBuscada.trim())
      return
    
    setUsuario(usuarios.find(us=>{
        return us.identificacion === idBuscada
    }))

    setIdBuscada('')

  }

  const handleEstado = (e) => {
    setIdCambiada(usuario.identificacion)
    setUsuario(
      {
        identificacion: usuario.identificacion,
        correo: usuario.correo,
        estado: e.target.value,
        rol: usuario.rol,
      }
    )
  }

  const handleRol = (e) => {
    setIdCambiada(usuario.identificacion)
    setUsuario(
      {
        identificacion: usuario.identificacion,
        correo: usuario.correo,
        estado: usuario.estado,
        rol: e.target.value,
      }
    )
  }

  const handleEdicionUsuario = (e) => {
    e.preventDefault();

    const listaTemporal = usuarios.map((item) => {
      return item.identificacion === idCambiada ? usuario : item
    })

    setUsuarios(listaTemporal)
  }

  return (
    <>
      <div><NavBar /></div>
      <div className="row">
        <NavBarLateral />
        <div className="col-md-6 col-sm-10">
          <div ClassName="">
            <form ClassName="" onSubmit={handleBotonBuscador}>
              <h4 className="text-light">Buscar Usuario</h4>
              <input className="" type="text" placeholder="Busqueda por ID" onChange={handleBuscador} value={idBuscada}/>
              <button className="btn btn-dark btn-outline-secondary ml-3">Buscar</button>
            </form>
          </div>
          <div className="container mt-4">
            <table className="table table-striped table-dark table-responsive">

              <thead className="thead-dark">
                <tr>
                  <th scope="col">Identificación</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((u) => (
                    <tr>
                      <td>{u.identificacion}</td>
                      <td>{u.correo}</td>
                      <td>{u.estado}</td>
                      <td>{u.rol}</td>
                      <td>
                        <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal"
                          onClick={() => { setUsuario(u) }}
                        >
                          <img className="iconoEditarUsuario" src={editar} alt="editar" />
                        </button>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 bg-dark container mt-2">
          <label className="text-light d-flex mt-4 mb-2">Identificacion</label>
          <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.identificacion} disabled />
          <label className="text-light d-flex mt-2 mb-2">Correo</label>
          <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.correo} disabled />
          <form>
            <select className="custom-select mt-3" onChange={handleEstado}>
              <option selected hidden>{usuario.estado}</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Autorizado">Autorizado</option>
              <option value="No autorizado">No autorizado</option>
            </select>
            <select className="custom-select mt-3" onChange={handleRol}>
              <option selected hidden>{usuario.rol}</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Administrador">Administrador</option>
            </select>
            <div className="mt-3 mb-3">
              <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion" data-toggle="modal" data-target="#guardarEdicion"
                onClick={handleEdicionUsuario}
              >Guardar
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="modal fade" id="guardarEdicion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Cambios realizados con éxito</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="close btn-dark" data-dismiss="modal"
                aria-label="Close">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default GestionTabla
