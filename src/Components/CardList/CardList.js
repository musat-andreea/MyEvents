import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, Button, CardLink,
    ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';

class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {


        return (
            <div className={`col-md-${this.props.col}`}>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
                />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Nume Eveniment</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Data eveniment</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://archive.mith.umd.edu/engl668k/wp-content/uploads/2013/01/twitter-logo-small.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <CardLink href="#" onClick={this.toggle}>Detalii</CardLink>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Detalii organizatorice</ModalHeader>
                            <ModalBody>
                                <p>Durata evenimentului: 2 zile</p>
                                <p>Tipul evenimentului: Deschidere de carte</p>
                                <p>Tematica evenimentului: Amintiri</p>
                                <p>Numarul de locuri: 50</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={this.toggle}>Participa!</Button>{' '}
                                <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <CardLink href="#">Locatie</CardLink>
                    </CardBody>
                    <Button color="info">Participa!</Button>
                    <Button color="primary">Adauga la favorite!</Button>
                </Card>
            </div>
        );
    }
}

export default CardList;