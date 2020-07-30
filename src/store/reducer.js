const initialState = {
  success_msg: [],
  error_msg: [],
}

const addMessage = function(type, msg) {
  return type === 'success' ? {
    ...this,  
    success_msg: [...this.success_msg, msg]
  } : {
    ...this,
    error_msg: [...this.error_msg, msg]
  }
}

const deleteMessage = function(type, index){
  if(type === 'success') {
    let success_msg = [...this.success_msg]
    return {
      ...this,
      success_msg: [...success_msg.slice(0, index), ...success_msg.slice(index + 1)]
    }
  } else if(type === 'error') {
    let error_msg = this.error_msg
    return {
      ...this,
      error_msg: [...error_msg.slice(0, index), ...error_msg.slice(index + 1)]
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'DELETE_MESSAGE':
      return deleteMessage.apply(state, [action.payload.msg_type, action.payload.msg_index])
    case 'ADD_MESSAGE':
      return addMessage.apply(state, [action.payload.msg_type, action.payload.msg])
    default:
      return state
  }
}

export default reducer
