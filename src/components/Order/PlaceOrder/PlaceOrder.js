import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import "./PlaceOrder.css"

const PlaceOrder = (props) => {
  const orderType = props.match.params.orderType
  const tableIndex = props.match.params.tableIndex || 'undefined'
  const history = useHistory()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    selectedItems.forEach(item => {
      setTotal(total + item.price)
    })
  }, [selectedItems])

  const selectCategory = (category) => {
    setSelectedCategory({
      name: category.name,
      _id: category._id
    })
  }

  const addItem = (item) => {
    setSelectedItems([...selectedItems, { name: item.name, price: item.price }])
  }

  const addOrder = () => {
    let currOrders = JSON.parse(localStorage.getItem('orders'))
    currOrders = [...currOrders, {
      orderType,
      orderInfo: selectedItems,
      total
    }]

    localStorage.setItem('orders', JSON.stringify(currOrders))
    history.push("/order/take-out")
  }

  const items = () => {
    if (selectedCategory) {
      return props.items.map(item => (
        selectedCategory._id === item.category_id ? 
          <button className="item-button" key={item._id} onClick={() => addItem(item)}>
            <span>{item.name}</span><br/>
            <span>${item.price}</span>
          </button> 
          : ''
      ))
    } else {
      return ''
    }
  }

  return (
    <div className="PlaceOrder">
      <div className="menu-section">
        <div className="category-section">
        {
          props.categories.map(category => (
            <button className="category-button" onClick={() => selectCategory(category)} key={category._id}>{category.name}</button>
          ))
        }
        </div>
        {
          selectedCategory ? 
            <p style={{fontWeight: 'bold', border: '1px solid wheat', minWidth: '150px', margin: 'auto', padding: '5px'}}>{selectedCategory.name}</p> 
            : ''
        }
        <div className="item-section">
        {
          items()
        }
        </div>
      </div>

      <div className="order-section">
        <p>Order-Section</p>
        {
          selectedItems.map((item, i) => (<p key={i}>{item.name}: {item.price}</p>))
        }
        <p>total: {total.toFixed(2)}</p>
        <button onClick={addOrder}>Confirm</button>
        <button onClick={() => history.push("/order/take-out")}>Cancel</button>
      </div>
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
