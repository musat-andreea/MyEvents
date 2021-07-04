import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardLink,
    CardSubtitle,
    CardText,
    CardTitle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from 'reactstrap';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import SearchEvent from "../SearchEvent/SearchEvent";
import Cookies from 'js-cookie'
import MessageBox from "../MessageBox/MessageBox";
import EditEventForm from "../SaveEvents/EditEventForm";
import apiConfig from "../../apiConfig";
import notifications from "../../helpers";

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editModal: false,
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
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.handleLocationSearchChange = this.handleLocationSearchChange.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
        this.handleDenumireSearchChange = this.handleDenumireSearchChange.bind(this);
        this.handleMultiFilter = this.handleMultiFilter.bind(this);
        this.updateCurrentEventDetails = this.updateCurrentEventDetails.bind(this);
        this.displayParticipantsList = this.displayParticipantsList.bind(this);
        this.viewMessages = this.viewMessages.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
    }

    handleDeleteEvent(e, event_id) {
        e.preventDefault();
        if (window.confirm("Sunteti sigur ca doriti sa stergeti acest eveniment?")) {
            fetch(`http://localhost:3000/deleteEvent?event_id=${event_id}`, {
                method: 'delete',
                headers: {'Content-Type': 'application/json'}
            })
                .then((result) => {
                    axios.get(`http://localhost:3000/getEvents?managerId=${Cookies.get('userId')}`)
                        .then((response) => {
                            console.log("Rezultatul json din BD", response);
                            let InfoAboutEvents = response.data[0];

                            //console.log("InfoAboutE: ", response.data.length);

                            this.setState({eventsList: response.data});
                        })
                        .then((result) => {
                            this.state.eventsList.map((event) => {
                                this.setPredictedScenarioInformation(event);
                            });
                        })
                })
        }
    }

    handleDenumireSearchChange(event) {
        if (Cookies.get('rol') == 'ORGANIZATOR') {
            axios.get(`http://localhost:3000/getEvents?managerId=${Cookies.get('userId')}&denumire=${event.target.value}`)
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
        } else {
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
    }

    handleLocationSearchChange(event) {
        if (Cookies.get('rol') == 'ORGANIZATOR') {
            axios.get(`http://localhost:3000/getEvents?managerId=${Cookies.get('userId')}&locatie=${event.target.value}`)
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
        } else {
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
    }

    setParticipantsList(managerId, eventId) {
        axios.get(`http://localhost:3000/eventsParticipants?managerId=${managerId}&eventId=${eventId}`)
            .then((response) => {
                this.setState({
                    participantsList: response.data
                });

                console.log("participantsList:", this.state.participantsList)
            })
    }

    displayParticipantsList(e, event) {
        this.setParticipantsList(event.managerid, event.eventid);
        this.updateCurrentEventDetails(e, event);
        this.toggle()
    }

    openEditModal(e, event) {
        this.updateCurrentEventDetails(e, event);
        this.toggleEditModal()
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
        if (Cookies.get('rol') == 'ORGANIZATOR') {
            axios.get(`http://localhost:3000/getEvents?managerId&${Cookies.get('userId')}&locatie=${document.getElementById('locatie').value}&denumire=${document.getElementById('denumire').value}`)
                .then((response) => {
                    console.log("Rezultatul json din BD", response);
                    let InfoAboutEvents = response.data[0];

                    //console.log("InfoAboutE: ", response.data.length);

                    this.setState({eventsList: response.data});

                    // UNDEFINEDED
                    console.log("eventsList:", this.state.eventsList)
                })
        } else {
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
    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleEditModal() {

        this.setState({
            editModal: !this.state.editModal
        });
    }

    updateCurrentEventDetails(e, eventDetails) {
        this.setParticipantsList(eventDetails.managerid, eventDetails.eventid);
        this.setState({
            currentEventDetails: {
                denumire: eventDetails.denumire,
                data_ev: eventDetails.data_ev,
                coperta: eventDetails.coperta,
                descriere: eventDetails.descriere,
                locatie: eventDetails.locatie,
                durata_ev: eventDetails.durata_ev,
                tip_eveniment: eventDetails.tip_eveniment,
                tematica: eventDetails.tematica,
                nr_locuri: eventDetails.nr_locuri,
                eventid: eventDetails.eventid,
            }
        });
        this.toggle()
    }

    updateCurrentEventDetailsForEditModal(e, eventDetails) {
        this.setParticipantsList(eventDetails.managerid, eventDetails.eventid);
        this.setState({
            currentEventDetails: {
                denumire: eventDetails.denumire,
                data_ev: eventDetails.data_ev,
                coperta: eventDetails.coperta,
                descriere: eventDetails.descriere,
                locatie: eventDetails.locatie,
                durata_ev: eventDetails.durata_ev,
                tip_eveniment: eventDetails.tip_eveniment,
                tematica: eventDetails.tematica,
                nr_locuri: eventDetails.nr_locuri,
                eventid: eventDetails.eventid,
            }
        });
        this.toggleEditModal()
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
                .then((result) => {
                    this.state.eventsList.map((event) => {
                        this.setPredictedScenarioInformation(event);
                    });
                })
        } else {
            axios.get(`http://localhost:3000/getEvents?managerId=${Cookies.get('userId')}`)
                .then((response) => {
                    console.log("Rezultatul json din BD", response);
                    let InfoAboutEvents = response.data[0];

                    //console.log("InfoAboutE: ", response.data.length);

                    this.setState({eventsList: response.data});
                })
                .then((result) => {
                    this.state.eventsList.map((event) => {
                        this.setPredictedScenarioInformation(event);
                    });
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
                    <MessageBox direction={'manager_to_participant'} loggedUser={Cookies.get('userId')}
                                eventManagerId={Cookies.get('userId')} participantId={participantId}
                                eventId={eventId}></MessageBox>
            }
        );
    };

    calculateScenarioFromRate(lastRate) {
        let scenario;

        if (lastRate < 1.5) {
            scenario = 'VERDE';
        } else if (lastRate > 3) {
            scenario = 'ROSU';
        } else {
            scenario = 'GALBEN';
        }

        return scenario;
    }

    setPredictedScenarioInformation(eventDetails) {
        let data, totalPredictedDays, lastDayCases, beforeLastDayCases, newCasesLastDay, lastRate, scenario;
        let event_id = eventDetails.eventid;

        axios.get(`${apiConfig.covidMlBaseUrl}/predict/cases_until?county=${eventDetails.judet}&until_future_date=${eventDetails.data_ev.split('T')[0]}`)
            .then((response) => {
                if (response.status === 200) {
                    data = response.data;
                    totalPredictedDays = data.total_days;
                    lastDayCases = data.cases[totalPredictedDays - 1];
                    beforeLastDayCases = data.cases[totalPredictedDays - 2];

                    newCasesLastDay = lastDayCases - beforeLastDayCases;

                    lastRate = (newCasesLastDay / 500000) * 1000;

                    scenario = this.calculateScenarioFromRate(lastRate);

                    if (!this.state.hasOwnProperty(event_id)) {
                        this.setState({
                            [event_id]: {
                                predictedDate: eventDetails.data_ev.split('T')[0],
                                predictedCases: data.cases[totalPredictedDays - 1],
                                predictedInfectionRate: lastRate,
                                predictedScenario: scenario
                            }
                        })
                    }
                }
            })
            .catch((response) => {
                if (response.status === 400) {
                    console.log(response.data.error);
                }
            })
    }

    getCountyScenario(county) {
        let county_rate = JSON.parse(Cookies.get('current_infection_rate'))[county];

        return this.calculateScenarioFromRate(county_rate);
    }

    calculateTotalSeatsAndScenario(event_id, maximumSeatsNormalSituation, county) {
        let scenario = this.getCountyScenario(county);

        if (scenario === 'VERDE') {
            return parseInt(0.5 * maximumSeatsNormalSituation);
        }

        if (scenario === 'ROSU') {
            return 0 * maximumSeatsNormalSituation;
        }

        if (scenario === 'GALBEN') {
            return parseInt(0.3 * maximumSeatsNormalSituation);
        }
    }

    calculateTotalSeatsInPredictedScenario(maximumSeatsNormalSituation, event_id) {
        if (this.state.hasOwnProperty(event_id)) {
            if (this.state[event_id].predictedScenario === 'VERDE') {
                return parseInt(0.5 * maximumSeatsNormalSituation);
            }

            if (this.state[event_id].predictedScenario === 'ROSU') {
                return 0 * maximumSeatsNormalSituation;
            }

            if (this.state[event_id].predictedScenario === 'GALBEN') {
                return parseInt(0.3 * maximumSeatsNormalSituation);
            }
        }

        return maximumSeatsNormalSituation;
    }


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
                            let judet = event.judet;
                            let predictedScenario = 'Nedefinit';

                            if (this.state.hasOwnProperty(event.eventid)) {
                                predictedScenario = this.state[event.eventid].predictedScenario;
                            }

                            let currentScenarioSeats = this.calculateTotalSeatsAndScenario(event.eventid, event.nr_locuri, judet);
                            let predictedScenarioSeats = this.calculateTotalSeatsInPredictedScenario(event.nr_locuri, event.eventid);

                            if (currentScenarioSeats != predictedScenarioSeats && predictedScenarioSeats != event.nr_locuri) {
                                notifications.sendMailNotification(
                                    event.email,
                                    "Posibila schimbare in situatia epidemiologica",
                                    `Buna ziua, evenimentul ${event.denumire} este posibil sa fie impactat de situatia epidemiologica. Numarul de locuri permis acum este: ${currentScenarioSeats} si va deveni ${predictedScenarioSeats}`
                                );
                            }
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

                                        <CardText id={`${event.eventid}_current_scenario_in_county`}> Scenariu
                                            curent: {this.getCountyScenario(event.judet)}</CardText>
                                        <CardText id={`${event.eventid}_predicted_scenario_in_county`}> Scenariu
                                            prezis: {predictedScenario}
                                        </CardText>
                                        <CardText>Numar de locuri in situatia normala: {event.nr_locuri}</CardText>
                                        <CardText>Numar de locuri in scenariul
                                            curent: {currentScenarioSeats}</CardText>
                                        <CardText>Numar de locuri in scenariul
                                            prezis: {predictedScenarioSeats}</CardText>
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
                                                    <Button color="warning" style={{width: '100%'}} onClick={
                                                        (e) => this.updateCurrentEventDetailsForEditModal(e, event)
                                                    }>Editeaza eveniment</Button>
                                                    <Button color="info" style={{width: '100%'}} onClick={
                                                        (e) => this.displayParticipantsList(e, event)
                                                    }>Lista participanti</Button>
                                                    <Button color="primary" style={{width: '100%'}} onClick={
                                                        (e) => this.viewMessages(e, event)
                                                    }>Vizualizeaza mesaje</Button>
                                                    <Button color="danger" style={{width: '100%'}}  onClick={
                                                        (e) => this.handleDeleteEvent(e, event.eventid)
                                                    }>Stergeti evenimentul</Button>
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
                       size="lg">
                    <ModalHeader toggle={this.toggle}>Detalii organizatorice</ModalHeader>
                    <ModalBody>
                        <p>Durata evenimentului: {this.state.currentEventDetails.durata_ev} zile</p>
                        <p>Tipul evenimentului: {this.state.currentEventDetails.tip_eveniment}</p>
                        <p>Tematica evenimentului: {this.state.currentEventDetails.tematica}</p>
                        <p>Numarul de locuri totale: {this.state.currentEventDetails.nr_locuri}</p>
                        <p>Numarul de locuri rezervate: {this.state.participantsList.length}</p>
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
                                            <th>Participant</th>
                                            <th>Mesaj</th>
                                            <th>Data mesajului</th>
                                            <th>Actiuni</th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.eventMessages.map((eventMessages) => {
                                                    return (
                                                        <tr>
                                                            <td>{eventMessages.name}</td>
                                                            <td>{eventMessages.message}</td>
                                                            <td>{eventMessages.date}</td>
                                                            <td><Button color="warning"
                                                                        onClick={(e) => this.handleSendMessage(e, eventMessages.participant_id, eventMessages.event_id)}>
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


                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal} id={'editModal'}
                       className={this.props.className}
                       size="lg">
                    <ModalHeader toggle={this.toggle}>Editeaza eveniment</ModalHeader>
                    <ModalBody>
                        <EditEventForm colSize={12} editedEvent={this.state.currentEventDetails}
                                       participantsList={this.state.participantsList}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={this.toggleEditModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CardList;
