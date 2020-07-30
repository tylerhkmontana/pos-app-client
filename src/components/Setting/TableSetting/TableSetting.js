import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import tableSerivce from '../../../services/tableSetting.service.js'
import { connect } from 'react-redux'
import './TableSetting.css'

class TableSetting extends Component {
  state = {
    section: '',
    size_y: 0,
    size_x: 0,
    createNew: true,
    tableStructure: [],
    allSelected: false,
    savedSettings: [],
    selectedSettingId: null
  }

  async componentDidMount() {
    try {
      const savedSettings = (await tableSerivce.getTableSetting()).data
      this.setState({ savedSettings })
    } catch(err) {
      console.log(err)
    }
  }
  

  render() {
    const resetFields = () => {
      this.setState({ 
        createNew: true,
        section: '',
        size_x: 0,
        size_y: 0,
        tableStructure: [],
        allSelected: false })
      this.props.history.push('/setting/table-setting')
    }

    const setSection = (event) => {
      const section = event.target.value
      this.setState({ section })
    }

    const loadSavedSetting = (setting) => {
      const { size_x, size_y, section, tableStructure, _id } = setting
      this.setState({
        size_x,
        size_y,
        section,
        tableStructure,
        createNew: false,
        selectedSettingId: _id
      })
    }

    const tableSetup = (event) => {
      var size_x = this.state.size_x
      var size_y = this.state.size_y
  
      event.target.name === 'size_x' ? size_x = event.target.value : size_y = event.target.value
      
      var tableStructure = []
      var tableSize = size_x * size_y
    
      for(var i = 0; i < tableSize; i++) {
        tableStructure = [...tableStructure, {
          available: false,
          tNumber: null
        }]
      }
      this.setState({
        [event.target.name]: +event.target.value,
        tableStructure
      })
    }

    const makeTableAvailable = (event) => {
      const targetTable = event.target
      if(targetTable.className === 'table') {
        var newTableStructure = [...this.state.tableStructure]
        newTableStructure[targetTable.id].available = !newTableStructure[targetTable.id].available
        this.setState({ tableStructure: newTableStructure })
      }
    }

    const selectAllTableAvailable = () => {
      const newTableStructure = this.state.tableStructure.map(t => ({
        ...t, 
        available: this.state.allSelected ? false : true
      }))
      this.setState({ tableStructure: newTableStructure, allSelected: !this.state.allSelected })
    }

    const setTableNumber = (event) => {
      const tableIndex = event.target.parentNode.id
      const newTableNumber = +event.target.value

      var newTableStructure = [...this.state.tableStructure]
      newTableStructure[tableIndex].tNumber = newTableNumber
      this.setState({ tableStructure: newTableStructure })
    }

    // Save Current Table Setting
    const saveTableSetting = async () => {
      const tableSetting = {
        ...this.state
      }
      try { 
        const response = await tableSerivce.addTableSetting(tableSetting)
        const savedSettings = (await tableSerivce.getTableSetting()).data
        this.setState({ savedSettings })
        resetFields()
        this.props.add_successMsg(response.data)
      } catch(err) {
        console.log(err)
        this.props.add_errMsg(err.response.data)
      }
    }

    // Update Table Setting
    const updateTableSetting = async () => {
      const { 
        savedSettings,
        allSelected,
        createNew,
        ...newSetting
      } = this.state

      try {
        const response = await tableSerivce.updateTableSetting(newSetting)
        resetFields()
        this.props.add_successMsg(response.data)
      } catch(err) {
        console.log(err)
        this.props.add_errMsg(err.response.data)
      }
    }

    // Delete Table Setting
    const deleteTableSetting = async () => {
      try {
        const response = await tableSerivce.deleteTableSetting(this.state.selectedSettingId)
        const savedSettings = (await tableSerivce.getTableSetting()).data
        this.setState({ savedSettings })
        this.props.add_successMsg(response.data)
        resetFields()
      } catch(err) {
        console.log(err)
        this.props.add_errMsg(err.response.data)
      }
    }

    const tableStyle = (index) => {
      return {
        backgroundColor: this.state.tableStructure[index].available ? 'rgb(92, 161, 122)' : 'grey'
      }
    }

    // Create Tables
    const tables = []
    var tableIndex = 0
    for(var y = 0; y < this.state.size_y; y++) {
      var tableRow = []
      for(var x = 0; x < this.state.size_x; x++) {
        tableRow.push(
          <div 
            className="table" 
            style={tableStyle(tableIndex)} 
            id={tableIndex} 
            key={y + x} 
            onClick={makeTableAvailable}>
              {this.state.tableStructure[tableIndex].available ? 
                <input 
                  type="number" 
                  className="table-number"
                  placeholder="table#" 
                  value={this.state.tableStructure[tableIndex].tNumber || ''}
                  onChange={setTableNumber}/> : <p style={{ marginTop: '10px' }}>unused</p>}
          </div>
        )
        tableIndex++
      }   
      tables.push(<div className="table-row" key={y + x}>{tableRow}</div>)
    }
    return (
      <div className="TableSetting">
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
          {
            this.state.savedSettings.map(setting => (
              <NavLink 
                to={`/setting/table-setting/${setting._id}`} 
                className="saved-settings" 
                activeClassName="saved-settings-active"
                key={setting._id} 
                onClick={() => loadSavedSetting(setting)}>
                {setting.section}
              </NavLink>
            ))
          }
        </div>

        <NavLink 
          exact
          to="/setting/table-setting"
          className="create-new"
          activeClassName="create-new-active" 
          onClick={resetFields}>
            Create New
        </NavLink>

        {
          this.state.createNew ?
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="input-group-table">
              <span style={{ fontSize: 'large' }}>Table Size: </span>
              <input
                className="input-size" 
                placeholder="x"
                type="number" 
                name="size_x"
                value={this.state.size_x}
                onChange={tableSetup}/>
              <input
                className="input-size" 
                placeholder="y"
                type="number" 
                name="size_y"
                value={this.state.size_y}
                onChange={tableSetup}/> 
            </div>
            <div className="input-group-table"> 
              <span style={{ fontSize: 'large' }}>Section: </span>
              <input 
                className="input-section"
                type="text" 
                placeholder="table-section"
                value={this.state.section}
                onChange={setSection}/>
            </div>
          </div> 
          : ''
        }
        

        <div className="table-container">
          {tables}
        </div>
        {
          this.state.createNew ? 
            this.state.size_x > 0 && this.state.size_y > 0 ?
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="setting-button" onClick={selectAllTableAvailable}>
                  {this.state.allSelected ? 'Reset' : 'Select All'}
                </button>
                <button className="setting-button" onClick={saveTableSetting}>
                  Save
                </button>
              </div> : ''
            : 
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="setting-button" style={{ backgroundColor: 'crimson' }} onClick={deleteTableSetting}>
                delete
              </button>
              <button className="setting-button" onClick={updateTableSetting}>
                update
              </button>
            </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add_successMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'success', msg } }),
    add_errMsg: (msg) => dispatch({ type: 'ADD_MESSAGE', payload: { msg_type: 'error', msg } })
  }
}
export default connect(null, mapDispatchToProps)(withRouter(TableSetting))
