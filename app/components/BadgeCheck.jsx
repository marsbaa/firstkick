import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  height: '200px',
  width: '420px',
  marginTop: '40px',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  marginLeft: '20px',
  marginRight: '40px'
};

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
    return { name: props.name };
  }
};

@DropTarget(ItemTypes.STUDENT, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class BadgeCheck extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        <h3 style={{ textAlign: 'center' }}>How am i doing?</h3>
      </div>
    );
  }
}
