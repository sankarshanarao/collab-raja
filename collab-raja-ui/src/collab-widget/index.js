import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import io from 'socket.io-client';
import Form from 'react-bootstrap/Form';

import './collab.css';
import kingImg from './../773-27-512.png';

class CollabWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openCollab: false,
            collabId: 'Loading...'
        };

        this.handleConnectToBackend = this.handleConnectToBackend.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        );
    }

    handleConnectToBackend(e) {
        
        if(this.props.collabId === 'Loading...') {
            console.log('Making Connection to default socket', io);
            this.props.socket();
        }        
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('do collab', this.state.collabId);
        this.props.socket(this.state.collabId);
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
                                        onClick={this.handleConnectToBackend}
                                    >
                                        Invite to Collab
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control 
                                            type="text" 
                                            placeholder="Enter CollabID"
                                            onChange={e => this.setState({
                                                ...this.state,
                                                collabId: e.currentTarget.value
                                            })}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                                Submit
                                        </Button>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {this.props.collabId}
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