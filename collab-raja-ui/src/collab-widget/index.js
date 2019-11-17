import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import './collab.css';
import kingImg from './../773-27-512.png';

class CollabWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openCollab: false,
        };
    }

    renderBtn() {
        return (
            <Button
                className="generate-btn"
                onClick={e => this.setState({ ...this.state, openCollab: true })}
                variant="outline-dark"
            >
                <span className="btn-txt">&#8623;</span>
            </Button>
        )
    }

    render() {
        return (
            <>
                {this.renderBtn()}
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={this.state.openCollab}
                    onHide={e => this.setState({ openCollab: false })}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <img className="modal-head-img" src={kingImg} alt="king" />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav justify variant="pills" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Join a Collab</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="second"
                                        onClick={e => console.log('generate code')}
                                    >
                                        Invite to Collab
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    Join a Collab
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Invite to Collab
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default CollabWidget;