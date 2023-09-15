import React from 'react';
import {Modal, Button} from 'react-bootstrap';


function AddProjectModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Êtes-vous sûr de vouloir supprimer cet élément ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={props.onDelete}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProjectModal;