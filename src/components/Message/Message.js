import React from 'react'
import { connect } from 'react-redux'
import './Message.css'

const Message = (props) => {
  return (
    <div className="Message">
      {props.success_msg.map((msg, i) => (
        <div className="success-msg" key={i}>
          <button className="close-message" onClick={() => props.delete_msg({ msg_type: 'success', msg_index: i })}>X</button>
          <span>{msg}</span>
        </div>
      ))}
     
      {props.error_msg.map((msg, i) => (
        <div className="error-msg" key={i}>
          <button className="close-message" onClick={() => props.delete_msg({ msg_type: 'error', msg_index: i })}>X</button>
          <span>{msg}</span>
        </div>
      ))}
     
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error_msg: state.error_msg,
    success_msg: state.success_msg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete_msg: (payload) => dispatch({ type: 'DELETE_MESSAGE', payload})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)