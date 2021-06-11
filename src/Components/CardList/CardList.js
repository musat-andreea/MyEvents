import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, Button, CardLink,
    ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import SearchEvent from "../SearchEvent/SearchEvent";

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eventsList: [],
        };

        this.toggle = this.toggle.bind(this);
        this.handleLocationSearchChange = this.handleLocationSearchChange.bind(this);
        this.handleDenumireSearchChange = this.handleDenumireSearchChange.bind(this);
        this.handleMultiFilter = this.handleMultiFilter.bind(this);
    }

    handleDenumireSearchChange(event)   {

        axios.get(`http://localhost:3000/getEvents?denumire=${event.target.value}`)
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })
    }

    handleLocationSearchChange(event)   {

        axios.get(`http://localhost:3000/getEvents?locatie=${event.target.value}`)
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })
    }

    handleMultiFilter(event)   {
        axios.get(`http://localhost:3000/getEvents?locatie=${document.getElementById('locatie').value}&denumire=${document.getElementById('denumire').value}`)
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })
    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getEvents')
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })

    }

    onAddFavoriteEvent = (e, event_id) => {
        e.preventDefault();
        fetch('http://localhost:3000/favorite', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.userId,
                eventid: event_id
            })
        })
    };

    onAddSavedEvent = (e, event_id) => {
        e.preventDefault();
        fetch('http://localhost:3000/saved', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.userId,
                eventid: event_id
            })
        })
    };


    render() {


        /*for (let i = 0; i < response.data.length; i++) {
            let j = response.data[i];
            let denumire = j.denumire;

            console.log("Denumireeeaaaa ev. : ", denumire);
            let data_ev = j.data_ev;
            let durata_ev = j.durata_ev;
            let tip_eveniment = j.tip_eveniment;
            let tematica = j.tematica;
            let coperta = j.coperta;
            let descriere = j.descriere;
            let nr_locuri = j.nr_locuri;
            let locatie = j.locatie;


        }*/




        return (
            <div className={`col-md-${this.props.col}`}>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
                />
                <Row>
                    <SearchEvent handleLocationSearchChange={this.handleLocationSearchChange} handleDenumireSearchChange={this.handleDenumireSearchChange} handleMultiFilter={this.handleMultiFilter}/>
                </Row>
                <Row>
                    {
                        this.state.eventsList.map((event) => {
                            return (
                                <Card className={'col-md-3'}>
                                    <CardBody>
                                        <CardTitle tag="h5">{event.denumire}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">Data eveniment: {event.data_ev.substring(0,10)}</CardSubtitle>
                                    </CardBody>
                                    <img width="100%"
                                         src={`${event.coperta}`}
                                         alt="Card image cap"/>
                                    <CardBody>
                                        <CardText>{event.descriere}</CardText>
                                        <CardLink href="#" onClick={this.toggle}>Detalii</CardLink>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle}
                                               className={this.props.className}>
                                            <ModalHeader toggle={this.toggle}>Detalii organizatorice</ModalHeader>
                                            <ModalBody>
                                                <p>Durata evenimentului: {event.durata_ev} zile</p>
                                                <p>Tipul evenimentului: {event.tip_eveniment}</p>
                                                <p>Tematica evenimentului: {event.tematica}</p>
                                                <p>Numarul de locuori: {event.nr_locuri}</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color='primary' onClick={this.toggle}>Participa!</Button>{' '}
                                                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>
                                        <CardLink href={`https://www.google.ro/maps/place/${event.locatie}`} target="_blank">{event.locatie}</CardLink>
                                    </CardBody>
                                    <Button color="info" onClick={
                                        (e) => this.onAddSavedEvent(e, event.eventid)
                                    }>Participa!</Button>
                                    <Button color="primary" onClick={
                                        (e) => this.onAddFavoriteEvent(e, event.eventid)
                                    }>Adauga la favorite!</Button>
                                </Card>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default CardList;