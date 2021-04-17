import React, { Component } from "react";
import './App.css';
import Navigation from "./Components/Navigation/Navigation.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import Logo from "./Components/Logo/Logo.js";
import Particles from "react-particles-js";

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
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = initialState;

    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
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

    return (
        <div className="App">

            <Particles className="particles"
                params={particleOptions}/>
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
            { this.state.route === 'home'
                ? <div>
                    <Logo />
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
