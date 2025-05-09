<template>
  <div class="layout" :class="layoutClass">
    <!-- 移动端遮罩层 -->
    <div v-if="isMobile && isSidebarOpen" class="layout__overlay" @click="handleCloseSidebar" />

    <!-- 侧边栏 -->

    <Sidebar class="layout__sidebar" />

    <!-- 混合布局 -->
    <div v-if="layout === LayoutEnum.MIX" class="layout__container">
      <!-- 左侧菜单栏 -->
      <div class="layout__sidebar--left">
        <el-scrollbar>
          <SidebarMenu :data="mixLeftMenuList" :base-path="activeTopMenuPath" />
        </el-scrollbar>
        <!-- 侧边栏切换按钮 -->
        <div class="layout__sidebar-toggle">
          <Hamburger :is-active="appStore.sidebar.opened" @toggle-click="handleToggleSidebar" />
        </div>
      </div>
      <!-- 主内容区域 -->
      <div :class="{ hasTabsView: isShowTabsView }" class="layout__main">
        <TabsView v-if="isShowTabsView" />
        <Main />
        <Settings v-if="defaultSettings.showSettings" />
        <!-- 返回顶部按钮 -->
        <el-backtop target=".app-main">
          <div class="i-svg:backtop w-6 h-6" />
        </el-backtop>
      </div>
    </div>

    <!-- 左侧或顶部布局的主内容区 -->
    <div v-else :class="{ hasTabsView: isShowTabsView }" class="layout__main">
      <NavBar v-if="layout === LayoutEnum.LEFT" />
      <TabsView v-if="isShowTabsView" />
      <Main />
      <Settings v-if="defaultSettings.showSettings" />
      <!-- 返回顶部按钮 -->
      <el-backtop target=".app-main">
        <div class="i-svg:backtop w-6 h-6" />
      </el-backtop>
    </div>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import TabsView from './components/TabsView/index.vue'
// 状态管理
import { useAppStore, useAuthStore } from '@/stores'

// 配置
import defaultSettings from '@/settings'

// 枚举
import { DeviceEnum } from '@/enums/settings/DeviceEnum'
import { LayoutEnum } from '@/enums/settings/LayoutEnum'

// 组件
import NavBar from './components/NavBar/index.vue'
import { useWindowSize } from '@vueuse/core'

const appStore = useAppStore()
const authStore = useAuthStore()
const width = useWindowSize().width

// 常量
const WIDTH_DESKTOP = 992 // 响应式布局容器固定宽度（大屏 >=1200px，中屏 >=992px，小屏 >=768px）

// 计算属性
const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE) // 是否为移动设备
const isSidebarOpen = computed(() => appStore.sidebar.opened) // 侧边栏是否展开
const isShowTabsView = computed(() => appStore.tabsView) // 是否显示标签视图
const layout = computed(() => appStore.layout) // 当前布局模式（left、top、mix）
const activeTopMenuPath = computed(() => appStore.activeTopMenuPath) // 顶部菜单激活路径
const mixLeftMenuList = computed(() => authStore.mixLeftMenuList) // 混合布局左侧菜单路由

// 监听顶部菜单激活路径变化，更新混合布局左侧菜单路由
watch(
  () => activeTopMenuPath.value,
  (newVal: string) => {
    authStore.setMixLeftMenuList(newVal)
  },
  { deep: true, immediate: true }
)

// 监听窗口宽度变化，调整设备类型和侧边栏状态
watchEffect(() => {
  const isDesktop = width.value >= WIDTH_DESKTOP
  appStore.setGlobalState('device', isDesktop ? DeviceEnum.DESKTOP : DeviceEnum.MOBILE)
  if (isDesktop) {
    appStore.openSideBar()
  } else {
    appStore.closeSideBar()
  }
})

// 监听路由变化，如果是移动设备且侧边栏展开，则关闭侧边栏
const route = useRoute()
watch(route, () => {
  if (isMobile.value && isSidebarOpen.value) {
    appStore.closeSideBar()
  }
})

// 计算属性：布局样式
const layoutClass = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  mobile: appStore.device === DeviceEnum.MOBILE,
  [`layout-${appStore.layout}`]: true
}))

/**
 * 处理遮罩层点击事件，关闭侧边栏
 */
function handleCloseSidebar() {
  appStore.closeSideBar()
}

/**
 * 处理切换侧边栏的展开/收起状态
 */
function handleToggleSidebar() {
  appStore.toggleSidebar()
}
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 30%);
  }
  &__sidebar {
    z-index: 999;
    width: $sidebar-width;
    background-color: $menu-background;
    transition: width 0.28s ease;
    // will-change: width;
  }
  &__main {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    transition: width 0.28s ease;
  }
}
// 占位符选择器
/* stylelint-disable-next-line scss/percent-placeholder-pattern */
%layout__sidebar--horizontal {
  width: 100% !important;
  height: $navbar-height;
  :deep(.el-scrollbar) {
    flex: 1;
    height: $navbar-height;
  }
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title),
  :deep(.el-menu--horizontal) {
    height: $navbar-height;
    line-height: $navbar-height;
  }
}
.layout-top {
  .layout__sidebar {
    position: sticky;
    display: flex;

    @extend %layout__sidebar--horizontal;
  }
  .layout__main {
    height: calc(100vh - #{$navbar-height});
    margin-left: 0;
  }
}
.layout-mix {
  .layout__sidebar {
    @extend %layout__sidebar--horizontal;
  }
  .layout__container {
    display: flex;
    height: 100%;
    padding-top: $navbar-height;
    .layout__sidebar--left {
      width: $sidebar-width;
      height: 100%;
      background-color: var(--menu-background);
      :deep(.el-menu) {
        height: 100%;
      }
      .layout__sidebar-toggle {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 0 6px -2px var(--el-color-primary);
      }
    }
    .layout__main {
      flex: 1;
    }
  }
}
.hideSidebar {
  &.layout-mix {
    .layout__sidebar {
      width: 100%;
    }
    .layout__container {
      .layout__sidebar--left {
        width: $sidebar-width-collapsed;
      }
    }
  }
}
.layout-left {
  &.hideSidebar {
    .layout__sidebar {
      width: $sidebar-width-collapsed;
    }
    &.mobile {
      .layout__sidebar {
        // pointer-events: none;
        // transform: translate3d(calc(-1 * #{$sidebar-width}), 0, 0);
        // transition-duration: 0.3s;
      }
      .layout__main {
        margin-left: 0;
      }
    }
  }
}
</style>
