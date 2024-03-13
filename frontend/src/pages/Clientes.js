import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CrearCliente from "./client/crearCliente";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/clientes")
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = clientes.filter(
    (cliente) =>
      cliente.Nombre &&
      cliente.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?"
    );
  
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/clientes/${id}`)
        .then((res) => window.location.reload())
        .catch((err) => {
          if (err.response && err.response.status === 500) {
            alert("No se puede eliminar este cliente porque está asociado a una factura.");
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="clientes">
      <div className="d-flex justify-content-center py-2 shadow-sm fs-2 fw-bold">
        CLIENTES
      </div>
      <div className="container mt-5">
        <div className="table-responsive">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div
              className="input-group rounded me-2"
              style={{ maxWidth: "1000px" }}
            >
              <input
                type="search"
                className="form-control rounded"
                placeholder="Buscar cliente..."
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={handleSearch}
              />
            </div>
            <Button variant="primary" onClick={handleShow}>
              Crear Cliente
            </Button>
          </div>

          <CrearCliente show={showModal} handleClose={handleClose} />

          {clientes.length !== 0 ? (
            <table className="table table-striped table-bordered rounded">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">RucDni</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Activo</th>
                  <th scope="col">Fecha Creación</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cliente, index) => (
                  <tr key={cliente.idCliente}>
                    <th scope="row">{index + 1}</th>
                    <td>{cliente.Nombre}</td>
                    <td>{cliente.RucDni}</td>
                    <td>{cliente.Direccion}</td>
                    <td>{cliente.Correo}</td>
                    <td>{cliente.Activo ? "Activo" : "Inactivo"}</td>
                    <td>{cliente.FechaCreacion}</td>
                    <td>
                      <Link
                        to={`/Clientes/Actualizar/${cliente.idCliente}`}
                        type="button"
                        className="btn btn-info btn-sm me-2"
                      >
                        Modificar
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(cliente.idCliente)}
                        className="btn btn-danger btn-sm"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-danger" role="alert">
              No se encontraron clientes para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Clientes;
