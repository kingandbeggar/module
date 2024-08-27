<script lang="ts" setup>
import { computed, reactive } from 'vue';
import GetCode from './components/GetCode/GetCode.vue';

const formData = reactive({
  phone: ''
})
const rightPhone = computed(() => {
  return /^1[3-9]\d{9}$/.test(formData.phone)
})
const getCode = () => {
  if (!rightPhone.value) {
    alert('请填写正确的手机号码')
    throw '请填写正确的手机号码'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("777777")
      let mockApi = 'https://cdn.jsdelivr.net/npm/vue@2/package.json'
      resolve(fetch(mockApi))
    }, 0);
  })
}
const changeCountDown = (obj) => {
  console.log(obj)
}
const errCountDown = (e) => {
  console.log(e)
}

</script>

<template>
  <div class="app">
    <div class="getphone">
      <label for="phone">手机号：</label>
      <input type="text" id="phone" v-model="formData.phone">
      <GetCode 
        :getCode="getCode" 
        @changeCountDown="changeCountDown" 
        @errCountDown="errCountDown"
        :disabled="!formData.phone"
      >
        <template #default="{count}">
          {{ count > 0 ? '重新获取' : '获取验证码' }}
        </template>
        <template #countDown="{seconds, interval}">
          重新获取{{ interval - seconds }}s
        </template>
      </GetCode>
    </div>
    
  </div>
</template>

<style scoped>
.getphone {
  display: flex;
  align-items: center;
}
.getcode {
  color: #1092ed;
  border: 1px solid #1092ed;
  border-radius: 5px;
  margin-left: 10px;
  padding: 0 5px;
  &.is-disabled {
    color: gray;
    border: 1px solid gray;
  }
}
</style>