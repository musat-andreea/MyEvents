import React from 'react';

import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, CardLink, Button,
    ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import './FavoriteEvents.css';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Cookies from 'js-cookie'

class FavoriteEvents extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eventsList: [],
            currentEventDetails: {
                durata_ev: '',
                tip_eveniment: '',
                tematica: '',
                nr_locuri: '',
                eventid: '',
            }
        };

        this.toggle = this.toggle.bind(this);
        this.onListFavoriteEvent = this.onListFavoriteEvent.bind(this);
        this.updateCurrentEventDetails = this.updateCurrentEventDetails.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    updateCurrentEventDetails(e, eventDetails)    {
        this.setState({
            currentEventDetails: {
                durata_ev: eventDetails.durata_ev,
                tip_eveniment: eventDetails.tip_eveniment,
                tematica: eventDetails.tematica,
                nr_locuri: eventDetails.nr_locuri,
                eventid: eventDetails.eventid,
            }
        });
        this.toggle()
    }

    componentDidMount() {
            this.getFavoriteEventsList();
    }

    getFavoriteEventsList() {
        axios.get(`http://localhost:3000/favoriteList?user_id=${Cookies.get('userId')}`)
            .then((response) => {
                // console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                // console.log("eventsList:", this.state.eventsList)
            })
    }

    onListFavoriteEvent (event) {
        document.getElementById('createListEvents').style.display = "block";

    }

    onAddSavedEvent = (e, event_id) => {
        e.preventDefault();
        fetch('http://localhost:3000/saved', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: Cookies.get('userId'),
                eventid: event_id
            })
        })
            .then((result) => {
                this.getFavoriteEventsList()
            })
    };

    onDeleteFavoriteEvent = (e, event_id) => {
        e.preventDefault();
        fetch(`http://localhost:3000/deleteFavoriteEvent?user_id=${Cookies.get('userId')}&eventid=${event_id}`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
        })
            .then((result) =>   {
                this.getFavoriteEventsList()
            })
    };

    render()
    {
        return(
            <div>
                <Button outline color="info" className="textColor bgColor" onClick={
                    (e) => this.onListFavoriteEvent(e)} > Evenimente preferate </Button>
                <br />
                <br />
                <div id = "createListEvents" style={{display: "none"}}>
                    <div className={`col-md-${this.props.col}`}>
                        <link
                            rel='stylesheet'
                            href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
                        />
                        <Row>
                            {
                                this.state.eventsList.map((event) => {
                                    return(
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
                                                <CardLink href="#" onClick={(e) => this.updateCurrentEventDetails(e, event)}>Detalii</CardLink>
                                                <CardLink href={`https://www.google.ro/maps/place/${event.locatie}`} target="_blank">{event.locatie}</CardLink>
                                            </CardBody>
                                            <Button color="info" onClick={
                                                (e) => this.onAddSavedEvent(e, event.eventid)
                                            }>Participa!</Button>
                                            <Button color="danger" onClick={
                                                (e) => this.onDeleteFavoriteEvent(e, event.eventid)
                                            }>Stergeti evenimentul</Button>
                                        </Card>
                                    )
                                })
                            }
                        </Row>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} id={'test'}
                               className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Detalii organizatorice</ModalHeader>
                            <ModalBody>
                                <p>Durata evenimentului: {this.state.currentEventDetails.durata_ev} zile</p>
                                <p>Tipul evenimentului: {this.state.currentEventDetails.tip_eveniment}</p>
                                <p>Tematica evenimentului: {this.state.currentEventDetails.tematica}</p>
                                <p>Numarul de locuri: {this.state.currentEventDetails.nr_locuri}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={
                                    (e) => this.onAddSavedEvent(e, this.state.currentEventDetails.eventid)
                                }>Participa!</Button>{' '}
                                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        );

    }
}

export default FavoriteEvents;
