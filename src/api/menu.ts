import request from '@/utils/request'
// 菜单基础URL
const MENU_BASE_URL1 = '/api/v1/menus'
const MENU_BASE_URL = '/api/mock/menus'

class MenuAPI {
  /**
   * 获取当前用户的路由列表
   * <p/>
   * 无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
   *
   * @returns 路由列表
   */
  static getRoutes() {
    return request<any, Menu.RouteVO[]>({
      url: `${MENU_BASE_URL}/routes`,
      method: 'get'
    })
  }

  /**
   * 获取菜单树形列表
   *
   * @param queryParams 查询参数
   * @returns 菜单树形列表
   */
  static getList(queryParams: Menu.MenuQuery) {
    return request<any, Menu.MenuVO[]>({
      url: `${MENU_BASE_URL}`,
      method: 'get',
      params: queryParams
    })
  }

  /**
   * 获取菜单下拉数据源
   *
   * @returns 菜单下拉数据源
   */
  static getOptions() {
    return request<any, OptionType[]>({
      url: `${MENU_BASE_URL}/options`,
      method: 'get'
    })
  }

  /**
   * 获取菜单表单数据
   *
   * @param id 菜单ID
   */
  static getFormData(id: number) {
    return request<any, Menu.MenuForm>({
      url: `${MENU_BASE_URL}/${id}/form`,
      method: 'get'
    })
  }

  /**
   * 添加菜单
   *
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  static add(data: Menu.MenuForm) {
    return request({
      url: `${MENU_BASE_URL}`,
      method: 'post',
      data: data
    })
  }

  /**
   * 修改菜单
   *
   * @param id 菜单ID
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  static update(id: string, data: Menu.MenuForm) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: 'put',
      data: data
    })
  }

  /**
   * 删除菜单
   *
   * @param id 菜单ID
   * @returns 请求结果
   */
  static deleteById(id: number) {
    return request({
      url: `${MENU_BASE_URL}/${id}`,
      method: 'delete'
    })
  }
}

export default MenuAPI
