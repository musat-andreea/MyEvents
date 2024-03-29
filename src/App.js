import React, {Component} from "react";
import './App.css';
import Navigation from "./Components/Navigation/Navigation.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import MyEvents from "./Components/MyEvents/MyEvents.js";
import CurrentSituation from "./Components/CurrentSituation/CurrentSituation.js";
import SearchEvent from "./Components/SearchEvent/SearchEvent.js";
import SaveEvents from "./Components/SaveEvents/SaveEvents.js";
import FavoriteEvents from "./Components/FavoriteEvents/FavoriteEvents.js";
import ParticipantsList from "./Components/ParticipantsList/ParticipantsList.js";
import CreateEvent from "./Components/CreateEvent/CreateEvent.js";
import Logo from "./Components/Logo/Logo.js";
import Particles from "react-particles-js";
import Scroll from "./Components/Scroll.js";
import AddInfo from "./Components/AddInfo/AddInfo.js";
import CardList from "./Components/CardList/CardList.js";
import SearchBox from "./Components/SearchBox.js";
import ErrorBoundry from "./Components/ErrorBoundry.js";
import {setSearchField, requestEvents} from "./actions.js";
import MessageBox from "./Components/MessageBox/MessageBox";
import Cookies from 'js-cookie'


const particleOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}


const initialState = {
    input: '',
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        rol: '',
        email: '',
        entries: 0,
        joined: ''
    },
    event: {
        eventid: '',
        managerid: '',
        denumire: '',
        data_ev: '',
        durata_ev: '',
        tip_eveniment: '',
        tematica: '',
        coperta: '',
        descriere: '',
        nr_locuri: 0,
        locatie: ''
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = initialState;

    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                rol: data.rol,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    loadEvent = (data) => {
        this.setState({
            eveniment: {
                eventid: data.eventid,
                managerid: data.managerid,
                denumire: data.denumire,
                data_ev: data.data_ev,
                durata_ev: data.durata_ev,
                tip_eveniment: data.tip_eveniment,
                tematica: data.tematica,
                coperta: data.coperta,
                descriere: data.descriere,
                nr_locuri: data.nr_locuri,
                locatie: data.locatie
            }
        })
    }

    componentDidMount() {
        if (Cookies.get('email'))   {
            this.onRouteChange('home');
        }
    }
    /*
    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(console.log)
    }
    */


    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
            Cookies.remove('userId');
            Cookies.remove('name');
            Cookies.remove('rol');
            Cookies.remove('email');
            Cookies.remove('entries');
            Cookies.remove('joined');
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }


        this.setState({route: route});
    }

    render() {
        /*const { searchField, onSearchChange, events, isPending } = this.props;
        const filterEvents = events.filter(event => {
            return event.name.toLowerCase().includes(searchField.toLowerCase())
        })*/

        return (
            <div className="App">


                <Particles className="particles"
                           params={particleOptions}/>
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

                {this.state.route === 'home'
                    ? <div>
                        <Logo/>
                        {/*
                    */}
                        {/*
                    */}

                        {console.log("AICI AM:", this.state.user.rol)}
                        {
                            Cookies.get('rol') === 'PARTICIPANT'

                                ? <div>
                                    <CurrentSituation/>
                                    {/*<SearchBox searchChange={onSearchChange} />*/}

                                    <Scroll>
                                        {/*<ErrorBoundry>
                                <MyEvents events={filterEvents}/>
                            </ErrorBoundry>*/}
                                        <CardList col={12} userId={this.state.user.id}/>
                                    </Scroll>


                                    <br/>
                                    <SaveEvents userId={this.state.user.id}/>
                                    <br/>
                                    <FavoriteEvents userId={this.state.user.id}/>
                                    <br/>
                                    <AddInfo userId={this.state.user.id}/>

                                </div>
                                : <div>
                                    <h1>MODUL ADIMINISTRATOR</h1>

                                    <CurrentSituation/>

                                    <br/>
                                    <h2> Evenimentele tale </h2>
                                    <CardList col={12} userId={this.state.user.id}/>

                                    <br/>
                                    <br/>
                                    <CreateEvent userId={this.state.user.id}/>
                                </div>
                        }

                    </div>
                    : (
                        this.state.route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }

            </div>
        );
    }
}

export default App;
