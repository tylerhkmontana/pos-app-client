import React, { useState } from 'react'
import { connect } from 'react-redux'

const PlaceOrder = (props) => {
  const orderType = props.match.params.orderType
  const tableIndex = props.match.params.tableIndex || 'undefined'

  const [selectedCategory, setSelectedCategory] = useState(null)

  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div>
      <p>Place Order({orderType})</p>
      {
        props.categories.map(category => (
          <button onClick={() => selectCategory(category._id)} key={category._id}>{category.name}</button>
        ))
      }

      {
        props.items.map(item => (
          selectedCategory === item.category_id ? <button key={item._id}>{item.name}</button> : ''
        ))
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    items: state.items,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(PlaceOrder)
