import React from 'react'
import { connect } from 'react-redux'

const CategorySection = (props) => {
  return (
    <div>
      {props.categories.map(category => <p key={category._id}>{category.name}</p>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(CategorySection)

