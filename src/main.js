import { createApp } from 'vue'
import App from './App.vue'

import Button from './components/Button'
import Input from './components/Input'
import Dialog from './components/Dialog'
import Form from './components/Form'
import FormItem from './components/FormItem'
import Select from './components/Select'
import Option from './components/Option'
import Table from './components/Table'
import Checkbox from './components/Checkbox'
import checkboxGroup from './components/CheckboxGroup'
import Radio from './components/Radio'
import RadioGroup from './components/RadioGroup'
import TreeSelect from './components/TreeSelect'
import WordCloud from './components/WordCloud'
import './utils/rem.js'
import './assets/iconfont.css'
import Image from './components/Image'
import loading from './components/Loading'




const app = createApp(App);
app.component(Button.name, Button)
app.component(Input.name, Input)
app.component(Dialog.name, Dialog)
app.component(Form.name, Form)
app.component(FormItem.name, FormItem)
app.component(Option.name, Option),
  app.component(Table.name, Table),
  app.component(Checkbox.name, Checkbox),
  app.component(Select.name, Select),
  app.component(checkboxGroup.name, checkboxGroup),
  app.component(Radio.name, Radio),
  app.component(RadioGroup.name, RadioGroup),
  app.component(TreeSelect.name, TreeSelect),
  app.component(WordCloud.name, WordCloud),
  app.component(Image.name, Image),
  app.component(loading.name, loading),


  app.mount('#app')
