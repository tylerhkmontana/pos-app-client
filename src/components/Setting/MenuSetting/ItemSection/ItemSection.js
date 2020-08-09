import React from 'react'
import { connect } from 'react-redux'
 
const ItemSection = (props) => {
  const category_id = props.match.params.category_id
  return (
    <div>
      {
        props.items.map(item => {
          return item.category_id === category_id ? <p key={item._id}>{item.name}</p> : ''
        })
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(ItemSection)
