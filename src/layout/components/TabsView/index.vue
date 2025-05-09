<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="activeName" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          v-for="item in tabsViews"
          :key="item.path"
          :label="item.title"
          :name="item.name"
          :closable="!item.isAffix"
        >
          <template #label>
            <MenuIcon :icon="item?.icon" class="mr-1" />
            <span>{{ translateRouteTitle(item?.title || '') }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useTabsViewStore, useAuthStore } from '@/stores'
import { translateRouteTitle } from '@/utils/i18n'
import MenuIcon from '@/components/MenuIcon/index.vue' // 提取的图标组件
import { TabsPaneContext, TabPaneName } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tabStore = useTabsViewStore()
const authStore = useAuthStore()
const appStore = useAppStore()

const activeName = ref(route.name as string)
const tabsViews = computed(() => tabStore.tabsViews)
const tabsIcon = computed(() => appStore.tabsIcon)

onMounted(() => {
  tabsDrop()
  initTabs()
})

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.name,
  () => {
    if (route.meta.isFull) return
    activeName.value = route.name as string
    const tabsParams: TagView = {
      path: route.path,
      fullPath: route.fullPath,
      name: String(route.name),
      title: (route.meta?.title as string) || 'no-name',
      isAffix: (route.meta?.isAffix as boolean) || false,
      isKeepAlive: (route.meta?.isKeepAlive as boolean) || false,
      icon: route.meta.icon as string,
      query: route.query
    }
    tabStore.addView(tabsParams)
  },
  { immediate: true }
)

// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatMenuListGet.forEach((item: Menu.RouteVO) => {
    if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams: TagView = {
        path: item.path,
        fullPath: item.path,
        name: String(item.name),
        title: (item.meta?.title as string) || 'no-name',
        isAffix: (item.meta?.isAffix as boolean) || false,
        isKeepAlive: (item.meta?.isKeepAlive as boolean) || false,
        icon: item.meta.icon as string,
        query: item.meta.params
      }
      tabStore.addTabsView(tabsParams)
    }
  })
}

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item',
    animation: 300,
    //表示拖拽后和拖拽前的索引位置
    onEnd({ newIndex, oldIndex }: Sortable.SortableEvent) {
      // 获取当前标签视图列表：
      const tabsList = [...tabStore.tabsViews]
      // 移除旧位置的标签项
      const currRow = tabsList.splice(oldIndex as number, 1)[0]
      // 插入到新位置
      tabsList.splice(newIndex as number, 0, currRow)
      tabStore.setTabsView(tabsList)
    }
  })
}

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const name = tabItem.props.name as string
  router.push({ name })
}

// Remove Tab
const tabRemove = (name: TabPaneName) => {
  tabStore.delView(name as string)
}
</script>

<style scoped lang="scss">
:deep(.el-tabs .el-tabs__item.is-active::before) {
  bottom: 1px;
}
.tabs-box {
  box-sizing: border-box;
  height: $tabs-view-height;
  padding: 0 $spacing-md;
  border-bottom: 1px solid $border-color;
  border-left: none;
}
</style>
