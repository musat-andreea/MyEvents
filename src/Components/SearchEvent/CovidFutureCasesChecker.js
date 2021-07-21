import React from 'react';
import {Row} from "reactstrap";
import axios from "axios";
import apiConfig from "../../apiConfig";
import {Table} from "reactstrap";


class CovidFutureCasesChecker extends React.Component {
    constructor(props) {
        super(props);

        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            predictedDate:'',
            predictedCases: '',
            predictedInfectionRate: -1,
            predictedScenario: ''
        }
    }

    handleDateChange(e) {
        let data, totalPredictedDays, lastDayCases, beforeLastDayCases, newCasesLastDay, lastRate, scenario;

        axios.get(`${apiConfig.covidMlBaseUrl}/predict/cases_until?county=${this.props.locatie}&until_future_date=${e.target.value}`)
            .then((response) => {
                data = response.data;
                totalPredictedDays = data.total_days;
                lastDayCases = data.cases[totalPredictedDays - 1];
                beforeLastDayCases = data.cases[totalPredictedDays - 2];

                if (!beforeLastDayCases)    {
                    beforeLastDayCases = this.props.currentNumberOfCases;
                }

                newCasesLastDay = lastDayCases - beforeLastDayCases;


                lastRate = (newCasesLastDay / this.props.countyPopulation) * 1000;

                scenario = this.calculateScenarioFromRate(lastRate);

                this.setState({
                    predictedDate: e.target.value,
                    predictedCases: data.cases[totalPredictedDays-1],
                    predictedInfectionRate: lastRate,
                    predictedScenario: scenario
                })
            })
    }

    calculateScenarioFromRate(lastRate) {
        let scenario = '';

        if (lastRate < 1.5) {
            scenario = 'VERDE';
        } else if (lastRate > 3) {
            scenario = 'ROSU';
        } else {
            scenario = 'GALBEN';
        }

        return scenario;
    }

    render() {
        return (
            <div>
                <Row>
                    <div className='pa2'>
                        <input
                            className='pa3 ba b--green bg-lightest-blue'
                            type='date'
                            id="checked_date"
                            placeholder='Introduceti data '
                            onBlur={this.handleDateChange}
                        />
                    </div>
                </Row>
                <Row>
                    <h2> &nbsp; Situatia covid la data selectata </h2>
                    <Table>
                        <thead>
                            <th>Data</th>
                            <th>Judet</th>
                            <th>Total Cazuri</th>
                            <th>Rata de infectare</th>
                            <th>Scenariu</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.predictedDate}</td>
                            <td>{this.props.locatie}</td>
                            <td>{this.state.predictedCases}</td>
                            <td>{this.state.predictedInfectionRate}</td>
                            <td>{this.state.predictedScenario}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>

        );
    }
}


export default CovidFutureCasesChecker;
