import React from 'react';
import {Button} from "react-bootstrap";
import {
    Card, CardImg, CardText, CardBody, Modal,
    CardTitle, CardSubtitle, CardLink,
    ModalBody, ModalHeader, ModalFooter, Col, Input
} from 'reactstrap';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import './MessageBox.css';

class MessageBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };

    }

    componentDidMount() {

        axios.get(`http://localhost:3000/getMessages?participantId=${this.props.participantId}&managerId=${this.props.eventManagerId}`)
            .then((response) => {
                let messages = response.data;
                this.setState({messages: messages});

                // console.log(messages);
            })
    }


    handleSendMessage(e)    {
        e.preventDefault();
        fetch('http://localhost:3000/sendMessage', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                participantId: this.props.participantId,
                managerId: this.props.eventManagerId,
                eventId: this.props.eventId,
                message: document.getElementById("mesaj").value,
                direction: this.props.direction,
            })
        })
            .then(response => {
                alert("Your message was sent");
                axios.get(`http://localhost:3000/getMessages?participantId=${this.props.participantId}&managerId=${this.props.eventManagerId}`)
                    .then((response) => {
                        let messages = response.data;
                        this.setState({messages: messages});
                    })
            })
    }

    render() {
        return (
            <div>
                <h3>Evenimentul:</h3>
                <h2>Numele partipantului:</h2>
                <Row>
                    <Col md={6}  style={{border: '1px solid green', backgroundColor: 'lightblue', opacity: '0.9', margin: 'auto'}}>
                        {
                            this.state.messages.map((msg) => {
                                if (this.props.direction == msg.direction)    {
                                    return (
                                        <div className="p_to_m"> {msg.message}</div>
                                    )
                                }
                                else {
                                    return (<div className="m_to_p"> {msg.message}</div>)
                                }
                            })
                        }
                    </Col>
                </Row>

                <Row>
                    <Col md={6} style={{margin: 'auto'}}>
                        <Input type={"text"} placeholder={"introduceti mesajul"} id={"mesaj"} ></Input>
                    </Col>
                </Row>
                <br />
                <Row>

                    <Button type = "submit" style={{margin: 'auto'}} onClick={(e) => this.handleSendMessage(e)}> Trimite mesaj </Button>
                </Row>
            </div>
        );

    }
}

export default MessageBox;
