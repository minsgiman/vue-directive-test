import Vue from 'vue'
import VueHotKey from 'v-hotkey'
import VClickOutside from 'v-click-outside'
import Clipboard from 'v-clipboard'
import VueScrollTo from 'vue-scrollto'
import VTooltip from 'v-tooltip'
import VScrollLock from 'v-scroll-lock'
import InfiniteScroll from 'vue-infinite-scroll'
import Ripple from 'vue-ripple-directive'
import vBlur from 'v-blur'
import Vuelidate from 'vuelidate'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueHotKey)
Vue.use(VClickOutside)
Vue.use(Clipboard)
Vue.use(VueScrollTo)
Vue.use(VTooltip)
Vue.use(VScrollLock, {
  bodyScrollOptions: {
    reserveScrollBarGap: true,
  },
})
Vue.use(InfiniteScroll)
Vue.use(vBlur)
Vue.use(Vuelidate)

Vue.directive('ripple', Ripple);

new Vue({
  render: h => h(App),
}).$mount('#app')
