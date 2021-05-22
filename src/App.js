import React, { Component } from "react";
import './App.css';
import Navigation from "./Components/Navigation/Navigation.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import MyEvents from "./Components/MyEvents/MyEvents.js";
import CurrentSituation from "./Components/CurrentSituation/CurrentSituation.js";
import SearchEvent from "./Components/SearchEvent/SearchEvent.js";
import SaveEvents from "./Components/SaveEvents/SaveEvents.js";
import CreateEvent from "./Components/CreateEvent/CreateEvent.js";
import Logo from "./Components/Logo/Logo.js";
import Particles from "react-particles-js";
import Scroll from "./Components/Scroll.js";
import SearchBox from "./Components/SearchBox.js";
import ErrorBoundry from "./Components/ErrorBoundry.js";
import { setSearchField, requestEvents } from "./actions.js";

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
    input:'',
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        rol: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = initialState;

    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            rol: data.rol,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }
    /*
    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(console.log)
    }
    */


    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState(initialState)
        } else if(route === 'home') {
            this.setState({isSignedIn: true})
        }


        this.setState({route: route});
    }

    render()
  {
      /*const { searchField, onSearchChange, events, isPending } = this.props;
      const filterEvents = events.filter(event => {
          return event.name.toLowerCase().includes(searchField.toLowerCase())
      })*/

    return (
        <div className="App">


            <Particles className="particles"
                params={particleOptions}/>
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
            { this.state.route === 'home'
                ? <div>
                    <Logo />
                    {/*
                    */}
                    {/*
                    */}

                    {console.log("AICI AM:", this.state.user.rol)}
                    {
                        this.state.user.rol === 'PARTICIPANT'

                        ? <div>
                            <CurrentSituation/>
                            {/*<SearchBox searchChange={onSearchChange} />*/}
                            <SearchEvent/>
                            <Scroll>
                                {/*<ErrorBoundry>
                                <MyEvents events={filterEvents}/>
                            </ErrorBoundry>*/}
                            </Scroll>


                            <br/>
                            <SaveEvents/>
                        </div>
                        : <div>
                            <h1>MODUL ADIMINISTRATOR</h1>
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
