import request from '@/utils/request'

const USER_BASE_URL = '/api/user/v1'

class UserAPI {
  /**
   * 获取当前登录用户信息
   *
   * @returns 登录用户昵称、头像信息，包括角色和权限
   */
  static selectUserInfo(userId: any) {
    return request({
      url: `${USER_BASE_URL}/selectUserInfo?userId=${userId}`,
      method: 'get'
    })
  }

  // /**
  //  * 导出用户
  //  *
  //  * @param queryParams 查询参数
  //  */
  // static export(queryParams: UserPageQuery) {
  //   return request({
  //     url: `${USER_BASE_URL}/export`,
  //     method: 'get',
  //     params: queryParams,
  //     responseType: 'arraybuffer'
  //   })
  // }

  // /**
  //  * 导入用户
  //  *
  //  * @param deptId 部门ID
  //  * @param file 导入文件
  //  */
  // static import(deptId: number, file: File) {
  //   const formData = new FormData()
  //   formData.append('file', file)
  //   return request({
  //     url: `${USER_BASE_URL}/import`,
  //     method: 'post',
  //     params: { deptId: deptId },
  //     data: formData,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // }
}

export default UserAPI
