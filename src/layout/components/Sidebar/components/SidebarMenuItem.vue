<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:29
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-05-04 23:41:40
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\components\SidebarMenuItem.vue
-->
<template>
  <template v-if="!menuItem.meta || !menuItem.meta.isHide">
    <!-- 如果路径为 '/'，只渲染子节点 -->
    <template v-if="menuItem.path === '/'">
      <SidebarMenuItem v-for="child in menuItem.children" :key="child.path" :menuItem="child" />
    </template>

    <!-- 渲染叶子节点 -->
    <template v-else-if="isLeafNode">
      <el-menu-item :index="menuItem.path" @click="handleClickMenu(menuItem)">
        <!-- 根据 icon 类型决定使用的不同类型的图标组件 -->
        <MenuIcon :icon="menuItem.meta?.icon" style="margin-right: 5px" />
        <template #title>
          <span class="sle">{{ translateRouteTitle(menuItem.meta?.title || '') }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 渲染非叶子节点 -->
    <el-sub-menu v-else :index="menuItem.path">
      <template #title>
        <!-- 根据 icon 类型决定使用的不同类型的图标组件 -->
        <MenuIcon :icon="menuItem.meta?.icon" style="margin-right: 5px" />
        <span class="sle">{{ translateRouteTitle(menuItem.meta?.title || '') }}</span>
      </template>

      <SidebarMenuItem v-for="child in menuItem.children" :key="child.path" :menuItem="child" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SidebarMenuItem'
})

import router from '@/router'
import { translateRouteTitle } from '@/utils/i18n'
import MenuIcon from '@/components/MenuIcon/index.vue' // 提取的图标组件

const props = defineProps({
  /**
   * 当前路由对象
   */
  menuItem: {
    type: Object as PropType<Menu.RouteVO>,
    required: true
  }
})

/**
 * 判断是否为叶子节点
 */
const isLeafNode = computed(() => {
  // 过滤掉 `isHide` 为 `true` 的子节点
  const visibleChildren = props.menuItem.children?.filter((child: any) => !child.meta?.isHide) || []
  return visibleChildren.length === 0
})
const handleClickMenu = (menuItem: Menu.RouteVO) => {
  if (menuItem?.meta?.isLink) return window.open(menuItem.meta.isLink, '_blank')
  router.push(menuItem.path)
}
</script>

<style lang="scss" scoped>
.el-sub-menu .el-sub-menu__title:hover {
  color: $menu-text;
  background-color: $menu-hover;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: $menu-active-text !important;
      background-color: $menu-active-background !important;
    }
  }
}
.el-menu-item [class^='el-icon'] {
  width: 18px;
  margin-right: 0;
}
.el-sub-menu .el-icon {
  margin-right: 0;
}
.el-menu-item {
  &:hover {
    color: $menu-text;
    background-color: $menu-hover;
  }
  &.is-active {
    color: $menu-active-text !important;
    background-color: $menu-active-background !important;
  }
}
</style>
