import api from '../config/api.config.js'

export default {
  getTableSetting() {
    return api.get("/table-setting")
  },
  addTableSetting(tableSetting) {
    return api.post('/table-setting/save', { tableSetting })
  },
  updateTableSetting(newSetting) {
    return api.put('/table-setting/update', { newSetting })
  },
  deleteTableSetting(id) {
    return api.delete('/table-setting/delete', { data: { id } })
  }
}