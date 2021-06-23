import React from 'react';

import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, CardLink, Button,
    ModalBody, ModalHeader, ModalFooter, Col, FormGroup, Input, Form
} from 'reactstrap';
import './SaveEvents.css';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import MessageBox from "../MessageBox/MessageBox";
import Cookies from 'js-cookie'
import notifications from "../../helpers";

class EditEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleEventEditSubmit = this.handleEventEditSubmit.bind(this);
    }

    handleEventEditSubmit(e)    {
        e.preventDefault();

        fetch('http://localhost:3000/updateEvent', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                event_id: this.props.editedEvent.eventid,
                denumire: document.getElementById('edit_denumire').value,
                data: document.getElementById('edit_data_ev').value,
                durata: document.getElementById('edit_durata_ev').value,
                coperta: document.getElementById('edit_coperta').value,
                descriere: document.getElementById('edit_descriere').value,
                nr_loc: document.getElementById('edit_nr_locuri').value,
                locatie: document.getElementById('edit_locatie').value,
            })
        })
            .then(response => {
                if (response.status == 200) {
                    this.props.participantsList.forEach((participant) => {
                        notifications.sendMailNotification(
                            participant.email,
                            "Modificare eveniment",
                            `Salutare ${participant.name}, evenimentul ${document.getElementById('edit_denumire').value} a suferit o modificare. Te rugam sa verifici informatiile actualizate!`
                        )
                    });

                    alert("Evenimentul a fost updatat cu succes");
                    window.location.reload();
                }
                else    {
                    alert("A intervenit o eroare. Va rugam incercati din nou!");
                }
            })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleEventEditSubmit}>
                    <Row>
                        <Col className="pr-md-1" md={this.props.colSize}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label htmlFor="edit_denumire">Denumire</label>
                                        <Input type="text" name="edit_denumire" id="edit_denumire" defaultValue={this.props.editedEvent.denumire}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label htmlFor="edit_data_ev">Data eveniment</label>
                                        <Input type="text" name="edit_data_ev" id="edit_data_ev" defaultValue={this.props.editedEvent.data_ev}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <label htmlFor="edit_durata_ev">Durata Eveniment</label>
                                        <Input type="number" name="edit_durata_ev" id="edit_durata_ev" defaultValue={this.props.editedEvent.durata_ev}/>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <label htmlFor="edit_coperta">Coperta</label>
                                        <Input type="text" name="edit_coperta" id="edit_coperta" defaultValue={this.props.editedEvent.coperta}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <label htmlFor="edit_descriere">Descriere</label>
                                        <Input type="text" name="edit_descriere" id="edit_descriere" defaultValue={this.props.editedEvent.descriere}/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label htmlFor="edit_nr_locuri">Numar locuri</label>
                                        <Input type="number" name="edit_nr_locuri" id="edit_nr_locuri" defaultValue={this.props.editedEvent.nr_locuri}/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <label htmlFor="edit_locatie">Locatie</label>
                                        <Input type="text" name="edit_locatie" id="edit_locatie" defaultValue={this.props.editedEvent.locatie}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-md-1" md="3">
                            <FormGroup>
                                <label></label>
                                <Button className="btn-fill" color="primary" type="submit">
                                    Editeaza eveniment
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>

                </Form>
            </div>
        );

    }
}

export default EditEventForm;
