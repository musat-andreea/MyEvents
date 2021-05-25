import React from 'react';

class CreateEvent extends React.Component{

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
        }


        this.openCreateEventForm = this.openCreateEventForm.bind(this);
    }

    onDenumireChange = (event) => {
        this.setState({denumire: event.target.value})
        console.log(this.state);
    }

    onDataChange = (event) => {
        this.setState({data: event.target.value})
        console.log(this.state);
    }

    onDurataChange = (event) => {
        this.setState({durata: event.target.value})
        console.log(this.state);
    }

    onTipChange = (event) => {
        this.setState({tip_eveniment: event.target.value})
        console.log(this.state);
    }

    onTemaChange = (event) => {
        this.setState({tematica: event.target.value})
        console.log(this.state);
    }

    onCopertaChange = (event) => {
        this.setState({coperta: event.target.value})
        console.log(this.state);
    }

    onDescriereChange = (event) => {
        this.setState({descriere: event.target.value})
        console.log(this.state);
    }

    onNumarLocChange = (event) => {
        this.setState({nr_loc: event.target.value})
        console.log(this.state);
    }

    onLocatieChange = (event) => {
        this.setState({locatie: event.target.value})
        console.log(this.state);
    }

    openCreateEventForm(event)   {
        document.getElementById('createEventForm').style.display = "table-cell";
    }

    onSubmitEvent = (event) => {
        event.preventDefault();
        console.log(this.state);
        fetch('http://localhost:3000/events', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.userId,
                denumire: this.state.denumire,
                data: this.state.data,
                durata: this.state.durata,
                tip_eveniment: this.state.tip_eveniment,
                tematica: this.state.tematica,
                coperta: this.state.coperta,
                descriere: this.state.descriere,
                nr_loc: this.state.nr_loc,
                locatie: this.state.locatie
            })
        })
            .then(response => {
                console.log(response);
            })

    }

    render()
    {
        return(
            <div>
                <button onClick={this.openCreateEventForm}>Creeaza eveniment</button>

                <form id = "createEventForm" style={{display: "none"}}>
                    <div className="form_create_event" style={{margin: "auto"}}>
                        <input type="text" name = "denumire" id = "denumire" placeholder="Denumire eveniment" style={{display: "flex"}} onChange={this.onDenumireChange}/>
                        <input type="text" name = "data" id = "data" placeholder="Data evenimentului" style={{display: "flex"}} onChange={this.onDataChange}/>
                        <input type="number" name = "durata" id = "durata" placeholder="Durata evenimentului" style={{display: "block"}} onChange={this.onDurataChange}/>
                        <input type="text" name = "tip_eveniment" id = "tip_eveniment" placeholder="Tipul evenimentului" style={{display: "block"}} onChange={this.onTipChange}/>
                        <input type="text" name = "tematica" id = "tematica" placeholder="Tematica evenimentului" style={{display: "block"}} onChange={this.onTemaChange}/>
                        <p style={{display: "block"}}>Coperta evenimentului:</p>
                        <input type="text" name = "coperta" id = "coperta" placeholder="Coperta evenimentului" onChange={this.onCopertaChange}/>
                        <input type="text" name = "descriere" id = "descriere" placeholder="Descrierea evenimentului" style={{display: "block"}} onChange={this.onDescriereChange}/>
                        <input type="number" name = "nr_loc" id = "nr_loc" placeholder="Numarul de locuri" style={{display: "block"}} onChange={this.onNumarLocChange}/>
                        <input type="text" name = "locatie" id = "locatie" placeholder="Locatia evenimentului" style={{display: "block"}} onChange={this.onLocatieChange}/>

                        <input
                            onClick={this.onSubmitEvent}
                            type = "submit"
                            value = "Trimite"
                            style={{display: "block"}}
                        />

                    </div>
                </form>
            </div>
        );

    }
}

export default CreateEvent;