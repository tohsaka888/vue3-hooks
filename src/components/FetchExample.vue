<script setup lang="ts">
import useFetch from '../hooks/useFetch';
import { baseUrl } from '../../config/index'
import { toRef } from 'vue';
const banners = useFetch<any>(`${baseUrl}/banner?type=1`, {
  method: 'GET'
})
console.log(banners)

console.log(banners?.value)

</script>

<template>
  <div v-if="banners?.data" v-for="item in banners?.data.banners">
    <img :src="item.pic" alt="item.pic" />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
