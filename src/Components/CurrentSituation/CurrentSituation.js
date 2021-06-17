import React from 'react';
import Select from 'react-select';
import axios from "axios";
import CovidFutureCasesChecker from "../SearchEvent/CovidFutureCasesChecker";
import Row from "react-bootstrap/Row";


class CurrentSituation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected_county_total_cases: 0,
            county_info: {},
            rate: {},
            selected_rate: 0,
            selectedCounty: '',
            county_population: -1,
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }
    componentDidMount() {

        let county_info = {};
        let options = [];
        let rate = {};


        axios.get('http://localhost:5000/last_days_situation')
            .then((response) => {
                console.log("res", response);
                let LastDaySituation = response.data[0];

                for (let i = 0; i < LastDaySituation.county_data.length; i++) {
                    let j = LastDaySituation.county_data[i];
                    let judet = j.county_name;

                    console.log("aaaa", j);
                    console.log("bbbbbbbbbb", judet);

                    options[i] = {value: judet, label: judet};

                    county_info[judet] = j.total_cases;

                }

                let beforeLastDaySituation = response.data[13];
                console.warn(response.data)

                for(let i =0; i < beforeLastDaySituation.county_data.length; i++) {
                    let j = beforeLastDaySituation.county_data[i];
                    let judet = j.county_name;
                    let cases = j.total_cases;
                    let population = j.county_population;

                    let new_cases_TODAY = county_info[judet] - cases;
                    console.log('TODAY', new_cases_TODAY)
                    rate[judet] = (new_cases_TODAY/ population ) * 1000;
                    console.log(judet, rate[judet]);


                }


                this.setState({
                    options: options,
                    county_info: county_info,
                    rate: rate,
                    county_population:  response.data[0].county_data[0].county_population
                });
            });
    }

    handleChangeEvent(event) {
        console.log(this.state);

        this.setState({
            selected_county_info: this.state.county_info[event.value]
        });

        this.setState({
            selected_rate: this.state.rate[event.value],
            selectedCounty: event.value,
        });



    }

    render() {
        return (
            <div>
                <Select options={this.state.options} onChange={this.handleChangeEvent}/>

                <div id="total_cases">
                    {this.state.selected_county_info}
                </div>

                <div id="rate">
                    {this.state.selected_rate}
                </div>

                <div id="rate">
                    {
                        this.state.selected_rate < 1.5
                            ?<div>
                                <p>Scenariul VERDE</p>
                            </div>
                            :(
                                this.state.selected_rate > 3
                                ? <div>
                                    <p>Scenariu ROSU</p>
                                    </div>
                                    : <div>
                                        <p>Scenariu GALBEN</p>
                                    </div>
                            )
                    }
                </div>

                {
                    this.state.selectedCounty
                    ?<CovidFutureCasesChecker locatie={this.state.selectedCounty} countyPopulation={this.state.county_population}/>
                    :(
                        ''
                      )
                }

            </div>
        );
    }
}

export default CurrentSituation;
