import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
pinia.use((context) => {
  console.log('Pinia plugin registered', context)
})
pinia.use(piniaPluginPersistedstate)

export default pinia
