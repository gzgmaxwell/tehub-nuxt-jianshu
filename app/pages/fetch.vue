<template>
  <div>
    <p>3-9 useFetch和网络请求封装</p>
  </div>
</template>

<script setup lang="ts">
// const { data, status, error, refresh, clear } = await useFetch('https://api.nuxtjs.dev/mountains', {
//   pick: ['title'],
//   server: false
// })

// const searchQuery = ref('initial')
// const { data } = await useFetch('/api/search', {
//   query: { q: searchQuery },
//   server: false,
//   // watch: false
// })
// // does not trigger a refetch
// searchQuery.value = 'new search'

const { data: userData } = await userInfoFetch({})
console.log('🚀 ~ userData:', userData)
</script>
