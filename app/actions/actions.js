import firebase, { firebaseRef } from 'app/firebase';

//Actions for Learning Spaces
let initialDataLoaded = false;

export const startLearningSpaces = () => {
  return dispatch => {
    var lsRef = firebaseRef.child('learningSpace');
    lsRef.once('value').then(snapshot => {
      var ls = snapshot.val();
      var parsedLS = [];
      if (ls !== null) {
        Object.keys(ls).forEach(lsId => {
          parsedLS[lsId] = {
            key: lsId,
            ...ls[lsId]
          };
        });
      }
      dispatch(addLearningSpaces(parsedLS));
    });
  };
};

export const addLearningSpaces = ls => {
  return {
    type: 'ADD_LEARNING_SPACES',
    ls
  };
};

export const removeLearningSpace = key => {
  var lsRef = firebaseRef.child('learningSpace/' + key);
  lsRef.remove();
  return {
    type: 'REMOVE_LEARNING_SPACE',
    key
  };
};

export const learningSpaceStatus = (key, status) => {
  var lsRef = firebaseRef.child('learningSpace/' + key);
  status = status === 'current' ? 'archived' : 'current';
  lsRef.update({ status });
  return {
    type: 'CHANGE_LEARNING_SPACE_STATUS',
    key,
    status
  };
};

export const addLearningSpace = (learningSpace, pictureFile, badgeFile) => {
  return dispatch => {
    var lsRef = firebaseRef.child('learningSpace');
    var newKey = lsRef.push().key;
    var updates = {};
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
      .child('images/' + learningSpace.pictureFilename)
      .put(pictureFile);
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        var pictureURL = uploadTask.snapshot.downloadURL;
        uploadTask = storageRef
          .child('images/' + learningSpace.badgeFilename)
          .put(badgeFile);
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          },
          function(error) {
            // Handle unsuccessful uploads
          },
          function() {
            var badgeURL = uploadTask.snapshot.downloadURL;
            updates[newKey] = {
              ...learningSpace,
              pictureURL,
              badgeURL
            };
            lsRef.update(updates);
            learningSpace.key = newKey;
            learningSpace.pictureURL = pictureURL;
            learningSpace.badgeURL = badgeURL;
            dispatch({
              type: 'ADD_LEARNING_SPACE',
              learningSpace
            });
          }
        );
      }
    );
  };
};

export const updateLearningSpace = (
  key,
  learningSpace,
  pictureFile,
  badgeFile
) => {
  return dispatch => {
    var lsRef = firebaseRef.child('learningSpace');
    var updates = {};
    if (pictureFile === '' && badgeFile === '') {
      updates[key] = {
        ...learningSpace
      };
      lsRef.update(updates);
      dispatch({
        type: 'UPDATE_LEARNING_SPACE',
        learningSpace
      });
    } else if (pictureFile !== '' && badgeFile === '') {
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child('images/' + learningSpace.pictureFilename)
        .put(pictureFile);
      uploadTask.on(
        'state_changed',
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          var pictureURL = uploadTask.snapshot.downloadURL;
          updates[key] = {
            ...learningSpace,
            pictureURL
          };
          lsRef.update(updates);
          learningSpace.pictureURL = pictureURL;
          dispatch({
            type: 'UPDATE_LEARNING_SPACE',
            learningSpace
          });
        }
      );
    } else if (pictureFile === '' && badgeFile !== '') {
      var storageRef = firebase.storage().ref();
      uploadTask = storageRef
        .child('images/' + learningSpace.badgeFilename)
        .put(badgeFile);
      uploadTask.on(
        'state_changed',
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          var badgeURL = uploadTask.snapshot.downloadURL;
          updates[key] = {
            ...learningSpace,
            badgeURL
          };
          lsRef.update(updates);
          learningSpace.badgeURL = badgeURL;
          dispatch({
            type: 'UPDATE_LEARNING_SPACE',
            learningSpace
          });
        }
      );
    } else {
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child('images/' + learningSpace.pictureFilename)
        .put(pictureFile);
      uploadTask.on(
        'state_changed',
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          var pictureURL = uploadTask.snapshot.downloadURL;
          uploadTask = storageRef
            .child('images/' + learningSpace.badgeFilename)
            .put(badgeFile);
          uploadTask.on(
            'state_changed',
            function(snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            },
            function(error) {
              // Handle unsuccessful uploads
            },
            function() {
              var badgeURL = uploadTask.snapshot.downloadURL;
              updates[key] = {
                ...learningSpace,
                pictureURL,
                badgeURL
              };
              lsRef.update(updates);
              learningSpace.pictureURL = pictureURL;
              learningSpace.badgeURL = badgeURL;
              dispatch({
                type: 'UPDATE_LEARNING_SPACE',
                learningSpace
              });
            }
          );
        }
      );
    }
  };
};

//Actions for Learning Agreement

export const startLearningAgreements = () => {
  return dispatch => {
    var laRef = firebaseRef.child('learningAgreements');
    laRef.once('value').then(snapshot => {
      initialDataLoaded = true;
      var la = snapshot.val();
      var parsedLA = [];
      if (la !== null) {
        Object.keys(la).forEach(laId => {
          parsedLA[laId] = {
            key: laId,
            ...la[laId]
          };
        });
      }
      dispatch(addLearningAgreements(parsedLA));
    });
  };
};

export function watchLAAddedEvent(dispatch) {
  firebase.database().ref('learningAgreements').on('child_added', snap => {
    if (initialDataLoaded) {
      let la = snap.val();
      la.key = snap.key;
      console.log(la);
      dispatch({
        type: 'ADD_LEARNING_AGREEMENT',
        learningAgreement: la,
        removeKey: null
      });
    }
  });
  firebase.database().ref('learningAgreements').on('child_removed', snap => {
    dispatch({
      type: 'REMOVE_LEARNING_AGREEMENT',
      key: snap.key
    });
  });
}

export const addLearningAgreements = la => {
  return {
    type: 'ADD_LEARNING_AGREEMENTS',
    la
  };
};

export const addLearningAgreement = (learningAgreement, removeKey) => {
  const laRef = firebaseRef.child('learningAgreements');
  const newKey = laRef.push().key;
  let updates = {};
  updates[newKey] = learningAgreement;
  if (removeKey !== null) {
    updates[removeKey] = null;
  }
  laRef.update(updates);
  learningAgreement.key = newKey;
  return {
    type: 'ADD_LEARNING_AGREEMENT',
    learningAgreement,
    removeKey
  };
};

export const removeLearningAgreement = key => {
  const laRef = firebaseRef.child('learningAgreements/' + key);
  laRef.remove();
  return {
    type: 'REMOVE_LEARNING_AGREEMENT',
    key
  };
};

//Actions for Students

export const startStudents = () => {
  return dispatch => {
    var studentsRef = firebaseRef.child('students');
    studentsRef.once('value').then(snapshot => {
      const students = snapshot.val();
      var parsedStudents = [];
      if (students !== null) {
        Object.keys(students).forEach(studentId => {
          parsedStudents[studentId] = {
            key: studentId,
            ...students[studentId]
          };
        });
      }
      dispatch(addStudents(parsedStudents));
    });
  };
};

export const addStudents = students => {
  return {
    type: 'ADD_STUDENTS',
    students
  };
};

export const addStudent = student => {
  return dispatch => {
    const studentRef = firebaseRef.child('students');
    const newKey = studentRef.push().key;
    let updates = {};

    updates[newKey] = {
      ...student
    };
    studentRef.update(updates);
    student.key = newKey;
    dispatch(addS(student));
  };
};

export const addS = student => {
  return {
    type: 'ADD_STUDENT',
    student
  };
};

export const isFetching = () => {
  return {
    type: 'IS_FETCHING'
  };
};

//Actions for grade
export const startGrade = () => {
  return dispatch => {
    var gradeRef = firebaseRef.child('grade');
    gradeRef.once('value').then(snapshot => {
      const grade = snapshot.val();
      var parsedGrade = [];
      if (grade !== null) {
        Object.keys(grade).forEach(gradeId => {
          parsedGrade[gradeId] = {
            key: gradeId,
            ...grade[gradeId]
          };
        });
      }
      dispatch(addGrades(parsedGrade));
    });
  };
};

export const addGrades = grades => {
  return {
    type: 'ADD_GRADES',
    grades
  };
};

export const addGrade = grade => {
  var gradeRef = firebaseRef.child('grade');
  var newKey = gradeRef.push().key;
  var updates = {};
  updates[newKey] = grade;
  gradeRef.update(updates);
  grade.key = newKey;
  return {
    type: 'ADD_GRADE',
    grade
  };
};

export const updateGrade = (grade, key) => {
  var gradeRef = firebaseRef.child('grade');
  var newKey = gradeRef.push().key;
  var updates = {};
  updates[key] = grade;
  gradeRef.update(updates);
  grade.key = key;
  return {
    type: 'UPDATE_GRADE',
    grade
  };
};

//Actions for Selected grade

export const selectGrade = grade => {
  return {
    type: 'SELECT_GRADE',
    grade
  };
};
