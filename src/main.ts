// import './assets/main.css'
// import "./styles/index.css"
import { createApp } from 'vue'
// import App from './App.vue'
// import App2 from "./App2.vue"
// import App from './App-input.vue'
// import App from './App-Switch.vue'
// import App from './App-Qrcode.vue'
// import App from './App-Getcode.vue'
// import App from './App-CountDown.vue'
// import App from './App-LazyLoadImg.vue'
import App from './App-imagecropper.vue'

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)

createApp(App).mount('#app')
