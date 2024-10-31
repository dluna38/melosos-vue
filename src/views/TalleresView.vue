<template>
    <div class="min-h-screen bg-pink-50">
        <NavbarGuest />

        <main class="container-fluid py-2">
            <h2 class="text-3xl font-bold text-pink-700 mb-8 text-center">Nuestros Talleres</h2>
            <p class="px-5 py-2">¿Te encanta crear cosas con tus propias manos? ¡Nuestros talleres son perfectos para
                ti!
                Aprende nuevas técnicas, conoce gente increíble y llévate a casa una pieza única. ¡Inscríbete ya y
                despierta tu creatividad!</p>
            <section>
                <div class="row overflow-hidden row-cols-auto  justify-content-around">
                    <div class="col m-3" v-for="taller in talleres" :key="taller.id">
                        <div class="card shadow mx-auto" style="width: 20rem;">
                            <div class="position-relative">
                                <img :src="taller.imagen" :alt="taller.nombre" class="card-img-top" alt="..."
                                    height="175">
                                <span
                                    :class="['me-1 mt-1 position-absolute top-0 end-0 badge rounded-pill', taller.activo ? 'text-bg-success' : 'text-bg-danger']">{{
                                    taller.activo ? 'Abierto':'Cerrado'}}</span>
                            </div>
                            <div class="card-body d-flex align-items-start flex-column">
                                <h5 class="card-title" style="height: 49px;">{{ taller.nombre }}</h5>
                                <p class="text-pink-400 card-text flex-grow-1 fs-7" style="height: 80px;">{{
                                    taller.descripcion }}</p>
                                <div class="space-y-2">
                                    <p class="fs-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-calendar me-1">
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <rect width="18" height="18" x="3" y="4" rx="2" />
                                            <path d="M3 10h18" />
                                        </svg>
                                        {{ taller.fecha }}
                                    </p>
                                    <p class="fs-7">
                                        <IconMapPin/>
                                        {{ taller.lugar }}
                                    </p>
                                    <p class="fs-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-users me-1">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        {{ taller.cupos }}
                                    </p>
                                </div>
                                <button @click="enviarMensaje" type="button" href="#" :disabled="!taller.activo"
                                    :class="['btn align-self-end',taller.activo ? 'btn-primary' : 'btn-secondary']">{{ taller.activo ? 'Inscribirse' :
                                    'No disponible' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <FooterGuest />
    </div>
</template>

<script setup>
import IconMapPin from '@/components/icons/IconMapPin.vue';
import FooterGuest from '@/components/layout/footer-guest.vue';
import NavbarGuest from '@/components/layout/navbar-guest.vue';
import { ref } from 'vue'

const talleres = ref([
    {
        id: 1,
        nombre: "Taller de letras bonitas",
        descripcion: "¿Quieres aprender a escribir letras que enamoren? En nuestro taller de letras bonitas, te enseñaremos las técnicas y los trucos para crear letras que sean tan hermosas como únicas.",
        fecha: "20 de Octubre, 2024",
        lugar: "Comfenalco",
        cupos: 15,
        activo: false,
        imagen: "/assets/images/taller-letras-bonitas.png"
    },
    
])
const enviarMensaje = () => {
    // Aquí iría la lógica para enviar el mensaje
    let url = wppLink + '?text=' + encodeURI(`Hola, estoy interesado/a en un taller`);

    window.open(url, '_blank');
    // Reiniciar el formulario
    formulario.value = {
        nombre: '',
        mensaje: ''
    }
}
const wppLink = 'https://wa.me/573135996884';
</script>

<style>
.fs-7 {
    font-size: small;
}
</style>