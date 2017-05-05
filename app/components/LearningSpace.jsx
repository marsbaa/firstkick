import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {Well,Row,Col} from 'react-bootstrap'
import Student from 'Student'
import _ from 'lodash'

const style = {
  width: '27rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1.5rem',
  float: 'right',
  lineHeight: 'normal',
  border: '1px dotted',
  borderRadius: '10px',
  fontFamily: 'Helvetica'
};

const studentTarget = {
    canDrop(props) {
      return _.size(props.students) < props.maxSize
    },
    drop(props, monitor) {
    props.onDrop(monitor.getItem());
    return {name: props.name}
  },
};

@DropTarget(ItemTypes.STUDENT, studentTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class LearningSpace extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    maxSize: PropTypes.number.isRequired
  };

  render() {
    const { canDrop, isOver, connectDropTarget, name, picture, students, maxSize} = this.props;
    const isActive = canDrop && isOver;

    let opacity: '1';
    if (isActive) {
      opacity = '0.2';
    } else if (canDrop) {
      opacity = '1';
    }

    return connectDropTarget(
      <div style={{...style, opacity, backgroundImage: `url(${picture})`, height: '220px', padding: '0px'}}>
        <Row style={{height: '35px', backgroundColor: '#6AD9D9', borderRadius:'10px 10px 0px 0px', margin: '0px 0px'}}>
        <Col xs={9} style={{margin: '0px', paddingTop: '10px'}}>
          <b>{name}</b>
        </Col>
        <Col xs={3} style={{margin: '0px', paddingTop: '10px'}}>
          <b>{_.size(students)}/{maxSize}</b>
        </Col>
      </Row>
        <div style={{height: '40px', marginTop: '15px'}}>
          {_.size(students)!== 0 ?
            (Object.keys(students).map((key) => {
              const {name, id} = students[key];
              return (<Student key={id} name={name} id={id}/>)
            }))
            : ""
          }
        </div>
      </div>

    );
  }
}
