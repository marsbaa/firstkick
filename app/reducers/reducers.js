import omit from 'lodash/omit';
import update from 'react-addons-update';

export var learningSpaceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LEARNING_SPACES':
      return { ...action.ls };
    case 'ADD_LEARNING_SPACE':
      return {
        ...state,
        [action.learningSpace.key]: {
          ...action.learningSpace
        }
      };
    case 'UPDATE_LEARNING_SPACE':
      return {
        ...state,
        [action.learningSpace.key]: {
          ...action.learningSpace
        }
      };
    case 'REMOVE_LEARNING_SPACE':
      return omit(state, action.key);
    case 'CHANGE_LEARNING_SPACE_STATUS':
      let ls = state[action.key];
      return {
        ...state,
        [action.key]: {
          ...ls,
          status: action.status
        }
      };
    default:
      return state;
  }
};

export var studentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_STUDENTS':
      return { ...action.students };
    case 'ADD_STUDENT':
      return {
        ...state,
        [action.student.key]: {
          ...action.student
        }
      };
    default:
      return state;
  }
};

export var learningAgreementReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LEARNING_AGREEMENTS':
      return { ...action.la };
    case 'ADD_LEARNING_AGREEMENT':
      if (action.removeKey !== null) {
        let removedState = omit(state, action.removeKey);
        return {
          ...removedState,
          [action.learningAgreement.key]: {
            ...action.learningAgreement
          }
        };
      } else {
        return {
          ...state,
          [action.learningAgreement.key]: {
            ...action.learningAgreement
          }
        };
      }
    case 'REMOVE_LEARNING_AGREEMENT':
      return omit(state, action.key);
    default:
      return state;
  }
};

export var fetchingReducer = (state = { completed: false }, action) => {
  switch (action.type) {
    case 'IS_FETCHING':
      return { completed: true };
    default:
      return state;
  }
};

export var gradeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_GRADES':
      return { ...action.grades };
    case 'ADD_GRADE':
      return {
        ...state,
        [action.grade.key]: {
          ...action.grade
        }
      };
    default:
      return state;
  }
};

export var selectedGradeReducer = (state = 'select', action) => {
  switch (action.type) {
    case 'SELECT_GRADE':
      return action.grade;
    default:
      return state;
  }
};
