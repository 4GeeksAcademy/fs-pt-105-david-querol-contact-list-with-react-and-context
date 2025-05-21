// // Import necessary components from react-router-dom and other parts of the application.
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

import { FetchPostContact, FetchPutContact } from "../services/userfetch";

export const AddContact = () => {

  // GLOBAL REDUCER
  const { store, dispatch } = useGlobalReducer()

  // USE PARAMS AND USE NAVIGATE HOOKS
  const { id } = useParams();
  const navigate = useNavigate();

  //SET OBJECT CONTACTS ON THE STORE
  const { contacts } = store;

  //USE STATES
  // Object dafault with not editing contact. 
  const [contact, setContact] = useState({
    "name": "",
    "phone": "",
    "email": "",
    "address": ""
  });

  //Set the state edditing or creating.
  const [editingMode, setEditingMode] = useState(false);

  //Change contact state if we are modifying one element
  useEffect(() => {
    if (id && contacts.length > 0) {
      const contactId = contacts.find(c => c.id === parseInt(id));
      if (contactId) {
        setContact(contactId);
        setEditingMode(true);
      }
    }


  }, [id, contacts])

  //Put the changes of the form inputs on the contact useState.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }))
  }

  //send the changes of the form impots 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        const isUpdated = await FetchPutContact(id, contact);
        if (isUpdated) {
          dispatch({ type: "update_contact", payload: isUpdated })
          navigate("/");
        }
      } else {
        const isCreated = await FetchPostContact(contact);
        if (isCreated) {
          dispatch({ type: "new_contact", payload: isCreated });
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error al guardar datos en la api")
    }
  }

  return (
    <div className="bg-light pt-5" style={{ minHeight: `100vh` }}>
      <form className="row g-3 justify-content-center mx-2" onSubmit={handleSubmit}>
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-5">{!editingMode ? `Añade un nuevo contacto` : `Actualiza la información`}</h1>
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            className="form-control mb-4 rounded-0"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
          <label className="form-label">E-mail</label>
          <input
            type="text"
            className="form-control mb-4 rounded-0"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
          <label className="form-label">Número de teléfono</label>
          <input
            type="text"
            className="form-control mb-4 rounded-0"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control mb-4 rounded-0"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
          <div className="d-grid gap-2 pt-3">
            <button className="btn btn-success rounded-0" type="submit">{!editingMode ? "Guardar" : "Actualizar"}</button>
          </div>
          <Link to="/" className="text-success">{!editingMode ? "o volver a contactos sin guardar." : "o volver a contactos sin acutalizar."}</Link>
        </div>
      </form>
    </div>
  );
};
