import piniaPersistConfig from '@/stores/persistConfig'

export const useTabsViewStore = defineStore('tabsView', () => {
  const tabsViews = ref<TagView[]>([])
  const cachedViews = ref<string[]>([])
  const router = useRouter()
  const route = useRoute()

  /**
   * 添加已访问视图到已访问视图列表中
   */
  function addTabsView(view: TagView) {
    // 如果已经存在于已访问的视图列表中或者是重定向地址，则不再添加
    if (view.path.startsWith('/redirect')) {
      return
    }
    if (tabsViews.value.some((v) => v.name === view.name)) {
      return
    }
    // 如果视图是固定的（affix），则在已访问的视图列表的开头添加
    if (view.isAffix) {
      tabsViews.value.unshift(view)
    } else {
      // 如果视图不是固定的，则在已访问的视图列表的末尾添加
      tabsViews.value.push(view)
    }
  }

  /**
   * 添加缓存视图到缓存视图列表中
   */
  function addCachedView(view: TagView) {
    const viewName = view.name
    // 如果缓存视图名称已经存在于缓存视图列表中，则不再添加
    if (cachedViews.value.includes(viewName)) {
      return
    }

    // 如果视图需要缓存（keepAlive），则将其路由名称添加到缓存视图列表中
    if (view.isKeepAlive) {
      cachedViews.value.push(viewName)
    }
  }

  /**
   * 从已访问视图列表中删除指定的视图
   */
  function delTabsView(viewName: string): TagView | null {
    const index = tabsViews.value.findIndex((v) => v.name === viewName)
    if (index > -1) {
      // 删除匹配的视图
      tabsViews.value.splice(index, 1)
  
      // 判断是否是当前路由
      if (route.name === viewName) {
        // 如果是当前路由，则获取前一个标签页的索引
        const previousTab = tabsViews.value[index - 1] || tabsViews.value[index]
        // 如果前一个标签页的名称与当前路由的名称不同，则跳转到前一个标签页
        if (previousTab && previousTab.name !== route.name) {
          router.push({ name: previousTab.name }) // 跳转到前一个标签页
          return previousTab
        }
      }
    }
    return null // 如果没有删除当前路由或没有前一个标签页，则返回 null
  }

  /**
   * @description: 从缓存列表中删除指定的视图
   * @param {TagView} view
   * @return {*}
   */
  function delCachedView(viewName: string) {
    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(viewName)
      if (index > -1) {
        cachedViews.value.splice(index, 1)
      }
      resolve([...cachedViews.value])
    })
  }

  /**
   * @description: 删除其他标签
   * @param viewName
   * @return {*}
   */
  function delOtherTabsViews(viewName: string) {
    return new Promise((resolve) => {
      tabsViews.value = tabsViews.value.filter((v) => {
        return v?.isAffix || v.name === viewName
      })
      resolve([...tabsViews.value])
    })
  }

  function delOtherCachedViews(viewName: string) {
    return new Promise((resolve) => {
      if (cachedViews.value.includes(viewName)) {
        // 保留当前视图的缓存
        cachedViews.value = [viewName]
      } else {
        // 如果当前视图不在缓存中，清空缓存
        cachedViews.value = []
      }
      resolve([...cachedViews.value])
    })
  }

  function addView(view: TagView) {
    addTabsView(view)
    addCachedView(view)
  }

  function delView(viewName: string) {
    return new Promise((resolve) => {
      delTabsView(viewName)
      delCachedView(viewName)
      resolve({
        tabsViews: [...tabsViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delOtherViews(viewName: string) {
    return new Promise((resolve) => {
      delOtherTabsViews(viewName)
      delOtherCachedViews(viewName)
      resolve({
        tabsViews: [...tabsViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delAllViews() {
    return new Promise((resolve) => {
      const affixTags = tabsViews.value.filter((tag) => tag?.isAffix)
      tabsViews.value = affixTags
      cachedViews.value = []
      resolve({
        tabsViews: [...tabsViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delAlltabsViews() {
    return new Promise((resolve) => {
      const affixTags = tabsViews.value.filter((tag) => tag?.isAffix)
      tabsViews.value = affixTags
      resolve([...tabsViews.value])
    })
  }

  function delAllCachedViews() {
    return new Promise((resolve) => {
      cachedViews.value = []
      resolve([...cachedViews.value])
    })
  }

  /**
   * 关闭当前tagView
   */
  function closeCurrentTab(viewName: string) {
    if (viewName === route.name) {
      const index = tabsViews.value.findIndex((v) => v.name === viewName)
      const nextView = tabsViews.value[index + 1] || tabsViews.value[index - 1]
      if (nextView) {
        router.push(nextView.fullPath)
      }
    }
    delView(viewName)
  }

  function isActive(viewName: string) {
    return viewName === route.name
  }

  function setTabsView(view: TagView[]) {
    tabsViews.value = view
  }
  return {
    tabsViews,
    cachedViews,
    addTabsView,
    addCachedView,
    delTabsView,
    delCachedView,
    delOtherTabsViews,
    delOtherCachedViews,
    addView,
    delView,
    delOtherViews,
    delAllViews,
    delAlltabsViews,
    delAllCachedViews,
    closeCurrentTab,
    isActive,
    setTabsView
  }
}, 
{
  persist: piniaPersistConfig('tabs', ['tabsViews', 'cachedViews'], sessionStorage)
})
