import axios from 'axios'

export const msToISO = (ms) => {
  var d = new Date(Number(ms));
  var date = d.toISOString().split('T')[0];
  return date;
}

function requestData() {
  return {type: 'REQ_DATA'}
};

function receiveError(json, subject) {
  return {
    type: 'RECV_ERR',
    data: {},
  }
};

function receiveData(json, subject) {
  return {
    type: 'RECV_DATA',
    data: json
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleEdit = (id) => {
  return {
    type: 'TOGGLE_EDIT',
    id
  }
}

function stateSaveError() {
  return {
    type: 'STATE_SAVE_ERROR'
  }
}

function stateSaved() {
  return {
    type: 'STATE_SAVED'
  }
}

function stateSaveStart() {
  return {
    type: 'STATE_SAVE_REQUESTED'
  }
}

export const addJob = (title, hourly, tax) => {
  return {
    type: 'ADD_JOB',
    title,
    hourly,
    tax
  }
}

export const addTime = (title, minutes, summary) => {
  return {
    type: 'ADD_TIME',
    title,
    minutes,
    summary
  }
}

export const deleteJob = (title) => {
  return {
    type: 'DELETE_JOB',
    title
  }
}

export const deleteTime = (id) => {
  return {
    type: 'DELETE_TIME',
    id
  }
}

let csrfToken = getCookie('csrftoken');
export const saveState = () => {
  console.log(2, 'saveState AC called');
  return (dispatch, getState) => {
    dispatch(stateSaveStart());
    console.log(3, "Dispatching saveState");
    return axios({
      method: 'post',
      url: '/api/data',
      data: getState().displayItems.data,
      headers: {"X-CSRFToken": csrfToken},
      responseType: 'json'
    })
      .then((response) => {
        console.log("4a SUCCESS Reponse data ", response.data)
        dispatch(stateSaved());
      })
      .catch((response) => {
        console.log("4b ERROR Reponse data ", response.data)
        dispatch(stateSaveError());
      })
  }
}



export const fetchData = () => {
  console.log(2, 'AC Called:');
  return (dispatch) => {
    console.log(3, 'Dispatching Data Request');
    dispatch(requestData());
    return axios({
      url: "/api/data",
      method: 'get'
    })
      .then((response) => {
        console.log('4a', 'Data Found:', response.data);
        dispatch(receiveData(response.data));
      })
      .catch((response) => {
        console.log('4b', 'Data Error:', response.data);
        dispatch(receiveError(response.data));
      })
  }
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
