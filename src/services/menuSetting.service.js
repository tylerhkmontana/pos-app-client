import api from '../config/api.config.js'

const menuSettingService = {
  getMenu() {
    return api.get('/menu-setting')
  },
  getCategories() {
    return api.get('/menu-setting/category')
  },
  getItems() {
    return api.get('/menu-setting/item')
  }
}

export default menuSettingService