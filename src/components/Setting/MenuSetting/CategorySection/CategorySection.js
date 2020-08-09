import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import menuSettingService from '../../../../services/menuSetting.service'
import './CategorySection.css'

const CategorySection = (props) => {
  const [isCreate, setIsCreate] = useState(true)
  const [categoryInfo, setCategoryInfo] = useState({
    id: "",
    name: "",
    orderType: []
  })

  const resetFields = async () => {
    setIsCreate(true)
    setCategoryInfo({
      id: "",
      name: "",
      orderType: []
    })
    const { items, categories } = (await menuSettingService.getMenu()).data
    props.populate_menu(categories, items)
  }

  // Select exsiting category
  const selectCategory = (category_id) => {
    const targetCategory = props.categories.filter(category => category._id === category_id)
  
    console.log(targetCategory[0])
    setCategoryInfo({
      id: targetCategory[0]._id,
      name: targetCategory[0].name,
      orderType: targetCategory[0].orderType
    })

    setIsCreate(false)
  }

  // Add Order Type 
  const addOrderType = event => {
    const orderType = event.target.value

    if (event.target.checked) {
      setCategoryInfo({
        ...categoryInfo,
        orderType: [
          ...categoryInfo.orderType,
          orderType
        ]
      })
    } else {
      let currOrderType = categoryInfo.orderType
      let newOrderType = [...currOrderType.splice(0, currOrderType.indexOf(orderType)), ...currOrderType.splice(currOrderType.indexOf(orderType) + 1)]

      setCategoryInfo({
        ...categoryInfo,
        orderType: newOrderType
      })
    }
  }

  //Create Category
  const createCategory = async () => {
    try {
      await menuSettingService.addCategory(categoryInfo)

      resetFields()
      props.add_successMsg("Successfully created a category")
    } catch(err) {
      props.add_errMsg(err.response.data)
    }
  }

  //Update Category
  const updateCategory = async () => {
    if (categoryInfo.id) {
      try {
        await menuSettingService.updateCategory(categoryInfo)
        resetFields()
        props.add_successMsg("Successfully updated the category")
      } catch(err) {
        props.add_errMsg(err.response.data)
      }
    }
  }

  //Delete Category 
  const deleteCategory = async () => {
    if (categoryInfo.id) {
      try {
        await menuSettingService.deleteCategory(categoryInfo.id)
        resetFields()
        props.add_successMsg("Successfully deleted the category")
      } catch(err) {
        props.add_errMsg(err.response.data)
      }
    }
  }

  return (
    <div className="CategorySection">
      <div className="category-collection">
        {props.categories.map(category => 
          <NavLink 
            to={`/setting/menu-setting/${category._id}`} 
            className="category-button" 
            key={category._id}
            activeStyle={{ backgroundColor: 'white' }}
            onClick={() => selectCategory(category._id)}>{category.name}</NavLink>)}
        <NavLink 
          exact to="/setting/menu-setting" 
          className="add-category-button" 
          activeStyle={{ backgroundColor: 'white' }}
          onClick={resetFields}>+</NavLink>
      </div>
      <div className="category-create">

        <p>Category Name</p>
        <input type="text" placeholder="new category name" value={categoryInfo.name} onChange={(event) => setCategoryInfo({...categoryInfo, name: event.target.value})}/>  
      
        <p>Order Type</p>
     
        <div className="input-group">
          <input type="checkbox" id="dine-in" value="dine-in" checked={categoryInfo.orderType.includes("dine-in")} onChange={ event => addOrderType(event)}/>
          <label htmlFor="dine-in">dine-in</label>
        </div>
        <div className="input-group">
          <input type="checkbox" id="take-out" value="take-out" checked={categoryInfo.orderType.includes("take-out")} onChange={ event => addOrderType(event)} />
          <label htmlFor="take-out">take-out</label>
        </div>
        <div className="input-group">
          <input type="checkbox" id="delivery" value="delivery" checked={categoryInfo.orderType.includes("delivery")} onChange={ event => addOrderType(event)} />
          <label htmlFor="delivery">delivery</label>
        </div>

        <div className="button-group">
          { 
            isCreate ?
              <button onClick={createCategory}>Create</button> :
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button style={{ color: 'crimson', border: '1px solid crimson' }} onClick={deleteCategory}>Delete</button>
                <button onClick={updateCategory}>Update</button>
              </div>
          }
        </div>
    </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategorySection)

