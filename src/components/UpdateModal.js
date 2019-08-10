import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Progress } from "reactstrap";
import { uploadSize, uploadBinary } from '../requests';

class UpdateModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null,
      loaded: null,
      buttonsEnabled: true,
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  changeUploadProgress = (event) => {
    this.setState({
      loaded: event.loaded / event.total * 100
    })
  } 

  uploadFile = () => {
    this.setState({
      loaded: 0,
      buttonsEnabled: false,
    })
    uploadSize(
      this.state.selectedFile.size
    ).then(
      () => uploadBinary(
        this.state.selectedFile, this.changeUploadProgress
        ).then(() => setTimeout(() => this.props.toggle(), 2000))
    )
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle.bind(this)}
        unmountOnClose>
        <ModalHeader toggle={toggle.bind(this)}>Upload new firmware</ModalHeader>
        <ModalBody>
          {
            this.state.loaded == null 
            ?
            <Input type="file" id="modalInputField" onChange={this.onChangeHandler.bind(this)}/>
            :
            <Progress value={this.state.loaded}>{this.state.loaded}%</Progress>
          }
        </ModalBody>
        <ModalFooter>
          <Button disabled={!this.state.buttonsEnabled} color="primary" onClick={this.uploadFile.bind(this)}>Upload</Button>{' '}
          <Button disabled={!this.state.buttonsEnabled} color="secondary" onClick={toggle.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UpdateModal;
