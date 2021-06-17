import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, Button, CardLink,
    ModalBody, ModalHeader, ModalFooter, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import SearchEvent from "../SearchEvent/SearchEvent";
import Cookies from 'js-cookie'
import CovidFutureCasesChecker from "../SearchEvent/CovidFutureCasesChecker";
import MessageBox from "../MessageBox/MessageBox";

class CardList extends React.Component {
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
            },
            selectedLocation: '',
            participantsList: [],
            eventMessages: [],
            messageBox: '',
        };

        this.toggle = this.toggle.bind(this);
        this.handleLocationSearchChange = this.handleLocationSearchChange.bind(this);
        this.handleDenumireSearchChange = this.handleDenumireSearchChange.bind(this);
        this.handleMultiFilter = this.handleMultiFilter.bind(this);
        this.updateCurrentEventDetails = this.updateCurrentEventDetails.bind(this);
        this.displayParticipantsList = this.displayParticipantsList.bind(this);
        this.viewMessages = this.viewMessages.bind(this);
    }

    handleDenumireSearchChange(event) {

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

    handleLocationSearchChange(event) {

        axios.get(`http://localhost:3000/getEvents?locatie=${event.target.value}`)
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({
                    eventsList: response.data,
                    selectedLocation: event.target.value,
                });


                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })
    }

    displayParticipantsList(e, event) {
        axios.get(`http://localhost:3000/eventsParticipants?managerId=${event.managerid}&eventId=${event.eventid}`)
            .then((response) => {
                this.setState({
                    participantsList: response.data
                });

                console.log("participantsList:", this.state.participantsList)
            })
        this.updateCurrentEventDetails(e, event);
        this.toggle()
    }

    viewMessages(e, event) {
        axios.get(`http://localhost:3000/getMessages?eventId=${event.eventid}`)
            .then((response) => {
                this.setState({
                    eventMessages: response.data
                });

                console.log("eventMessages:", this.state.eventMessages)
            })
        this.updateCurrentEventDetails(e, event);
        this.toggle()
    }

    handleMultiFilter(event) {
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

    updateCurrentEventDetails(e, eventDetails) {
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
        if (Cookies.get('rol') === 'PARTICIPANT') {
            axios.get('http://localhost:3000/getEvents')
                .then((response) => {
                    console.log("Rezultatul json din BD", response);
                    let InfoAboutEvents = response.data[0];

                    //console.log("InfoAboutE: ", response.data.length);

                    this.setState({eventsList: response.data});

                    // UNDEFINEDED
                    console.log("eventsList:", this.state.eventsList)
                })
        } else {
            axios.get(`http://localhost:3000/getEvents?managerId=${Cookies.get('userId')}`)
                .then((response) => {
                    console.log("Rezultatul json din BD", response);
                    let InfoAboutEvents = response.data[0];

                    //console.log("InfoAboutE: ", response.data.length);

                    this.setState({eventsList: response.data});

                    // UNDEFINEDED
                    console.log("eventsList:", this.state.eventsList)
                })
        }

    }

    onAddFavoriteEvent = (e, event_id) => {
        e.preventDefault();
        fetch('http://localhost:3000/favorite', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: Cookies.get('userId'),
                eventid: event_id
            })
        })
            .then((result) => {
                window.location.reload();
            })
    };

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
    };

    handleSendMessage(e, participantId, eventId) {
        this.setState(
            {
                messageBox:
                    <MessageBox direction={'manager_to_participant'} loggedUser={Cookies.get('userId')} eventManagerId={Cookies.get('userId')} participantId={participantId} eventId={eventId}></MessageBox>
            }
        );
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
                    <SearchEvent handleLocationSearchChange={this.handleLocationSearchChange}
                                 handleDenumireSearchChange={this.handleDenumireSearchChange}
                                 handleMultiFilter={this.handleMultiFilter}/>

                </Row>
                <Row>
                    {
                        this.state.eventsList.map((event) => {
                            return (
                                <Card className={'col-md-3'}>
                                    <CardBody>
                                        <CardTitle tag="h5">{event.denumire}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">Data
                                            eveniment: {event.data_ev.substring(0, 10)}</CardSubtitle>
                                    </CardBody>
                                    <img width="100%"
                                         src={`${event.coperta}`}
                                         alt="Card image cap"/>
                                    <CardBody>
                                        <CardText>{event.descriere}</CardText>
                                        <CardLink href="#"
                                                  onClick={(e) => this.updateCurrentEventDetails(e, event)}>Detalii</CardLink>
                                        <CardLink href={`https://www.google.ro/maps/place/${event.locatie}`}
                                                  target="_blank">{event.locatie}</CardLink>
                                    </CardBody>
                                    {
                                        Cookies.get('rol') === 'PARTICIPANT'
                                            ?
                                            (
                                                <div style={{width: '100%'}}>
                                                    <Button color="info" style={{width: '100%'}} onClick={
                                                        (e) => this.onAddSavedEvent(e, event.eventid)
                                                    }>Participa!</Button>
                                                    <br/>
                                                    <Button color="primary" style={{width: '100%'}} onClick={
                                                        (e) => this.onAddFavoriteEvent(e, event.eventid)
                                                    }>Adauga la favorite!</Button>
                                                </div>
                                            )
                                            : (
                                                <div style={{width: '100%'}}>
                                                    <Button color="info" style={{width: '100%'}} onClick={
                                                        (e) => this.displayParticipantsList(e, event)
                                                    }>Lista participanti</Button>
                                                    <Button color="primary" style={{width: '100%'}} onClick={
                                                        (e) => this.viewMessages(e, event)
                                                    }>Vizualizeaza mesaje</Button>
                                                </div>
                                            )
                                    }
                                </Card>
                            )
                        })
                    }
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} id={'test'}
                       className={this.props.className}
                        size = "lg">
                    <ModalHeader toggle={this.toggle}>Detalii organizatorice</ModalHeader>
                    <ModalBody>
                        <p>Durata evenimentului: {this.state.currentEventDetails.durata_ev} zile</p>
                        <p>Tipul evenimentului: {this.state.currentEventDetails.tip_eveniment}</p>
                        <p>Tematica evenimentului: {this.state.currentEventDetails.tematica}</p>
                        <p>Numarul de locuri: {this.state.currentEventDetails.nr_locuri}</p>
                        <br/>
                        {
                            Cookies.get('rol') === 'ORGANIZATOR'
                                ? (
                                    <div>
                                        <h2> Participanti: </h2>
                                        <Table>
                                            <thead>
                                            <th>Nume</th>
                                            <th>Email</th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.participantsList.map((eventParticipant) => {
                                                    return (
                                                        <tr>
                                                            <td>{eventParticipant.name}</td>
                                                            <td>{eventParticipant.email}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                                : ('')
                        }

                        {
                            Cookies.get('rol') === 'ORGANIZATOR'
                                ? (
                                    <div>
                                        <h2> Mesaje primite: </h2>
                                        <Table>
                                            <thead>
                                            <th>Directia</th>
                                            <th>Participant ID</th>
                                            <th>Mesaj</th>
                                            <th>Data mesajului</th>
                                            <th>Actiuni</th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.eventMessages.map((eventMessages) => {
                                                    return (
                                                        <tr>
                                                            <td>{eventMessages.direction}</td>
                                                            <td>{eventMessages.participant_id}</td>
                                                            <td>{eventMessages.message}</td>
                                                            <td>{eventMessages.date}</td>
                                                            <td><Button color="warning" onClick={(e) => this.handleSendMessage(e, eventMessages.participant_id, eventMessages.event_id)}>
                                                                Mesaj catre participant!</Button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                        {this.state.messageBox}
                                    </div>
                                )
                                : ('')
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            Cookies.get('rol') === 'PARTICIPANT'
                                ?
                                (
                                    <div style={{width: '100%'}}>
                                        <Button color='primary' style={{width: '100%'}} onClick={
                                            (e) => this.onAddSavedEvent(e, this.state.currentEventDetails.eventid)
                                        }>Participa!</Button>
                                        <br/>
                                        <Button color='secondary' style={{width: '100%'}}
                                                onClick={this.toggle}>Cancel</Button>
                                    </div>
                                )
                                : (
                                    <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                                )
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CardList;
