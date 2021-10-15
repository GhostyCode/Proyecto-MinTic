
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import {consultarDatabase,actualizarDocumentoDatabase } from "./firebase";
import editar from "./editar.png"
import "./GestionTabla.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { auth, db, logout } from "./firebase";



function GestionTabla() {




   const [usuarios, setUsuarios] = React.useState([]); 



  async function  postData()  {
    
    setUsuarios (await consultarDatabase('users'));
      
  };


  const [usuario, setUsuario] = React.useState({
    id: '',
    email: '',
    estado: '',
    rol: ''
  });



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
        return us.id === idBuscada
    }))

    setIdBuscada('')

  }

  const handleEstado = (e) => {
    setIdCambiada(usuario.id)
    
    setUsuario(
      {
        id: usuario.id,
        email: usuario.email,
        estado: e.target.value,
        rol: usuario.rol,
      }
    )
  }

  const handleRol = (e) => {
    setIdCambiada(usuario.id)
    setUsuario(
      {
        id: usuario.id,
        email: usuario.email,
        estado: usuario.estado,
        rol: e.target.value,
      }
    )
  }

  const handleEdicionUsuario = async (e) => {
    e.preventDefault();
   
    const listaTemporal = usuarios.map((item) => {
      
        
        return item.id === idCambiada ? usuario : item
       
    })

    let data=listaTemporal.find((item)=>{
      return item.id === idCambiada
    })

    actualizarDocumentoDatabase("users",usuario.id,data);
    setUsuarios(listaTemporal)
  }

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [rol,setRol] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      setRol(data.rol)
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) return history.replace("/");
    fetchUserName();
    console.log(rol);
    if(rol==="Vendedor") return history.replace("/");
    postData()
  }, [user,loading, history,name,rol]);







  return (
    <>
      <div><NavBar /></div>
      <div className="row">
        <NavBarLateral />
        <div className="col-md-6 col-sm-10">
          <div ClassName="">
            <form ClassName="" onSubmit={handleBotonBuscador}>
              <br/>
              <br/>
              <h4 className="headertekst text-light">Buscar Usuario</h4>
              <div class="buscar-group input-group mb-6 " >
                <input className="" type="text" placeholder="Busqueda por ID" onChange={handleBuscador} value={idBuscada}/>
                <button className="btn btn-dark btn-outline-secondary ml-3">Buscar</button>
              </div>
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
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.email}</td>
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
          <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.id} disabled />
          <label className="text-light d-flex mt-2 mb-2">Correo</label>
          <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.email} disabled />
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
