<script setup lang="ts">
import IconFacebook from '../icons/IconFacebook.vue';
import IconInstagram from '../icons/IconInstagram.vue';
import IconWpp from '../icons/IconWpp.vue';
</script>

<template>
  <footer class="bg-pink-100 pt-3 pb-3">
    <div class="container mx-auto text-center">

      <div class="row my-2 justify-content-center">
        <div class="col-auto"><a href="https://www.facebook.com/MelososDetallesPerfectosOficial" target="_blank"
            class="text-pink-500 hover:text-yellow-500 ">
            <IconFacebook />
          </a></div>
        <div class="col-auto">
          <a href="https://www.instagram.com/melososdetallesperfectos/" target="_blank" class="insta-color">
            <IconInstagram style="color: #E4405F" />
          </a>
        </div>
        <div class="col-auto">
          <a href="https://wa.me/573135996884" target="_blank" class="text-pink-600"> <IconWpp class="me-2 text-success" /></a>
        </div>
      </div>

      <p class="text-pink-700 mb-1">&copy; 2024 Melosos Detalles Perfectos. Todos los derechos reservados.</p>
      <div class="mt-1" style="font-size: small;">
        <RouterLink to="/login" class="text-pink-400 hover:text-yellow-500 mx-2">Administración</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  color: #801f4f !important;
}
</style>