import React from 'react';
import Select from 'react-select';
import Judete from '../../resources/judete.json';

class CurrentSituation extends React.Component{

    constructor(props) {
        super(props);
        //console.log(Judete);
        let options = [];
        for(let i = 0; i < Judete.length; i++) {
            console.log(Judete[i]);
            let nume_judet = Judete[i].nume;
            let option = {value: nume_judet, label: nume_judet};
            options.push(option);
        }

        this.state = {
           options: options
        };
    }


    render()
    {
        return(
            <div>
                <Select options={this.state.options}/>
            </div>
        );

    }
}

export default CurrentSituation;