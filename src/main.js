import { createApp } from 'vue'
import App from './App.vue'
import Test from './Test.vue'

import Button from './components/Button'
import Input from './components/Input'
import Dialog from './components/Dialog'
import Form from './components/Form'
import FormItem from './components/FormItem'
import Select from './components/Select'
import Option from './components/Option'

import './assets/iconfont.css'

const app = createApp(Test);
app.component(Button.name, Button)
app.component(Input.name, Input)
app.component(Dialog.name, Dialog)
app.component(Form.name, Form)
app.component(FormItem.name, FormItem)
app.component(Select.name, Select),
  app.component(Option.name, Option),

  app.mount('#app')
