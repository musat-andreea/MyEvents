import React, { Component } from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardLink
} from 'reactstrap';

class CardList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                    </CardBody>
                    <img width="10%" src="https://archive.mith.umd.edu/engl668k/wp-content/uploads/2013/01/twitter-logo-small.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                    </CardBody>
                    <Button color="danger">Danger!</Button>
                </Card>
            </div>
        );
    }
}

export default CardList;