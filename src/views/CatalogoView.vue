<template>
    <NavbarGuest />

    <main class="container-fluid px-4 py-2" style="min-height: 100vh;">
        <h2 class="text-3xl font-bold text-pink-700 mb-8 text-center">Nuestro Catálogo</h2>

        <!-- Selector de categorías -->
        <div class="mb-5">
            <h3 class="text-xl font-semibold text-pink-400 mb-4">Categorías</h3>
            <div class="d-flex flex-wrap justify-content-around">
                <button type="button" v-for="categoria in categorias" :key="categoria.id"
                    @click="seleccionarCategoria(categoria.id)" :class="[
                        'btn px-4 py-2 rounded-pill text-sm font-medium transition-colors duration-200 m-1',
                        categoriaSeleccionada === categoria.id
                            ? 'bg-pink-100'
                            : 'bg-white text-pink-600 hover:bg-pink-100'
                    ]">
                    {{ categoria.nombre }}
                </button>
            </div>
        </div>

        <!-- Lista de productos -->
        <section class="bg-white">
            <div class="row overflow-hidden row-cols-auto  justify-content-around">
                <div class="col m-3" v-for="producto in productosFiltrados" :key="producto.id">
                    <div class="card shadow mx-auto" style="width: 18rem;">
                        <img :src="producto.imagen" :alt="producto.nombre" class="card-img-top" alt="..." height="175">
                        <div class="card-body d-flex align-items-start flex-column" style="height: 200px;">
                            <h5 class="card-title">{{ producto.nombre }}</h5>
                            <p class="card-text flex-grow-1" id="text-card">{{ producto.descripcion }}</p>
                            <a href="#" class="btn btn-primary align-self-end">Solicitar</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <FooterGuest />
</template>

<script setup>
import FooterGuest from '@/components/layout/footer-guest.vue';
import NavbarGuest from '@/components/layout/navbar-guest.vue';
import { ref, computed } from 'vue'

const categorias = ref([
    { id: 1, nombre: 'Cajas Sorpresa' },
    { id: 2, nombre: 'Peluches' },
    { id: 3, nombre: 'Anchetas' },
    { id: 4, nombre: 'Globos y Decoraciones' },
    { id: 5, nombre: 'Desayunos' },
    { id: 6, nombre: 'Carteles' }
])

const productos = ref([
    { id: 1, categoriaId: 1, nombre: 'Caja Sorpresa Cumpleaños', descripcion: 'Caja llena de regalos para celebrar un cumpleaños especial', imagen: '/assets/images/catalogo-caja-sorpresa-cum.png' },
    { id: 2, categoriaId: 1, nombre: 'Caja Sorpresa Romantica', descripcion: 'Caja romántica para celebrar el amor', imagen: '/assets/images/catalogo-caja-sorpresa.png' },
    { id: 3, categoriaId: 2, nombre: 'Peluches', descripcion: 'El regalo perfecto para cualquier ocasión. Sorprende a tus seres queridos con un gesto de cariño que perdurará en el tiempo.', imagen: '/assets/images/catalogo-peluches.png' },
    { id: 5, categoriaId: 3, nombre: 'Ancheta pequeña', descripcion: 'Nuestra ancheta pequeña es un tesoro de delicias cuidadosamente seleccionadas, listas para sorprender a ese alguien especial.', imagen: '/assets/images/catalogo-anchetas.png' },
    { id: 6, categoriaId: 3, nombre: 'Galletas Decoradas', descripcion: 'Set de galletas decoradas a mano', imagen: '/assets/images/catalogo-anchetas.png' },
    { id: 7, categoriaId: 4, nombre: 'Globos', descripcion: '¡Llena tus celebraciones de color y alegría con nuestro set de globos! La combinación perfecta para cualquier ocasión especial.', imagen: '/assets/images/catalogo-globos.png' },
    { id: 11, categoriaId: 4, nombre: 'Globos metálicos', descripcion: 'Nuestro set de globos metálicos. Un toque de glamour para tus fiestas más chic.', imagen: '/assets/images/catalogo-globos-metalicos.png' },
    { id: 8, categoriaId: 4, nombre: 'Set de Globos boquets', descripcion: 'Nuestros boquets de globos son la opción perfecta para añadir un toque de sofisticación a cualquier decoración. Combina a la perfección con cualquier estilo y temática.', imagen: '/assets/images/catalogo-globos-boquets.png' },
    { id: 9, categoriaId: 5, nombre: 'Desayunos', descripcion: '¿Buscas una forma original de decir "te quiero"? Nuestros desayunos artesanales son la respuesta perfecta.', imagen: '/assets/images/catalogo-desayunos.png' },
    { id: 10, categoriaId: 6, nombre: 'Carteles personalizados', descripcion: '¡Haz una declaración con nuestros carteles! Elige entre una variedad de temas, colores y tamaños para encontrar el cartel ideal que refleje tu personalidad.', imagen: '/assets/images/catalogo-carteles.png' },
])

const categoriaSeleccionada = ref(1)

const seleccionarCategoria = (id) => {
    categoriaSeleccionada.value = id
}

const productosFiltrados = computed(() => {
    return productos.value.filter(producto => producto.categoriaId === categoriaSeleccionada.value)
})
</script>

<style scoped>
#text-card {
    font-size: small;
}
</style>