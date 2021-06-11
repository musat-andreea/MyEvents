import React from 'react';
import {Button} from "react-bootstrap";
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, CardLink,
    ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import './SaveEvents.css';
import axios from 'axios';
import Row from "react-bootstrap/Row";

class SaveEvents extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            eventsList: [],
        };

        this.toggle = this.toggle.bind(this);
        this.onListSavedEvent = this.onListSavedEvent.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/savedList?user_id=${this.props.userId}`)
            .then((response) => {
                console.log("Rezultatul json din BD", response);
                let InfoAboutEvents = response.data[0];

                //console.log("InfoAboutE: ", response.data.length);

                this.setState({eventsList: response.data});

                // UNDEFINEDED
                console.log("eventsList:", this.state.eventsList)
            })

    }

    onListSavedEvent (event) {
        document.getElementById('createListSavedEvents').style.display = "block";

    }


    render()
    {
        return(
            <div>
                <Button variant="outline-info" className="textColor bgColor" onClick={
                    (e) => this.onListSavedEvent(e)} > Evenimente salvate </Button>
                <br />
                <br />
                <div id = "createListSavedEvents" style={{display: "none"}}>
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
                                                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                                                    </ModalFooter>
                                                </Modal>
                                                <CardLink href={`https://www.google.ro/maps/place/${event.locatie}`} target="_blank">{event.locatie}</CardLink>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
            </div>
        );

    }
}

export default SaveEvents;