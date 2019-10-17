import React from 'react';
import { Row, Col, ListGroup, ListGroupItem, Label, Input } from "reactstrap";
import { fieldsConf } from './fieldsConfiguration';
import { title } from '../utils';

class EffectsList extends React.Component {

  componentDidMount() {
    document.getElementsByClassName("active list-group-item")[0].scrollIntoView()
  }

  render() {
    const { data, handleChange, activeEffect, setActiveEffect } = this.props;

    const renderInputs = (item, index) => {
      return (
        Object.keys(fieldsConf.effects).map((key, _) => {
          const inputProps = fieldsConf.effects[key];
          return(
            <p key={key}>
              <Label>{title(key)}:&nbsp;
                <span className="text-secondary">{item[key]}</span></Label>
              <Input 
                placeholder={title(key)} 
                name={"effects." + key} 
                value={item[key]} 
                data-index={index} 
                onChange={handleChange.bind(this)}
                {...inputProps}
              />
            </p>
          )
        })
      )
    }

    return (
      <div>
        <Row>
          <Col>
            <h3 className="mt-1">
              Effects
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md="5" className="order-sm-1">
            <ListGroup style={{overflow: "auto", height: "300px"}}>
              {
                data.map((item, index) => {
                  return (
                    <ListGroupItem
                      key={item.name}
                      active={index === activeEffect}
                      onClick={() => setActiveEffect(index)}>
                      {item.name}
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
          </Col>
          <Col md="7" className="order-sm-0">
            {renderInputs(data[activeEffect], activeEffect)}
          </Col>
        </Row>
      </div>
    )
  }
}

export default EffectsList;
