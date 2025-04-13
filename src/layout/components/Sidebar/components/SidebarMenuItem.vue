<!--
 * @Description: 
 * @Author: zhongzd
 * @Date: 2025-02-08 21:35:29
 * @LastEditors: zhongzd
 * @LastEditTime: 2025-04-13 22:38:58
 * @FilePath: \vue3-PC_temp\src\layout\components\Sidebar\components\SidebarMenuItem.vue
-->
<template>
  <div v-if="!item.meta || !item.meta.isHide">
    <!-- 如果路径为 '/'，只渲染子节点 -->
    <template v-if="item.path === '/'">
      <SidebarMenuItem v-for="child in item.children" :key="child.path" :item="child" />
    </template>

    <!-- 渲染叶子节点 -->
    <template v-else-if="isLeafNode">
      <AppLink
        v-if="item.meta"
        :to="{
          path: item.path,
          query: item.meta.params
        }"
      >
        <el-menu-item :index="item.path">
          <SidebarMenuItemTitle
            :icon="String(item.meta?.icon || '')"
            :title="String(item.meta?.title || '')"
          />
        </el-menu-item>
      </AppLink>
    </template>

    <!-- 渲染非叶子节点 -->
    <el-sub-menu v-else :index="item.path" teleported>
      <template #title>
        <SidebarMenuItemTitle
          v-if="item.meta"
          :icon="String(item.meta?.icon || '')"
          :title="String(item.meta?.title || '')"
        />
      </template>

      <SidebarMenuItem v-for="child in item.children" :key="child.path" :item="child" />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SidebarMenuItem',
  inheritAttrs: false
})

import AppLink from '@/components/AppLink/index.vue'
import SidebarMenuItemTitle from './SidebarMenuItemTitle.vue'

const props = defineProps({
  /**
   * 当前路由对象
   */
  item: {
    type: Object,
    required: true
  }
})

/**
 * 判断是否为叶子节点
 */
const isLeafNode = computed(() => {
  // 过滤掉 `isHide` 为 `true` 的子节点
  const visibleChildren = props.item.children?.filter((child: any) => !child.meta?.isHide) || []
  return visibleChildren.length === 0
})
</script>

<style lang="scss">
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
