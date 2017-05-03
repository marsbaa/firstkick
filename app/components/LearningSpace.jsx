import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {Well} from 'react-bootstrap'
import Student from 'Student'
import _ from 'lodash'

const style = {
  width: '22rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  color: 'green',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  float: 'right',
  lineHeight: 'normal',
  border: '1px dotted',
};

const studentTarget = {
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
    students: PropTypes.array.isRequired
  };

  render() {
    const { canDrop, isOver, connectDropTarget, name, picture, students} = this.props;
    const isActive = canDrop && isOver;

    let opacity: '1';
    if (isActive) {
      opacity = '0.6';
    } else if (canDrop) {
      opacity = '1';
    }

    return connectDropTarget(
      <div style={{...style, opacity}}>
        <img src={picture} style={{width: '100%'}} />
        <div style={{height: '40px', marginTop: '15px'}}>
          {_.size(students)!== 0 ?
            (Object.keys(students).map((key) => {
              const {name, id} = students[key];
              return (<Student key={id} name={name} id={id}/>)
            }))
            : "Drop Here"
          }
        </div>
      </div>

    );
  }
}
