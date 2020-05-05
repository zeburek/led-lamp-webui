import React from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Input, InputGroup, InputGroupText } from "reactstrap";
import './App.css';
import NavBarComponent from './components/NavBar';
import { title } from './utils';
import { fieldsConf } from './components/fieldsConfiguration';
import EffectsList from './components/EffectsList';
import { websocket } from './requests';
import UpdateModal from './components/UpdateModal';

const EVENTS = {
  effects: "EFFECTS_CHANGED",
  alarms: "ALARMS_CHANGED",
  working: "WORKING",
  activeEffect: "ACTIVE_EFFECT",
}

class App extends React.Component{

  constructor(props){
    super(props);

    this.timer = null;
    
    this.state = {
      effects: [],
      alarms: [],
      working: null,
      activeEffect: null,
      modalIsOpen: false,
      webSocketConnection: false,
    }
  }

  async initModels() {
    let response = await fetch("/effects");
    if (response.ok) {
      let json = await response.json()
      this.setState({effects: json.effects})
    } else {
      console.log("Error loading settings: " + response.status)
    }
  }

  initWebSocket() {
    websocket.onopen = () => {
      console.log("WebSocket connection opened")
      this.setState({webSocketConnection: true})
    }
    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      this.setState({...data})
    }
    websocket.onclose = () => {
      console.log("WebSocket disconnected")
      this.setState({webSocketConnection: false})
    }
    websocket.onerror = (error) => {
      console.log("WebSocket connection error: " + JSON.stringify(error))
    }
  }

  sendEvent(eventName, data) {
    websocket.send(JSON.stringify({
      event: eventName,
      data: data
    }))
  }

  toggleModal() {
    this.setState(state => ({
      modalIsOpen: !state.modalIsOpen
    }));
  }

  changeWorking(){
    this.setState((state) => {
      this.sendEvent(EVENTS.working, !state.working)
      return { working: !state.working }
    })
  }

  setActiveEffect(value){
    this.setState((state) => {
      this.sendEvent(EVENTS.activeEffect, value)
      return { activeEffect: value }
    })
  }

  onUpdateItem(array_name, i, name, value){
    clearTimeout(this.timer)
    this.setState(state => {
      const array = state[array_name].map((item, j) => {
        if (j === i) {
          item[name] = value;
          this.timer = setTimeout(() => this.sendEvent(EVENTS[array_name], item), 500);
        }
        return item;
      });
      return { [array_name]: array };
    });
  };

  handleListChange (evt) {
    const [array_name, name] = evt.target.name.split(".");
    const value = evt.target.type === 'checkbox' ? evt.target.checked:evt.target.value;
    const index = parseInt(evt.target.getAttribute('data-index'));
    this.onUpdateItem(array_name, index, name, value);
  }

  componentWillMount() {
    this.initModels()
    this.initWebSocket()
  }

  renderInput(data, key, index, groupName){
    const inputProps = fieldsConf[groupName][key];
    return (
      inputProps.type === "checkbox" ?
      <InputGroupText key={key}>
        <Input 
          placeholder={title(key)} 
          name={groupName + "." + key} 
          checked={data[key]} 
          data-index={index} 
          onChange={this.handleListChange.bind(this)}
          addon
          {...inputProps}
        />
      </InputGroupText>
      :
      <Input
        key={key} 
        placeholder={title(key)} 
        name={groupName + "." + key} 
        value={data[key]} 
        data-index={index} 
        onChange={this.handleListChange.bind(this)}
        {...inputProps}
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
                    Object.keys(fieldsConf[groupName]).map((key, i2) => {
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
    return (
      <EffectsList
        data={this.state.effects}
        handleChange={this.handleListChange.bind(this)}
        activeEffect={this.state.activeEffect}
        setActiveEffect={this.setActiveEffect.bind(this)}/>
    );
  }

  renderAlarms() {
    return this.renderGroup("alarms");
  }

  render() {
    return (
      <div className="wrapper">
        <Container>
          {
            this.state.modalIsOpen && 
            <UpdateModal isOpen={this.state.modalIsOpen} toggle={this.toggleModal.bind(this)}/>
          }
          <NavBarComponent 
            toggleModal={this.toggleModal.bind(this)} 
            connection={this.state.webSocketConnection}
            reconnect={() => websocket.reconnect()}/>
          <h1 className="mt-2">
            LED {this.state.working ? "working":"not working"}
            <Button 
              color="primary"
              className="float-right"
              onClick={() => this.changeWorking()}
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
