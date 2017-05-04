import firebase, {firebaseRef} from 'app/firebase';

export var addLearningSpace = (learningSpace) => {
  var lsRef = firebaseRef.child('learningSpace');
  var newKey = lsRef.push().key;
  var updates = {};
  updates[newKey] = learningSpace;
  lsRef.update(updates);
  learningSpace.key = newKey;
  return {
    type: 'ADD_LEARNING_SPACE',
    learningSpace
  };
}
