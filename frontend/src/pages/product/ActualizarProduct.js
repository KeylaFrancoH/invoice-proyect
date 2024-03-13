import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function ActualizarProduct() {
  const { id } = useParams();
  const [values, setValues] = useState({
    Codigo: "",
    Nombre: "",
    Precio: "",
    Stock: "",
    Activo: true,
  });

  const [errors, setErrors] = useState({
    Codigo: "",
    Nombre: "",
    Precio: "",
    Stock: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    const newErrors = { ...errors };

    // Validar Codigo
    if (!values.Codigo || values.Codigo.length > 15) {
      newErrors.Codigo = "El código debe tener máximo 15 caracteres.";
    } else {
      newErrors.Codigo = "";
    }

    // Validar Nombre
    if (!values.Nombre) {
      newErrors.Nombre = "Debe ingresar un nombre.";
    } else {
      newErrors.Nombre = "";
    }

    // Validar Precio
    if (
      !values.Precio ||
      isNaN(values.Precio) ||
      parseFloat(values.Precio) <= 0
    ) {
      newErrors.Precio = "Debe ingresar un precio válido.";
    } else {
      newErrors.Precio = "";
    }

    // Validar Stock
    if (
      !values.Stock ||
      isNaN(values.Stock) ||
      parseInt(values.Stock) < 0 ||
      !Number.isInteger(parseFloat(values.Stock))
    ) {
      newErrors.Stock = "Debe ingresar un valor entero positivo para el stock.";
    } else {
      newErrors.Stock = "";
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      const activo = parseInt(values.Stock) > 0;
      setValues({ ...values, Activo: activo });
      
      const confirmCreation = window.confirm(
        "¿Está seguro de que desea continuar con la creación del producto?"
      );
      if (confirmCreation) {
        axios
          .put("http://localhost:8081/productos/" + id, values)
          .then((res) => {
            console.log(res);
            window.location.href = "/Productos";
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) {
              setErrorMessage(err.response.data.message);
            } else {
              console.log(err);
            }
          });
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/productos/" + id)
      .then((res) => {
        const producto = res.data;
        const activo = parseInt(producto.Stock) > 0;
        setValues({
          ...values,
          Codigo: producto.Codigo,
          Nombre: producto.Nombre,
          Precio: producto.Precio,
          Stock: producto.Stock,
          Activo: activo, 
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center py-2 shadow-sm fs-2 fw-bold">
        ACTUALIZAR PRODUCTOS
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="alert alert-danger mb-3" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="Codigo">Código del producto:</label>
            <input
              type="text"
              className={`form-control ${errors.Codigo && "is-invalid"}`}
              id="Codigo"
              placeholder="Código del producto"
              value={values.Codigo}
              onChange={(e) => setValues({ ...values, Codigo: e.target.value })}
            />
            {errors.Codigo && (
              <div className="invalid-feedback">{errors.Codigo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Nombre">Nombre:</label>
            <input
              type="text"
              className={`form-control ${errors.Nombre && "is-invalid"}`}
              id="Nombre"
              placeholder="Nombre"
              value={values.Nombre}
              onChange={(e) => setValues({ ...values, Nombre: e.target.value })}
            />
            {errors.Nombre && (
              <div className="invalid-feedback">{errors.Nombre}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Precio">Precio:</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.Precio && "is-invalid"}`}
              id="Precio"
              placeholder="Precio"
              value={values.Precio}
              onChange={(e) => setValues({ ...values, Precio: e.target.value })}
            />
            {errors.Precio && (
              <div className="invalid-feedback">{errors.Precio}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Stock">Stock:</label>
            <input
              type="number"
              className={`form-control ${errors.Stock && "is-invalid"}`}
              id="Stock"
              placeholder="Stock"
              value={values.Stock}
              onChange={(e) => setValues({ ...values, Stock: e.target.value })}
            />
            {errors.Stock && (
              <div className="invalid-feedback">{errors.Stock}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="Activo">Activo:</label>
            <select
              className="form-control"
              id="Activo"
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

export default ActualizarProduct;
