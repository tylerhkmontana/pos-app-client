import React, { useState } from 'react'
import { connect } from 'react-redux'
import './ItemSection.css'
 
const ItemSection = (props) => {
  const category_id = props.match.params.category_id
  const category = props.categories.filter(category => (category._id === category_id))[0]

  const [isCreate, setIsCreate] = useState(true)
  const [itemInfo, setItemInfo] = useState({
    name: "",
    orderType: [],
    price: "",
    category_id: ""
  })

  const resetFields = () => {
    setItemInfo({
      name: "",
      orderType: [],
      price: "",
      category_id: ""
    })
    setIsCreate(true)
  }

  const addOrderType = event => {
    const orderType = event.target.value

    if (event.target.checked) {
      setItemInfo({
        ...itemInfo,
        orderType: [
          ...itemInfo.orderType,
          orderType
        ]
      })
    } else {
      let currOrderType = itemInfo.orderType
      let newOrderType = [...currOrderType.splice(0, currOrderType.indexOf(orderType)), ...currOrderType.splice(currOrderType.indexOf(orderType) + 1)]

      setItemInfo({
        ...itemInfo,
        orderType: newOrderType
      })
    }
  }

  const selectItem = item_id => {
    const selectedItem = props.items.filter(item => (item._id === item_id))
    setIsCreate(false)
    setItemInfo({
      ...selectedItem[0]
    })
  }
  return (
    <div className="ItemSection">
      <div className="item-collection">
        {
          props.items.map(item => {
            return item.category_id === category_id ? <span className="item-button" key={item._id} onClick={() => selectItem(item._id)}>{item.name}<br/>${item.price}</span> : ''
          })
        }
        <span className="add-item-button" style={{ backgroundColor: isCreate ? 'white' : 'slateblue' }} onClick={resetFields}>+</span>
      </div>
      
      <div className="item-create">
        <p>Item Name</p>
        <input type="text" placeholder="item name" value={itemInfo.name} onChange={event => {
          const itemName = event.target.value

          setItemInfo({
            ...itemInfo,
            name: itemName
          })
        }}/>

        <p>Item Price</p>
        <input type="number" placeholder="item price ($)" value={itemInfo.price} onChange={event => {
          const itemPrice = +event.target.value

          setItemInfo({
            ...itemInfo,
            price: itemPrice
          })
        }}/>
        <p>Order Type</p>
     
        <div className="input-group">
          <input 
            type="checkbox" 
            id="dine-in" 
            value="dine-in" 
            checked={itemInfo.orderType.includes("dine-in")} 
            disabled={typeof category === 'undefined' ? false : !category.orderType.includes("dine-in")}
            onChange={event => addOrderType(event)}/>
          <label htmlFor="dine-in">dine-in</label>
        </div>
        <div className="input-group">
          <input 
            type="checkbox" 
            id="take-out" 
            value="take-out" 
            checked={itemInfo.orderType.includes("take-out")} 
            disabled={typeof category === 'undefined' ? false : !category.orderType.includes("take-out")}
            onChange={event => addOrderType(event)}/>
          <label htmlFor="take-out">take-out</label>
        </div>
        <div className="input-group">
          <input 
            type="checkbox" 
            id="delivery" 
            value="delivery" 
            checked={itemInfo.orderType.includes("delivery")}
            disabled={typeof category === 'undefined' ? false : !category.orderType.includes("delivery")}
            onChange={event => addOrderType(event)}/>
          <label htmlFor="delivery">delivery</label>
        </div>

        <div className="button-group">
          { 
            isCreate ?
              <button onClick={() => console.log(itemInfo)}>Create</button> :
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button 
                  className="delete-button" 
                  style={{ color: 'crimson', border: '1px solid crimson' }}>Delete</button>
                <button onClick={() => console.log(itemInfo)}>Update</button>
              </div>
          }
        </div>
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

export default connect(mapStateToProps)(ItemSection)
