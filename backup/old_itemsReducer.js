const item = (state, action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return {
        title: action.title,
        hourly_rate: action.hourly,
        tax_rate: action.tax
      }
    case 'TOGGLE_EDIT':
      if (state.title !== action.title) {
        return Object.assign({}, state, {toEdit: false});
      }

      return Object.assign({}, state, {toEdit: !state.toEdit});

    default:
      return state;
  }
}

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_JOB':
      var newJob = item(undefined, action);
      var oldJobsState = {...state.jobs};
      oldJobsState[action.title] = newJob;
      var newJobsState = {...oldJobsState}
      return {...state, jobs: newJobsState};

    case 'ADD_TIME':
      var newTime = item(undefined, action);
      var oldTimeState = {...state.time};
      oldTimeState[action.title] = newTime;
      var newTimeState = {...oldTimeState}
      return {...state, time: newTimeState};

    case 'TOGGLE_EDIT':
      return state.map(j => job(j, action));

    case 'RECV_DATA':
      console.log("jobsReducer action: ", action)
      console.log("jobsReducer data: ", action.data)
      if (action.subject === 'fetchData') {
        var returnState = Object.assign({}, state, action.data);
        console.log("RECV_DATA return state: ", returnState);
        return returnState;
      } else if (action.subject === 'addJob') {
        var newJob = {};
        newJob[action.data.title] = action.data;
        return Object.assign({}, state, newJob)
      } else {
        return state;
      }

    case 'RECV_ERROR':
      console.log("ERROR EXECUTING");
      return Object.assign({}, state, {data: action.data, error: true});

    default:
      return state;
  }
};

export default itemsReducer