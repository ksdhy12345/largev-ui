<template>
  <div>
    <h2>表单</h2>
    <!-- <p>说明：</p>
    <p>表单校验只有两条规则，都是基于blur事件实现的，目前只针对input做了处理</p>
    <p>1. 非空校验</p>
    <p>2. 自定义校验</p>-->
    <ls-form :model="info" :rules="rules" ref="form">
      <ls-form-item label="用户名" prop="username">
        <ls-input placeholder="请输入用户名" v-model="info.username" name="username" clearable></ls-input>
      </ls-form-item>
      <ls-form-item label="密码" prop="password">
        <ls-input
          placeholder="请输入密码"
          v-model="info.password"
          name="password"
          type="password"
          clearable
        ></ls-input>
      </ls-form-item>
      <ls-form-item label=" " :mark="false">
        <ls-button @click="submit">提交</ls-button>
      </ls-form-item>
    </ls-form>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import Message from '../components/Message'
import { onMounted } from '@vue/runtime-core'
export default {
  setup() {
    const info = reactive({
      username: '',
      password: '',
    })
    const form = ref(null)
    const rules = {
      // 指定字段
      username: {
        // 非空验证
        required: true,
        message: '请输入用户名',
        // 自定义验证
        // validator: (value) => {
        //   if (value.length < 6) {
        //     return {
        //       message: '您的用户名长度不够',
        //       result: false,
        //     }
        //   }
        //   return { result: true }
        // },
      },
      password: {
        required: true,
        message: '请输入密码',
        // validator: (value) => {
        //   if (value.length < 6) {
        //     return {
        //       message: '您的密码长度不够',
        //       result: false,
        //     }
        //   }
        //   return { result: true }
        // },
      },
    }

    const submit = () => {
      form.value.validate((result, value) => {
        if (result) {
          console.log('提交成功', value)
          Message.success({ msg: '提交成功' + JSON.stringify(value) })
        } else {
          console.log('提交失败')
          Message.success({ msg: '提交失败' })
        }
      })
    }
    return {
      info,
      rules,
      submit,
      form,
    }
  },
}
</script>

<style>
</style>