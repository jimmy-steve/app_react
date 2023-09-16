import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AddProjectModal(props) {
    const [projectName, setProjectName] = useState('');

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = () => {
        const projectData = {
            nom: projectName,
        };

        const headers = {
            'API-TOKEN': localStorage.getItem('token'), // Récupérez le token depuis le stockage local
        };

        axios.post('https://de-lafontaine.ca/mealplanner/public/api/projects', projectData, { headers })
            .then((response) => {
                setProjectName(''); // Réinitialisez le nom du projet

                // Appelez la fonction pour masquer le modal
                props.onHide();

                // Appelez la fonction pour ajouter le nouveau projet à la liste
                props.onProjectAdded(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi des données:', error);
            });
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un nouveau projet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="projectName">
                        <Form.Label>Nom du projet</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Entrez le nom du projet"
                            value={projectName}
                            onChange={handleProjectNameChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddProjectModal;
