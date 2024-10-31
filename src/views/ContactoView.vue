<template>
    <div class="min-h-screen bg-pink-50">
        <NavbarGuest />

        <main class="container mx-auto py-8 px-4">
            <h2 class="text-3xl font-bold text-pink-700 mb-4 text-center">Contáctanos</h2>

            <div class="row">
                <div class="col-12 col-md-6">
                    <h3 class="text-2xl font-semibold text-pink-600 mb-4">Sobre Nosotros</h3>
                    <p class="text-pink-700 mb-6">
                        En Melosos Detalles Perfectos, creemos que cada regalo cuenta una historia. Somos más que una
                        tienda; somos creadores de momentos inolvidables. Nuestros productos artesanales, desde cajas
                        sorpresa hasta peluches personalizados, están diseñados para tocar corazones y crear sonrisas.
                        Con amor y dedicación en cada detalle, transformamos tus ideas en regalos únicos que perdurarán
                        en la memoria de tus seres queridos.
                    </p>
                    <div class="row gy-1">
                        <div class="flex items-center">
                            <IconWpp class="me-2 text-success" />
                            <a :href="wppLink" target="_blank" class="text-pink-600">+57 313 599 6884</a>
                        </div>
                        <div class="flex items-center">
                            <IconPhone class="me-2 gold-icon" />
                            <span class="text-pink-600">+57 311 383 5535</span>
                        </div>
                        <div class="flex items-center">
                            <IconMail class="me-2 gold-icon" />
                            <a href="mailto:melososdetallesperfectos@gmail.com"
                                class="text-pink-600 hover:text-yellow-500">melososdetallesperfectos@gmail.com</a>
                        </div>
                        <div class="flex items-center">
                            <IconMapPin class="me-2 gold-icon" />
                            <span class="text-pink-600">Cra. 29 #30-39, Marinilla, Antioquia</span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h5 class="text-lg font-semibold text-pink-600 mb-2">Síguenos en redes sociales</h5>
                        <div class="row mt-2">
                            <div class="col-auto"><a href="https://www.facebook.com/MelososDetallesPerfectosOficial"
                                    target="_blank" class="text-pink-500 hover:text-yellow-500 ">
                                    <IconFacebook />
                                </a></div>
                            <div class="col-auto">
                                <a href="https://www.instagram.com/melososdetallesperfectos/" target="_blank"
                                    class="insta-color">
                                    <IconInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 mt-4 mt-md-0">
                    <h3 class="text-2xl font-semibold text-pink-600 mb-2">Envíanos un mensaje</h3>
                    <form @submit.prevent="enviarMensaje" class="space-y-4">
                        <div class="mb-2">
                            <label for="nombre" class="block text-pink-600 mb-2 form-label">Nombre</label>
                            <input type="text" id="nombre" v-model="formulario.nombre" required class="form-control">
                        </div>
                        <div>
                            <label for="mensaje" class="block text-pink-600 mb-1 form-label">Mensaje</label>
                            <textarea id="mensaje" v-model="formulario.mensaje" rows="4" required
                                class="form-control"></textarea>
                        </div>
                        <button type="submit" class="btn rounded-2 mt-2 btn-success w-100">Enviar
                            Mensaje</button>
                    </form>
                </div>
            </div>

            <div class="my-5">
                <h3 class="text-2xl font-semibold text-pink-600 mb-4">Nuestra Ubicación</h3>
                <div class="">
                    <div style="max-width:100%;overflow:hidden;height:500px;">
                        <div id="my-map-display" style="height:100%; width:100%;max-width:100%;"><iframe
                                style="height:100%;width:100%;border:0;" frameborder="0"
                                src="https://www.google.com/maps/embed/v1/place?q=Melosos&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <FooterGuest />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import FooterGuest from '@/components/layout/footer-guest.vue';
import NavbarGuest from '@/components/layout/navbar-guest.vue';
import IconPhone from '@/components/icons/IconPhone.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconMapPin from '@/components/icons/IconMapPin.vue';
import IconFacebook from '@/components/icons/IconFacebook.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconWpp from '@/components/icons/IconWpp.vue';

const formulario = ref({
    nombre: '',
    mensaje: ''
})
const wppLink = 'https://wa.me/573135996884';
const enviarMensaje = () => {
    // Aquí iría la lógica para enviar el mensaje
    let url = wppLink + '?text=' + encodeURI(`Hola soy ${formulario.value.nombre}, ${formulario.value.mensaje}`);

    window.open(url, '_blank');
    // Reiniciar el formulario
    formulario.value = {
        nombre: '',
        mensaje: ''
    }
}
</script>

<style scoped>
.insta-color {
    color: #E4405F;
}

#my-map-display img {
    max-height: none;
    max-width: none !important;
    background: none !important;
}
</style>