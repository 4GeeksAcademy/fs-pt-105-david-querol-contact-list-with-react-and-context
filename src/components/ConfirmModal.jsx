import React from "react"

export const ConfirmModal = ({show, onClose, onConfirm, contactName}) =>{

    if (!show) return false;

    return(
        <div
            className="modal fade show d-block"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-0 shadow">

                    <div className="modal-header border-0">
                        <h5 className="modal-title">{`¿Estás Seguro de borrar a ${contactName}?`}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        Esta acción no puede deshacerse.
                    </div>

                    <div className="modal-footer border-0">
                        <button className="btn btn-secondary rounded-0" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger rounded-0" onClick={onConfirm}>
                            Borrar
                        </button>
                    </div>

                </div>
            </div>
            
        </div>
    )
}