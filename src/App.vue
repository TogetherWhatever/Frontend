<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/board">Board</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/post/1">Post Detail</RouterLink>
      <RouterLink to="/write">Write</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* 스타일 코드는 기존과 동일하므로 생략합니다 */
</style>
