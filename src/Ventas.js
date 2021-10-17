import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import {consultarDatabase,actualizarDocumentoDatabase } from "./firebase";
function Ventas() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [productos, setProdutos] = useState([]);

  async function  postData()  {
    
    setProdutos (await consultarDatabase('products'));
      
  };
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
     
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading){
      return;
    } 
    if (!user) return history.replace("/");
    fetchUserName();
    postData();
  }, [user, loading,history]);
  return (
     <><div>
      <NavBar />
    </div>
    <div class="container-fluid">
        <div class="row">
          <NavBarLateral/>
          <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="text-light">Vender</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                    </div>
                </div>
                <h2 className="headertekst-ventas text-light">Buscar Ventas</h2>
                <div className="row">
                    <div className="col-6 container-fluid">
                    <div class="col-6 input-group mb-3">
                        <input type="text" className="form-control"/>
                        <button className="btn btn-outline-danger" type="button">Buscar</button>
                      </div>
                        <div className="list-group list-group-checkable ">
                          
                        <div class="card border-danger bg-dark  mb-3">
                        <div class="card-header text-light">Header</div>
                        <div class="card-body text-light">
                            <h5 class="card-title">Danger card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </div>

                           
                           
                        </div>

                    </div>
                    <div className="col-6 container-fluid">
                        <div className="container-fluid">

                            <h4 className="text-light" id="titulo-prod" >Productos en Venta</h4>
                            {

                                productos.map((u) => (
                                <div className="card-group d-flex gap-2 justify-content-center">
                                
                                    <div class="card border-danger bg-dark  mb-3">                    
                                        <div class="card-body text-light">
                                            <h5 class="card-title">{u.nombre}</h5>
                                            <p>{u.descripcion}</p>
                                        
                                        </div>
                                
                                    
                                    </div>

                                    <div className="bg-dark text-light list-group mx-0">
                                    <div class="card border-danger bg-dark  mb-3">                    
                                        <div class="card-body text-light bg-dark  d-flex gap-2">
                                        <button className="btn btn-outline-danger reduceInput">+</button>
                                            <button className="btn btn-outline-danger reduceInput">-</button>
                                            <input type="number" className="reduceInput form-control"/>
                                        </div>
                                    
                                    </div>
                                    
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                        <hr/>
                        <div className="headertekst">
                            <h4 className="text-light">Datos del Cliente</h4>
                            <label className="text-light" for="">Nombre:</label>
                            <input type="text" className="reduceInput form-control"/>
                            <label for=""></label>
                            <label className="text-light" for="">Documento:</label><br/>
                            <input type="number" className="reduceInput form-control"/>
                            <label className="text-light" for="">Telefono:</label>
                            <input type="number" className="reduceInput form-control"/>
                            
                            <hr/>
                            <h4 className="text-light">Total</h4>
                            <div class="col-6 input-group mb-3">
                              <input type="number" className="form-control"/>
                              <button type="button" className="btn btn-outline-danger">Ver resumen</button>
                            </div>
                        </div>

                    </div>
                </div>
            
          </main>
        </div>
     </div>
   </>
  );
}
export default Ventas;