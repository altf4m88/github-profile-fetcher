import React, {Component} from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";

class Confirmation extends Component {
    
    constructor(){
        super();
        this.state = {
            inputData:''
        }
    }

    handleOnClick() {
        const { proceed } = this.props;
        
        return () => {
            proceed({
                input: this.state.inputData
            });
        };
    }

    render() {
        const { show, dismiss, cancel, message } = this.props;

        return (
        <div className="static-modal">
            <Modal show={show} onHide={dismiss}>
                <Modal.Header>
                    <Modal.Title />
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <FormControl type="password" value={this.state.inputData}
                    onChange={(e) => {
                        this.setState({ 'inputData': e.target.value });
                    }}/>
                    <Button onClick={cancel}>Cancel</Button>
                    <Button className="button-l" onClick={this.handleOnClick()} >
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
    }
}

export const confirm = createConfirmation(confirmable(Confirmation));
