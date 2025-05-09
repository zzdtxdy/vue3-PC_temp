<template>
  <div :class="['breadcrumb-box mask-image', !appStore.breadcrumbIcon && 'no-icon']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <div
          class="el-breadcrumb__inner is-link"
          :class="{ 'item-no-icon': !item?.meta?.icon }"
          @click="onBreadcrumbClick(item, index)"
        >
          <!-- 根据 icon 类型决定使用的不同类型的图标组件 -->
          <MenuIcon
            v-if="item?.meta?.icon && appStore.breadcrumbIcon"
            :icon="String(item.meta?.icon || '')"
            width="16px"
            class="mr-1"
          />
          <span class="sle">{{ translateRouteTitle(String(item.meta?.title || '')) }}</span>
          <!-- <span class="breadcrumb-title">{{ item.meta.title }}</span> -->
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { HOME_URL } from '@/settings'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/index'
import { useAppStore } from '@/stores/modules/app'
import { translateRouteTitle } from '@/utils/i18n'
import MenuIcon from '@/components/MenuIcon/index.vue' // 提取的图标组件
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const breadcrumbList = computed(() => {
  let breadcrumbData =
    authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? []
  // 🙅‍♀️不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [
      { path: HOME_URL, meta: { icon: 'homepage', title: '首页' } },
      ...breadcrumbData
    ]
  }
  return breadcrumbData
})
// Click Breadcrumb
const onBreadcrumbClick = (item: Menu.RouteVO, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path)
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        display: flex;
        align-items: center;
      }
    }
  }
}
.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 4px;
      }
      .item-no-icon {
        transform: translateY(0);
      }
    }
  }
}
// .breadcrumb-box {
//   display: flex;
//   align-items: center;
//   overflow: hidden;
//   .el-breadcrumb {
//     white-space: nowrap;
//     .el-breadcrumb__item {
//       position: relative;
//       display: inline-block;
//       float: none;
//       .item-no-icon {
//         transform: translateY(-3px);
//       }
//       .el-breadcrumb__inner {
//         display: inline-flex;
//         &.is-link {
//           color: var(--el-header-text-color);
//           &:hover {
//             color: var(--el-color-primary);
//           }
//         }
//         .breadcrumb-icon {
//           margin-top: 1px;
//           margin-right: 6px;
//           font-size: 16px;
//         }
//         .breadcrumb-title {
//           margin-top: 2px;
//         }
//       }
//       &:last-child .el-breadcrumb__inner,
//       &:last-child .el-breadcrumb__inner:hover {
//         color: var(--el-header-text-color-regular);
//       }
//       :deep(.el-breadcrumb__separator) {
//         transform: translateY(-1px);
//       }
//     }
//   }
// }
// .no-icon {
//   .el-breadcrumb {
//     .el-breadcrumb__item {
//       top: -2px;
//       :deep(.el-breadcrumb__separator) {
//         top: 4px;
//       }
//       .item-no-icon {
//         transform: translateY(0);
//       }
//     }
//   }
// }
</style>
