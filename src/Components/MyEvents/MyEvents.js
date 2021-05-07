import React from 'react';
import { Button } from "react-bootstrap";
import './MyEvents.css';

class MyEvents extends React.Component{

    render()
    {
        return(
            <div>
                <Button variant="outline-info" className="textColors bgColors"> Evenimentele mele </Button>
            </div>
        );

    }
}

export default MyEvents;