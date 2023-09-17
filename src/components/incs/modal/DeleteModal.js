// DeleteModal.js

import React from "react";

function DeleteModal({ show, onHide, onDelete }) {
    return (
        <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" role="dialog">

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/* Contenu de la fenêtre modale */}
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation de suppression</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        Êtes-vous sûr de vouloir supprimer cet élément ?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onHide}
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                onDelete();
                                onHide();
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
