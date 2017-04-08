import React, {Component, PropTypes} from 'react';
import {Col, Modal, Button, Form, FormGroup, FormControl, ControlLabel, Label} from 'react-bootstrap';

export class AddChannelModal extends Component {

    constructor(props) {
        super(props);
        this.state = { channelName: '' };
    }

    addChannel = () => {
        if (this.state.channelName === '') return this.setState({error: 'Channel Name is missing.'});
        this.props.onAdd({
            channelName: this.state.channelName
        });
        this.setState({ channelName: '' });
        this.closeChannel();
    };

    closeChannel = () => {
        this.props.close();
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.closeChannel}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="addChannel">
                            <Col componentClass={ControlLabel} xs={2}>
                                Channel Name
                            </Col>
                            <Col xs={10}>
                                <FormControl
                                    type="text"
                                    value={this.state.channelName}
                                    placeholder="Enter channel name!"
                                    onChange={ev => this.setState({channelName: ev.target.value})}
                                />
                            </Col>
                        </FormGroup>
                        <p>
                            <Label bsStyle="danger">{this.state.error}</Label>
                        </p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.addChannel}>Save</Button>
                    <Button onClick={this.closeChannel}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

AddChannelModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
};
