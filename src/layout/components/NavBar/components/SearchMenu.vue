<template>
  <div class="search-menu">
    <el-icon class="text-xl" @click="handleOpen"><Search /></el-icon>
    <el-dialog
      v-model="isShowSearch"
      class="search-dialog"
      :width="600"
      :show-close="false"
      top="10vh"
    >
      <el-input
        ref="menuInputRef"
        v-model="searchMenu"
        placeholder="菜单搜索：支持菜单名称、路径"
        size="large"
        clearable
        :prefix-icon="Search"
      ></el-input>
      <div v-if="searchList.length" ref="menuListRef" class="menu-list">
        <div
          v-for="item in searchList"
          :key="item.path"
          :class="['menu-item', { 'menu-active': item.path === activePath }]"
          @mouseenter="mouseoverMenuItem(item)"
          @click="handleClickMenu()"
        >
          <div class="menu-lf">
            <MenuIcon class="menu-icon" :icon="item.meta?.icon" />
            <span class="sle menu-title">
              {{ translateRouteTitle(item.meta?.title || '') }}
            </span>
            <!-- <span class="menu-title">{{ item.meta.title }}</span> -->
          </div>
          <svg-icon name="enter" @click="handleOpen" />
          <!-- <i :class="'iconfont icon-huiche'" class="menu-enter" @click="handleOpen"></i> -->
        </div>
      </div>
      <el-empty v-else class="mt20 mb20" :image-size="100" description="暂无菜单" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { InputInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { translateRouteTitle } from '@/utils/i18n'

const router = useRouter()
const authStore = useAuthStore()
// 菜单列表
const menuList = computed(() => authStore.flatMenuListGet.filter((item) => !item?.meta?.isHide))

const activePath = ref('') // 当前选中的菜单路径
const mouseoverMenuItem = (menu: Menu.RouteVO) => {
  activePath.value = menu.path
}

const menuInputRef = ref<InputInstance | null>(null)
const isShowSearch = ref<boolean>(false)
const searchMenu = ref<string>('') // 搜索的菜单名称或路径

watch(isShowSearch, (val) => {
  if (val) {
    // 可以实现全局范围内的键盘操作
    document.addEventListener('keydown', keyboardOperation)
  } else {
    document.removeEventListener('keydown', keyboardOperation)
  }
})
// 打开搜索菜单
const handleOpen = () => {
  isShowSearch.value = true
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value?.focus()
    })
  })
}
// 搜索结果列表
const searchList = ref<Menu.RouteVO[]>([])
// 更新搜索结果列表
const updateSearchList = () => {
  searchList.value = searchMenu.value
    ? menuList.value.filter(
        (item) =>
          (item.path.toLowerCase().includes(searchMenu.value.toLowerCase()) ||
            String(item?.meta?.title || '')
              .toLowerCase()
              .includes(searchMenu.value.toLowerCase())) &&
          !item.meta?.isHide
      )
    : []
  activePath.value = searchList.value.length ? searchList.value[0].path : ''
}

const debouncedUpdateSearchList = useDebounceFn(updateSearchList, 300)
// 监听搜索框内容变化，更新搜索结果列表
watch(searchMenu, debouncedUpdateSearchList)

const menuListRef = ref<Element | null>(null)

/**
 * @description: 按键操作：上、下、回车
 * @param {number} direction 1：下，-1：上
 * @return {*}
 */
const keyPressUpOrDown = (direction: number) => {
  const length = searchList.value.length
  if (length === 0) return
  const index = searchList.value.findIndex((item) => item.path === activePath.value)
  // + length：在计算前加上 length，确保结果为正数，避免负索引。
  // % length：通过模运算将索引限制在 [0, length - 1] 的范围内，实现循环效果。
  const newIndex = (index + direction + length) % length
  activePath.value = searchList.value[newIndex].path
  // 滚动到选中的菜单项
  nextTick(() => {
    if (!menuListRef.value?.firstElementChild) return
    const menuItemHeight = menuListRef.value.firstElementChild.clientHeight + 12 || 0
    menuListRef.value.scrollTop = newIndex * menuItemHeight
  })
}

/**
 * @description: 处理键盘事件
 * @param {*} event
 * @return {*}
 */
const keyboardOperation = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    /* 阻止浏览器对某些事件的默认处理行为。例如：
      在表单提交时，阻止页面刷新。
      在超链接点击时，阻止跳转到目标 URL。
      在按下某些键时，阻止浏览器的默认快捷键行为。 */
    event.preventDefault()
    keyPressUpOrDown(-1)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    keyPressUpOrDown(1)
  } else if (event.key === 'Enter') {
    event.preventDefault()
    handleClickMenu()
  }
}

const handleClickMenu = () => {
  const menu = searchList.value.find((item) => item.path === activePath.value)
  if (!menu) return
  if (menu.meta?.isLink) window.open(menu.meta.isLink, '_blank')
  else router.push(menu.path)
  searchMenu.value = ''
  isShowSearch.value = false
}
</script>

<style scoped lang="scss">
// .search-menu {
//   :deep(.el-dialog) {
//     border-radius: 4px;
//     .el-dialog__header {
//       display: none;
//     }
//   }
//   .menu-list {
//     max-height: 515px;
//     margin-top: 15px;
//     overflow: auto;
//     .menu-item {
//       position: relative;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       height: 45px;
//       padding: 0 20px;
//       margin: 10px 0;
//       color: var(--el-text-color-secondary);
//       cursor: pointer;
//       background-color: transparent;
//       border: 1px solid var(--el-border-color);
//       border-radius: 6px;
//       transition: all 0.2s ease;
//       .menu-lf {
//         display: flex;
//         align-items: center;
//       }
//       .menu-icon {
//         margin-right: 8px;
//         font-size: 16px;
//       }
//       .menu-title {
//         font-size: 14px;
//       }
//       .menu-enter {
//         font-size: 17px;
//       }
//     }
//     .menu-active {
//       color: #ffffff;
//       background-color: var(--el-color-primary);
//       .menu-icon {
//         font-size: 18px;
//       }
//       .menu-title {
//         font-size: 16px;
//       }
//       .menu-enter {
//         font-size: 19px;
//       }
//     }
//   }
// }
</style>
