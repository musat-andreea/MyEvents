import React from 'react';
import {Row} from "reactstrap";


class SearchEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>

                    <div className='pa2'>
                        <input
                            className='pa3 ba b--green bg-lightest-blue'
                            type='search'
                            id = "locatie"
                            placeholder='Introduceti locatia '
                            onBlur={this.props.handleLocationSearchChange}
                        />
                    </div>
                    <div className='pa2'>
                        <input
                            className='pa3 ba b--green bg-lightest-blue'
                            type='search'
                            id = "denumire"
                            placeholder='Introduceti denumirea '
                            onBlur={this.props.handleDenumireSearchChange}
                        />
                    </div>

                    <div className='pa2'>
                        <input
                            className='pa3 ba b--green bg-lightest-blue'
                            type='submit'
                            value = 'Multi Filter Submit'
                            onClick={this.props.handleMultiFilter}
                        />
                    </div>
                </Row>
            </div>

        );
    }
}


export default SearchEvent;