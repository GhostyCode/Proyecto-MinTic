import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
function Ventas() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
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
                <h2 className="headertekst text-light">Ventas</h2>
                <div className="row">
                    <div className="col-6 container-fluid">
                    <div class="col-6 input-group mb-3">
                        <input type="text" className="form-control"/>
                        <button className="btn btn-outline-danger" type="button">Buscar</button>
                      </div>
                        <div className="list-group list-group-checkable ">
                          
                            <label className="bg-dark text-light list-group-item py-3 " for="listGroupCheckableRadios1">
                                First radio
                                <span className="d-block small opacity-50">With support text underneath to add more
                                    detail</span>
                            </label>

                           
                            <label className="bg-dark text-light list-group-item py-3" for="listGroupCheckableRadios2">
                                Second radio
                                <span className="d-block small opacity-50">Some other text goes here</span>
                            </label>

                         
                            <label className="bg-dark text-light list-group-item py-3" for="listGroupCheckableRadios3">
                                Third radio
                                <span className="d-block small opacity-50">And we end with another snippet of text</span>
                            </label>

                            
                            <label className="bg-dark text-light list-group-item py-3" for="listGroupCheckableRadios4">
                                Fourth disabled radio
                                <span className="d-block small opacity-50">This option is disabled</span>
                            </label>
                        </div>

                    </div>
                    <div className="col-6 container-fluid">
                        <div className="container-fluid">
                            <h4 className="text-light">Productos en Venta</h4>
                            <div className="d-flex gap-5 justify-content-center">
                                <div className="list-group mx-0">
                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                       
                                        <span>
                                            First checkbox
                                            <small className="d-block text-muted">With support text underneath to add more
                                                detail</small>
                                        </span>
                                    </label>
                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                       
                                        <span>
                                            Second checkbox
                                            <small className="d-block text-muted">Some other text goes here</small>
                                        </span>
                                    </label>
                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                    
                                        <span>
                                            Third checkbox
                                            <small className="d-block text-muted">And we end with another snippet of
                                                text</small>
                                        </span>
                                    </label>
                                </div>

                                <div className="bg-dark text-light list-group mx-0">
                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                        <button className="btn btn-outline-danger reduceInput">+</button>
                                        <button className="btn btn-outline-danger reduceInput">-</button>
                                        <input type="number" className="reduceInput form-control"/>
                                    </label>

                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                        <button className="btn btn-outline-danger reduceInput">+</button>
                                        <button className="btn btn-outline-danger reduceInput">-</button>
                                        <input type="number" className="reduceInput form-control"/>
                                    </label>
                                    <label className="bg-dark text-light list-group-item d-flex gap-2">
                                        <button className="btn btn-outline-danger reduceInput">+</button>
                                        <button className="btn btn-outline-danger reduceInput">-</button>
                                        <input type="number" className="reduceInput form-control"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="headertekst">
                            <h4>Datos del Cliente</h4>
                            <label for="">Nombre:</label>
                            <label for=""></label><br/>
                            <label for="">Documento:</label>
                            <label for=""></label>
                            <hr/>
                            <h4 className="headertekst">Total</h4>
                            <div class="col-6 input-group mb-3">
                              <input type="number" className="form-control"/>
                              <button type="button" class="btn btn-outline-danger">Ver resumen</button>
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