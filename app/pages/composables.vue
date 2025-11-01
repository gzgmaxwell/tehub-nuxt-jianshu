<template>
  <div>
    <p>3-8 useState和useCookie</p>
    <div>counter:{{ counter }}</div>
    <a-button type="primary" @click="add">增加</a-button>
  </div>
</template>

<script lang="ts" setup>
// const counter = useState('counter', () => 1)
// counter.value = 11
// const add = () => {
//   counter.value++
// }

// import useCounter from '~/composables/state'
const counter = useCounter()
setTimeout(() => {
  counter.value = 10
}, 3000)
const add = () => {
  counter.value++
}

// useCookie
const userInfoCookie = useCookie('userInfo', { maxAge: 60 })
userInfoCookie.value = {
  uid: 1111,
  username: '张三'
}

setTimeout(() => {
  const userInfo = useCookie('userInfo')
  console.log('🚀 ~ userInfo:', userInfo.value)
}, 2000)
</script>
