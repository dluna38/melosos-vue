<script setup>
import NavbarAdmin from '@/components/layout/navbar-admin.vue';
import SidebarAdmin from '@/components/layout/sidebar-admin.vue';
</script>

<template>
  <NavbarAdmin />
  <main>
    <RouterView />
  </main>
</template>
<style>
body{
  background-color: #fceef5 !important;
}
</style>
