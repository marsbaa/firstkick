export var learningSpaceReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LEARNING_SPACE':
      return [
        ...state,
        {...action.users}
      ];
      default:
        return state;
    }
  };
