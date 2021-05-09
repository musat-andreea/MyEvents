import React from 'react';
import Select from 'react-select';
//import LastDaySituation from '../../resources/last_day.json';
import axios from "axios";


class CurrentSituation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected_county_total_cases: 0,
            county_info: {}
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }
    componentDidMount() {

        let county_info = {};
        let options = [];

        axios.get('http://localhost:5000/last_day_situation')
            .then((response) => {
                console.log("res", response);
                let LastDaySituation = response.data;

                for (let i = 0; i < LastDaySituation.county_data.length; i++) {
                    let j = LastDaySituation.county_data[i];
                    let judet = j.county_name;

                    console.log("aaaa", j);
                    console.log("bbbbbbbbbb", judet);

                    options[i] = {value: judet, label: judet};

                    county_info[judet] = j.total_cases;

                }

                this.setState({
                    options: options,
                    county_info: county_info
                });
            });
    }

    handleChangeEvent(event) {
        console.log(this.state);

        this.setState({
            selected_county_info: this.state.county_info[event.value]
        })
    }

    render() {
        return (
            <div>
                <Select options={this.state.options} onChange={this.handleChangeEvent}/>

                <div id="total_cases">
                    {this.state.selected_county_info}
                </div>
            </div>
        );

    }
}

export default CurrentSituation;