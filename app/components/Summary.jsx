import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import size from 'lodash/size';
import sortBy from 'lodash/sortBy';
import { startLearningAgreements, startLearningSpaces } from 'actions';
import TotalParticipationPieChart from 'TotalParticipationPieChart';
import TotalParticipationBarChart from 'TotalParticipationBarChart';

class Summary extends React.Component {
  componentWillMount() {
    const { dispatch, learningAgreements, learningSpaces } = this.props;
    if (isEmpty(learningAgreements)) {
      dispatch(startLearningAgreements());
    }
    if (isEmpty(learningSpaces)) {
      dispatch(startLearningSpaces());
    }
  }

  render() {
    const { learningAgreements, learningSpaces } = this.props;
    let pieGroup = groupBy(learningAgreements, 'learningSpaceKey');
    let data = [];
    if (pieGroup !== undefined) {
      Object.keys(pieGroup).map(groupId => {
        const group = pieGroup[groupId];
        if (learningSpaces[groupId] !== undefined) {
          data.push({
            name: learningSpaces[groupId].name,
            participated: size(group)
          });
        }
      });
    }
    data = sortBy(data, 'participated');
    return (
      <div>
        <Row style={{ textAlign: 'center', margin: '10px 20px' }}>
          <Col xs={12} md={12} lg={12}>
            <TotalParticipationBarChart data={data} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    learningAgreements: state.learningAgreements,
    learningSpaces: state.learningSpaces
  };
}
export default connect(mapStateToProps)(Summary);
