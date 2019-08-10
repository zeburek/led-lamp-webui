import React from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './App.css';
import NavBarComponent from './components/NavBar';
import { getInputType, title } from './utils';

const websocket = W3CWebSocket('ws://localhost:8000/');

const emptyRow = {
  effects: {
      "name": "New effect",
      "speed": 0,
      "scale": 0,
      "brightness": 0
  },
  alarms: {
      "time": "07:00",
      "color": "red",
      "enabled": false
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
      effects: [],
      alarms: [],
      working: null,
    }
  }

  initWebSocket() {
    websocket.onopen = () => {
      console.log("WebSocket connection opened")
    }
    websocket.onmessage = (message) => {
      console.log(message)
      const data = JSON.parse(message.data);
      this.setState({...data})
    }
  }

  sendUpdatedState() {
    websocket.send(JSON.stringify(this.state))
  }

  onUpdateItem(array_name, i, name, value){
    this.setState(state => {
      const array = state[array_name].map((item, j) => {
        if (j === i) {
          item[name] = value;
        }
        return item;
      });
      return { [array_name]: array };
    });
  };

  handleListChange (evt) {
    const [array_name, name] = evt.target.name.split(".");
    const value = evt.target.value;
    const index = parseInt(evt.target.getAttribute('data-index'));
    this.onUpdateItem(array_name, index, name, value);
  }

  handleListCheckBox (evt) {
    const [array_name, name] = evt.target.name.split(".");
    const value = evt.target.checked;
    const index = parseInt(evt.target.getAttribute('data-index'));
    this.onUpdateItem(array_name, index, name, value);
  }

  componentWillMount() {
    this.initWebSocket()
  }

  renderInput(data, key, index, groupName){
    const inputType = getInputType(emptyRow[groupName][key]);
    return (
      inputType === "checkbox" ?
      <InputGroupText key={key}>
        <Input 
          type={inputType}
          placeholder={title(key)} 
          name={groupName + "." + key} 
          checked={data[key]} 
          data-index={index} 
          onChange={this.handleListCheckBox.bind(this)}
          addon
        />
      </InputGroupText>
      :
      <Input 
        type={inputType}
        key={key} 
        placeholder={title(key)} 
        name={groupName + "." + key} 
        value={data[key]} 
        data-index={index} 
        onChange={this.handleListChange.bind(this)} 
      />
    )
  }

  renderGroup(groupName) {
    return(
      <Form>
        <FormGroup>
          <h2 className="mt-2">
            {title(groupName)}
          </h2>
          {
            this.state[groupName].map((data, index) => {
              return (
                <InputGroup key={index} className="mt-1">
                  {
                    Object.keys(emptyRow[groupName]).map((key, i2) => {
                      return(
                        this.renderInput(data, key, index, groupName)
                      )
                    })
                  }
                </InputGroup>
              )
            })
          }
        </FormGroup>
      </Form>
    )
  }

  renderEffects() {
    return this.renderGroup("effects");
  }

  renderAlarms() {
    return this.renderGroup("alarms");
  }

  render() {
    return (
      <div className="wrapper">
        <Container>
          <NavBarComponent sendUpdatedState={() => this.sendUpdatedState()} />
          <h1 className="mt-2">
            LED {this.state.working ? "working":"not working"}
            <Button 
              color="primary"
              className="float-right"
              onClick={() => this.setState({working: !this.state.working})}
              active={this.state.working}
              size="lg"
            > 
              {this.state.working ? "Turn Off":"Turn On"}
            </Button>
          </h1>
          <Row>
            <Col>
              {
                this.state.effects.length !== 0 
                ? 
                this.renderEffects()
                :
                <p>No data to display</p>
              }
              {
                this.state.alarms.length !== 0 
                ? 
                this.renderAlarms()
                :
                <p>No data to display</p>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
