<template>
  <router-view />
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'

  const router = useRouter();
  onMounted(() => {
    if (router && router.currentRoute && router.currentRoute.value?.path === '/') {
      router.push('/dashboard');
    }
  });
</script>
