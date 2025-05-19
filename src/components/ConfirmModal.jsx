import React from "react"

export const ConfirmModal = ({show, onClose, onConfirm, contactName}) =>{

    if (!show) return false;

    return(
        <div
            className="modal fade show d-block"
            tabIndex="-1"
        >

            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{`¿Estás Seguro de borrar este contacto ${contactName}?`}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        Esta acción no puede deshacerse.
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={onConfirm}>
                            Borrar
                        </button>
                    </div>

                </div>
            </div>
            
        </div>
    )
}