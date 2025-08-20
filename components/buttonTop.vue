<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const show = ref(false)

function handleScroll() {
  show.value = window.scrollY > 300
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <button v-if="show" class="scroll-top" @click="scrollTop">↑ Наверх</button>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 12px 18px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); 
  border-radius: 15px;
  background: #3EB57C;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: 0.3s;
  z-index: 999;
}
.scroll-top:hover {
  background: #2e8b57;
}
.scroll-top:active {
  transform: scale(0.9);
}
</style>
