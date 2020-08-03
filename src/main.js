import Vue from "vue"
import App from "./App"
import router from "./router"



import "./styles/index.scss"


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//开启js热更新
if (module.hot) {
  module.hot.accept();
}
