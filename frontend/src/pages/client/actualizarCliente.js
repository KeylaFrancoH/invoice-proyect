import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActualizarCliente() {
  const { id } = useParams();
  const [values, setValues] = useState({
    RucDni: "",
    Nombre: "",
    Correo: "",
    Direccion: "",
    Activo: "1",
  });

  const [errors, setErrors] = useState({
    RucDni: "",
    Nombre: "",
    Correo: "",
    Direccion: "",
  });

  const validateInputs = () => {
    const newErrors = { ...errors };

    // Validar RucDni
    if (!values.RucDni || isNaN(values.RucDni) || values.RucDni.length !== 10) {
      newErrors.RucDni = "Debe ingresar un RUC o DNI válido de 10 dígitos";
    } else {
      newErrors.RucDni = "";
    }

    // Validar Nombre
    if (!values.Nombre) {
      newErrors.Nombre = "Debe ingresar un nombre";
    } else {
      newErrors.Nombre = "";
    }

    // Validar Correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.Correo || !correoRegex.test(values.Correo)) {
      newErrors.Correo = "Debe ingresar un correo electrónico válido";
    } else {
      newErrors.Correo = "";
    }

    // Validar Direccion
    if (!values.Direccion) {
      newErrors.Direccion = "Debe ingresar una dirección";
    } else {
      newErrors.Direccion = "";
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      const confirmCreation = window.confirm(
        "¿Está seguro de que desea modificar este usuario?"
      );
      if (confirmCreation) {
        axios
          .put("http://localhost:8081/clientes/"+id, values)
          .then((res) => {
            console.log(res);
            window.location.href = "/Clientes";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/clientes/" + id)  
      .then((res) => {
        const cliente = res.data;  
        setValues({
          ...values,
          RucDni: cliente.RucDni,
          Nombre: cliente.Nombre,
          Correo: cliente.Correo,
          Direccion: cliente.Direccion,
          Activo: cliente.Activo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center py-2 shadow-sm fs-2 fw-bold">
        ACTUALIZAR CLIENTES
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="RucDni">Cédula o RUC:</label>
            <input
              type="text"
              className={`form-control ${errors.RucDni && "is-invalid"}`}
              id="RucDni"
              placeholder="Numero de cedula"
              value={values.RucDni}
              onChange={(e) => setValues({ ...values, RucDni: e.target.value })}
            />
            {errors.RucDni && (
              <div className="invalid-feedback">{errors.RucDni}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Nombre">Nombre:</label>
            <input
              type="text"
              className={`form-control ${errors.Nombre && "is-invalid"}`}
              id="Nombre"
              placeholder="Nombre "
              value={values.Nombre}
              onChange={(e) => setValues({ ...values, Nombre: e.target.value })}
            />
            {errors.Nombre && (
              <div className="invalid-feedback">{errors.Nombre}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Correo">Correo:</label>
            <input
              type="email"
              className={`form-control ${errors.Correo && "is-invalid"}`}
              id="Correo"
              placeholder="Email"
              value={values.Correo}
              onChange={(e) => setValues({ ...values, Correo: e.target.value })}
            />
            {errors.Correo && (
              <div className="invalid-feedback">{errors.Correo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Direccion">Dirección:</label>
            <input
              type="text"
              className={`form-control ${errors.Direccion && "is-invalid"}`}
              id="Direccion"
              placeholder="Dirección"
              value={values.Direccion}
              onChange={(e) =>
                setValues({ ...values, Direccion: e.target.value })
              }
            />
            {errors.Direccion && (
              <div className="invalid-feedback">{errors.Direccion}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Activo">Activo:</label>
            <select
              className="form-control"
              id="Activo"
              value={values.Activo}
              onChange={(e) => setValues({ ...values, Activo: e.target.value })}
            >
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActualizarCliente;
