import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LearningSpace from 'LearningSpace';
import Student from 'Student';
import {Grid, Row, Col, Well} from 'react-bootstrap'
import update from 'react/lib/update';
import _ from 'lodash'
import Speech from 'react-speech'
import Wad from 'web-audio-daw'

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learningSpace: {
         1 : { name: 'Easel Space', picture: '/image/easel.jpg', students: [], maxSize: 2},
         2 : { name: 'Construction Space', picture: '/image/construction.jpg', students: [], maxSize: 6},
         3 : { name: 'Dramatic Space', picture: '/image/dramatic.jpg', students: [], maxSize: 5},
         4 : { name: 'Chess Space', picture: '/image/chess.jpg', students: [], maxSize: 2},
         5 : { name: 'Dark Room Space', picture: '/image/darkroom.jpg', students: [], maxSize: 4},
         6 : { name: 'Dream Time Space', picture: '/image/dreamtime.jpg', students: [], maxSize: 3},
         7 : { name: 'Maths Space', picture: '/image/maths.jpg', students: [], maxSize: 6},
         8 : { name: 'Nature Space', picture: '/image/nature.jpg', students: [], maxSize: 6},
         9 : { name: 'Communication Space', picture: '/image/communication.jpg', students: [], maxSize: 8},
         10 : { name: 'Puzzle Space', picture: '/image/puzzle.jpg', students: [], maxSize: 2},
         11 : { name: 'Studio Space', picture: '/image/studio.jpg', students: [], maxSize: 12},

      },
     student: {
       1: {name: 'Aco'},
       2: {name: 'Ashton'},
       3: {name: 'Bailey'},
       4: {name: 'Ben'},
       5: {name: 'Blaire'},
       6: {name: 'Blaize'},
       7: {name: 'County'},
       8: {name: 'Daniel(Irfan)'},
       9: {name: 'Denzel'},
       10: {name: 'Dimas'},
       11: {name: 'Edin'},
       12: {name: 'Elika'},
       13: {name: 'Elisapeta'},
       14: {name: 'Erhas'},
       15: {name: 'Etash'},
       16: {name: 'Faiza'},
       17: {name: 'Hala(Lulu)'},
       18: {name: 'Hannah'},
       19: {name: 'Henri'},
       20: {name: 'Hiba'},
       21: {name: 'Huong'},
       22: {name: 'Intizar'},
       23: {name: 'Isaiah'},
       24: {name: 'Jamaica'},
       25: {name: 'Jasmine'},
       26: {name: 'Jennita'},
       27: {name: 'Kayla'},
       28: {name: 'Liam'},
       29: {name: 'Mackenzie'},
       30: {name: 'Madison'},
       31: {name: 'Maha'},
       31: {name: 'Mobin'},
       32: {name: 'Moein'},
       33: {name: 'Murrsa'},
       34: {name: 'Nathan'},
       35: {name: 'Nehemiah'},
       36: {name: 'Nesandi'},
       37: {name: 'Nikola'},
       38: {name: 'Samuel'},
       39: {name: 'Sandali'},
       40: {name: 'Setayesh'},
       41: {name: 'Soman'},
       42: {name: 'Zane'},
       43: {name: 'Zeynep'},
       44: {name: 'Zoha'}
     }
    }
  }
  render() {
    let style = {
      play: {
        button: {
          width: '28',
          height: '28',
          cursor: 'pointer',
          pointerEvents: 'none',
          outline: 'none',
          backgroundColor: 'yellow',
          border: 'solid 1px rgba(255,255,255,1)',
          borderRadius: 6
        },
      }
    };
    const {learningSpace, student} = this.state;


    return (
      <div style={{backgroundColor: '#ECDFCD'}}>
        <Row style={{backgroundColor: '#F6454F', textAlign: 'center', color: 'white'}}>
          <Col lg={12} md={12} xs={12}>
            <h4>Learning Agreement</h4>
          </Col>
        </Row>
          <Row style={{padding: '10px', overflow: 'hidden', clear: 'both', margin: '0px'}}>
            <Col md={9} lg={9} xs={9}>
          {Object.keys(learningSpace).map((key) => {
            const {name, picture, students, maxSize} = learningSpace[key];
            return (
                <LearningSpace
                  key={key}
                  name={name}
                  picture={picture}
                  students={students}
                  maxSize={maxSize}
                  onDrop={item => this.handleDrop(key, item)}
                  />
            )
          })
          }
          </Col>
            <Col md={3} lg={3} xs={3}>
              <Well style={{ overflow: 'hidden',  backgroundColor: '#54B77E' }}>
                {Object.keys(student).map((key)=> {
                  const {name, dropped} = student[key];
                  if(!dropped) {
                    return (
                      <Student
                        key={key}
                        name={name}
                        id={key}
                        />
                    )
                  }
                })}
              </Well>
            </Col>
          </Row>
      </div>

    );
  }

  handleDrop(index, item) {
    const {id} = item;
    var spaceIndex = -1;
    Object.keys(this.state.learningSpace).map((spaceId) => {
      var space = this.state.learningSpace[spaceId]
      spaceIndex = _.findIndex(space.students, {'id' : id})
      if (spaceIndex > -1) {
        this.setState(update(this.state, {
          learningSpace: {
            [spaceId]: {
              students: {
                $splice: [[spaceIndex, 1]],
              }
            }
          }
    }))
  }
})
      this.setState(update(this.state, {
        learningSpace: {
          [index]: {
            students: {
              $push: [item],
            },
          },
        },
        student: {
          [id] : {
            dropped: {$set : true}
          }
        }
      }));

  }
}
