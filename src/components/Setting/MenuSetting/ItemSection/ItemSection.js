import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import menuSettingService from '../../../../services/menuSetting.service'
import './ItemSection.css'
 
const ItemSection = (props) => {
  const category_id = props.match.params.category_id
  const category = props.categories.filter(category => (category._id === category_id))[0]

  const [isCreate, setIsCreate] = useState(true)
  const [itemInfo, setItemInfo] = useState({
    _id: "",
    name: "",
    orderType: [],
    price: "",
    category_id: props.match.params.category_id
  })

  const resetFields = async rePopulate => {
    setItemInfo({
      _id: "",
      name: "",
      orderType: [],
      price: "",
      category_id: props.match.params.category_id
    })
    setIsCreate(true)
    if (rePopulate) {
      const { items, categories } = (await menuSettingService.getMenu()).data
      props.populate_menu(categories, items)
    }
  }

  useEffect(() => {
    resetFields(false)
  }, [props.match.params.category_id])

  const setOrderType = event => {
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

  //Add Item 
  const addItem = async () => {
    try {
      await menuSettingService.addItem(itemInfo)
      resetFields(true)
      props.add_successMsg("Successfully created the item")
    } catch(err) {
      props.add_errMsg(err.response.data)
    }
  }

  //Update Item
  const updateItem = async () => {
    try {
      await menuSettingService.updateItem(itemInfo)
      resetFields(true)
      props.add_successMsg("Successfully updated the item")
    } catch(err) {
      props.add_errMsg(err.response.data)
    }
  }

  //Delete Item
  const deleteItem = async () => {
    try {
      await menuSettingService.deleteItem(itemInfo._id)
      resetFields(true)
      props.add_successMsg("Successfully deleted the item")
    } catch(err) {
      props.add_errMsg(err.response.data)
    }
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

        {
          typeof category !== 'undefined' ? category.orderType.map((type, i) => (
            <div className="input-group" key={i}>
              <input 
                type="checkbox" 
                id={type} 
                value={type}
                checked={itemInfo.orderType.includes(type)}
                onChange={event => setOrderType(event)}/>
              <label htmlFor={type}>{type}</label>
            </div>
          )) :
          ""
        }

        <div className="button-group">
          { 
            isCreate ?
              <button onClick={addItem}>Create</button> :
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button 
                  className="delete-button" 
                  onClick={deleteItem}>Delete</button>
                <button onClick={updateItem}>Update</button>
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

const mapDispatchToProps = dispatch => {
  return {
    add_successMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'success', msg } }),
    add_errMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'error', msg } }),
    populate_menu: (categories, items) => dispatch({ type: 'POPULATE_MENU', payload: { categories, items } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSection)
