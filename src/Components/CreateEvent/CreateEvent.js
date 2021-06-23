import React from 'react';
import {Button, Form} from 'react-bootstrap';
import './CreateEvent.css';
import Cookies from 'js-cookie'
import Select from "react-select";
import {Col, Row} from "reactstrap";

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            denumire: '',
            data: '',
            durata: 0,
            tip_eveniment: '',
            tematica: '',
            coperta: '',
            descriere: '',
            nr_loc: 0,
            locatie: ''
        };

        this.openCreateEventForm = this.openCreateEventForm.bind(this);
    }

    onDenumireChange = (event) => {
        this.setState({denumire: event.target.value});
        // console.log(this.state);
    };

    onDataChange = (event) => {
        this.setState({data: event.target.value});
        // console.log(this.state);
    };

    onDurataChange = (event) => {
        this.setState({durata: event.target.value});
        // console.log(this.state);
    };

    onTipChange = (event) => {
        this.setState({tip_eveniment: event.target.value});
        // console.log(this.state);
    };

    onTemaChange = (event) => {
        this.setState({tematica: event.target.value});
        // console.log(this.state);
    };

    onCopertaChange = (event) => {
        this.setState({coperta: event.target.value});
        // console.log(this.state);
    };

    onDescriereChange = (event) => {
        this.setState({descriere: event.target.value});
        // console.log(this.state);
    };

    onNumarLocChange = (event) => {
        this.setState({nr_loc: event.target.value});
        // console.log(this.state);
    };

    onLocatieChange = (event) => {
        this.setState({locatie: event.target.value});
        // console.log(this.state);
    };

    onJudetChange = (event) => {
        this.setState({
            judet: event.value
        });
    }

    openCreateEventForm(event) {
        document.getElementById('createEventForm').style.display = "table-cell";
    }

    onSubmitEvent = (event) => {
        event.preventDefault();
        console.log(this.state);
        fetch('http://localhost:3000/events', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: Cookies.get('userId'),
                denumire: this.state.denumire,
                data: this.state.data,
                durata: this.state.durata,
                tip_eveniment: this.state.tip_eveniment,
                tematica: this.state.tematica,
                coperta: this.state.coperta,
                descriere: this.state.descriere,
                nr_loc: this.state.nr_loc,
                locatie: this.state.locatie,
                judet: this.state.judet,
            })
        })
            .then(response => {
                console.log(response);
            })

    };


    render() {
        return (
            <div>
                <Button variant="outline-info" onClick={
                    (e) => this.openCreateEventForm(e)}>Creeaza eveniment</Button>
                <br/>
                <br/>
                <Row>
                    <Col className={'col-md-6 offset-md-5'}>
                        <form id="createEventForm" style={{display: "none"}}>
                            <div className="">
                                <Form.Group style={{display: "center"}}>
                                    <p>Titlu:</p>
                                    <Form.Control type="text" name="denumire" id="denumire" placeholder="Denumire eveniment"
                                                  onChange={this.onDenumireChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Data evenimentului:</p>
                                    <Form.Control type="text" name="data" id="data" placeholder="AAAA-LL-ZZ"
                                                  style={{display: "flex"}} onChange={this.onDataChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Durata evenimentului:</p>
                                    <Form.Control type="number" name="durata" id="durata" placeholder="Numarul de zile"
                                                  style={{display: "block"}} onChange={this.onDurataChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Tipul evenimentului:</p>
                                    <Form.Control type="text" name="tip_eveniment" id="tip_eveniment"
                                                  placeholder="Ex: Seara de film" style={{display: "block"}}
                                                  onChange={this.onTipChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Tematica evenimentului:</p>
                                    <Form.Control type="text" name="tematica" id="tematica" placeholder="Ex: Anii 90'"
                                                  style={{display: "block"}} onChange={this.onTemaChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Coperta evenimentului:</p>
                                    <Form.Control type="text" name="coperta" id="coperta" placeholder="Image address"
                                                  onChange={this.onCopertaChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Descrierea evenimentului:</p>
                                    <Form.Control type="text" style={{padding: "50px 1px"}} name="descriere" id="descriere"
                                                  placeholder="Maxim 250 de caractere" onChange={this.onDescriereChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Numarul de locuri:</p>
                                    <Form.Control type="number" name="nr_loc" id="nr_loc" placeholder="Numar participanti"
                                                  style={{display: "block"}} onChange={this.onNumarLocChange}/>
                                    <br/>
                                    <p style={{display: "block"}}>Locatia evenimentului:</p>
                                    <Form.Control type="text" name="locatie" id="locatie" placeholder="Orasul"
                                                  style={{display: "block"}} onChange={this.onLocatieChange}/>

                                    <br/>
                                    <p style={{display: "block"}}>Judetul evenimentului:</p>
                                    <Select options={Cookies.get('counties_options') ? JSON.parse(Cookies.get('counties_options')) : []} onChange={this.onJudetChange}/>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    onClick={this.onSubmitEvent}
                                    type="submit"

                                    style={{display: "center"}}
                                >Trimite</Button>

                            </div>
                        </form>
                    </Col>
                </Row>

            </div>
        );

    }
}

export default CreateEvent;
