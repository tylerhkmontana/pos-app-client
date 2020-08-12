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
  },
  addCategory(categoryInfo) {
    return api.post('/menu-setting/category', { ...categoryInfo })
  },
  updateCategory(newCategoryInfo) {
    return api.put('/menu-setting/category/update', { ...newCategoryInfo })
  },
  deleteCategory(id) {
    return api.delete('/menu-setting/category/delete', { data: { id } })
  },
  addItem(itemInfo) {
    return api.post('/menu-setting/item', { ...itemInfo })
  },
  updateItem(newItemInfo) {
    return api.put('/menu-setting/item/update', { ...newItemInfo })
  },
  deleteItem(id) {
    return api.delete('/menu-setting/item/delete', { data: { id } })
  }
}

export default menuSettingService