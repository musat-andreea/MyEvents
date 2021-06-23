import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Cookies from 'js-cookie'

class AddInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            varsta: 0,
            interese: ''
        };

        this.openCreateAddInfoForm = this.openCreateAddInfoForm.bind(this);
    }

    onVarstaChange = (event) => {
        this.setState({varsta: event.target.value});
        // console.log(this.state);
    };

    onIntereseChange = (event) => {
        this.setState({interese: event.target.value});
    };

    openCreateAddInfoForm(event) {
        document.getElementById('createAddInfoForm').style.display = "table-cell";
    }

    onSubmitAddInfo = (event) => {
        event.preventDefault();
        // console.log(this.state);
        fetch('http://localhost:3000/participants', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userid: Cookies.get('userId'),
                interese: this.state.interese,
                varsta: this.state.varsta
            })
        })
            .then(response => {
                // console.log(response);
            })
    };

    render ()
    {
        return(
            <div>
                <Button variant="outline-info" onClick={this.openCreateAddInfoForm}>Adauga informatii</Button>
                <br />
                <br />
                <form id = "createAddInfoForm" style={{display: "none"}}>
                    <div className="form_create_event" style={{margin: "0 auto"}}>
                        <Form.Group>
                            <Form.Control type="number" name = "varsta" id = "varsta" placeholder="Introdecti varsta:" style={{margin: "0 auto"}} onChange={this.onVarstaChange}/>
                            <br />
                            <Form.Control type="text" name = "interese" id = "interese" placeholder="Introduceti interesele:" style={{display: "flex"}} onChange={this.onIntereseChange}/>
                            <br />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={this.onSubmitAddInfo}
                            type = "submit"

                            style={{display: "block"}}
                        >Salveaza datele</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInfo;
