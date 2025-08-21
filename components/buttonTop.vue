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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 150px;
  height: 40px;
  padding: 0 12px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background: #3EB57C;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  z-index: 999;
  border: none;
}

.scroll-top:focus {
  outline: none;
}

.scroll-top:hover {
  background: #aaaaaa;
}

.scroll-top:active {
  transform: scale(0.9);
}
</style>
