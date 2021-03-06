import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { Badge } from 'react-bootstrap';
import ItemTypes from 'ItemTypes';

const studentSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const didDrop = monitor.didDrop();
    const dropResult = monitor.getDropResult();
    if (!didDrop) {
      props.moveStudent(item);
    }
    if (dropResult) {
    }
  }
};

@DragSource(ItemTypes.STUDENT, studentSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class Student extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    moveStudent: PropTypes.func.isRequired
  };

  componentDidMount() {
    const img = new Image();
    img.src = 'image/sun.png';
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { isDragging, connectDragSource, count, name, styling } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...styling, opacity }}>
        <b style={{ fontSize: '140%' }}>
          {name.substring(0, 1)}
        </b>
        {name.substring(1, name.length)}
        <Badge
          style={{
            marginTop: '0px',
            marginLeft: '3px',
            color: 'papayawhip',
            backgroundColor: '#c94e50'
          }}
        >
          {count}
        </Badge>
      </div>
    );
  }
}
