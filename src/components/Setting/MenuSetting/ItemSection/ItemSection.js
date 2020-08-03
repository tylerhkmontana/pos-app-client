import React from 'react'
import { connect } from 'react-redux'

const ItemSection = (props) => {
  return (
    <div>
      {props.items.map(item => <p key={item._id}>{item.name}</p>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(ItemSection)
