import React from 'react';
import {Button} from "react-bootstrap";
import './SaveEvents.css';

class SaveEvents extends React.Component{

    render()
    {
        return(
            <div>
                <Button variant="outline-info" className="textColor bgColor"> Evenimente salvate </Button>
            </div>
        );

    }
}

export default SaveEvents;