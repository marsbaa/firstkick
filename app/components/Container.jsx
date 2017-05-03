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
         1 : { name: 'Easel Space', picture: '/images/easel.JPG', students: [], maxSize: 2},
         2 : { name: 'Construction Space', picture: '/images/construction.JPG', students: [], maxSize: 6},
         3 : { name: 'Dramatic Space', picture: '/images/dramatic.JPG', students: [], maxSize: 5},
         4 : { name: 'Chess Space', picture: '/images/chess.JPG', students: [], maxSize: 3},
         5 : { name: 'Dark Room Space', picture: '/images/darkroom.JPG', students: [], maxSize: 4},
         6 : { name: 'Dream Time Space', picture: '/images/dreamtime.JPG', students: []},
         7 : { name: 'Maths Space', picture: '/images/maths.JPG', students: []},
         8 : { name: 'Nature Space', picture: '/images/nature.JPG', students: []},
         9 : { name: 'Communication Space', picture: '/images/communication.JPG', students: []},
         10 : { name: 'Puzzle Space', picture: '/images/puzzle.JPG', students: []},
         11 : { name: 'Studio Space', picture: '/images/studio.JPG', students: []},

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
      <div>
        <Row style={{backgroundColor: 'pink', textAlign: 'center'}}>
          <Col lg={12} md={12} xs={12}>
            <h5>Learning Agreement</h5>
          </Col>
        </Row>
          <Row style={{padding: '5px', overflow: 'hidden', clear: 'both'}}>
            <Col md={9} lg={9} xs={9}>
          {Object.keys(learningSpace).map((key) => {
            const {name, picture, students} = learningSpace[key];
            return (
                <LearningSpace
                  key={key}
                  name={name}
                  picture={picture}
                  students={students}
                  onDrop={item => this.handleDrop(key, item)}
                  />
            )
          })
          }
          </Col>
            <Col md={3} lg={3} xs={3}>
              <Well style={{ overflow: 'hidden', clear: 'both' }}>
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
