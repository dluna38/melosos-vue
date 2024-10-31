<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue'
import { getCategorias } from '@/components/requests/requestsHelper';
import { useRouter } from 'vue-router';

onBeforeMount(()=>{
    console.log('before mount');
    getCategorias().then((res)=>{
        console.log(res.data);
        categorias.value= res.data
    })
})

const categorias = ref([]);
const formData = ref({
    cliente: {
        nombre: '',
        identificacion: '',
        email: '',
        direccion: '',
        nota: ''
    },
    pedido: {
        descripcion: '',
        categoria_id: '',
        tipo_entrega: '',
        dir_envio: ''
    }
})
const router = useRouter()

const buscarCliente = () => {
    // Aquí iría la lógica para buscar el cliente en la base de datos
    // y llenar los campos de nombre, cédula y correo con los datos encontrados
    console.log(`Buscando cliente con cédula o correo: ${formData.value.cliente.nombre}`)
    /* axios.get('/clientes/busqueda?nombre='+formData.value.cliente.nombre).then((res)=>{
        console.log(res);
    }) */
}

const procesarFormulario = () => {
    console.log('Datos del formulario:', formData.value)
    // Aquí iría la lógica para procesar el formulario
    // (crear/actualizar cliente y crear nuevo pedido)
    axios.get('http://localhost/meloso-app/public/sanctum/csrf-cookie').then(() => {
        axios.post('pedido/nuevo', formData.value).then((response) => {
            console.log(response);
            console.log(response.data.data.id);
            router.push({name:'detallePedido',params:{codigo:response.data.data.id}});
        }).catch((error) => {
            alert('oops, ocurrio un error procesando la petición')
            console.error(error)
        })
    })

}
</script>
<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold text-pink-700 mb-3">Nuevo Pedido</h2>
        <!-- Información del pedido -->
        <form v-on:submit.prevent="procesarFormulario">
            <div class="bg-white py-3 px-4 rounded-4 shadow-md mb-3">
                <h3 class="text-lg font-semibold text-pink-400 mb-4">Información del Cliente</h3>
                <div class="row g-3">
                    <div class="col-md-2">
                        <label for="identificacion-cliente">Cedula</label>
                        <input class="form-control" type="number" name="identificacion" id="identificacion-cliente"
                            v-model="formData.cliente.identificacion">
                    </div>
                    <div class="col-md-5">
                        <label for="nombre-cliente">Nombre completo</label>
                        <input class="form-control" type="text" name="nombre" id="nombre-cliente" @change="buscarCliente"
                            v-model="formData.cliente.nombre">
                    </div>
                    <div class="col-md-5">
                        <label for="correo-cliente">Correo</label>
                        <input class="form-control" type="email" name="correo" id="correo-cliente"
                            v-model="formData.cliente.email">
                    </div>
                    <div class="col-md-4">
                        <label for="correo-cliente">Dirección</label>
                        <input class="form-control" type="text" name="direccion" id="correo-cliente"
                            v-model="formData.cliente.direccion">
                    </div>
                    <div class="col-12 col-md-8">
                        <label for="correo-cliente">Nota</label>
                        <textarea class="form-control" name="nota" id="nota-cliente"
                            v-model="formData.cliente.nota"></textarea>
                    </div>
                </div>
            </div>
            <!-- informacion pedido -->
            <div class="bg-white py-3 px-4 rounded-4 shadow-md mb-6">
                <h3 class="text-lg font-semibold text-pink-400 mb-4">Información del Pedido</h3>
                <div class="row g-3">
                    <div class="col-12 col-sm-6">
                        <label for="categoria" class="block text-sm font-medium text-pink-700">Categoría de
                            Producto</label>
                        <select id="categoria" v-model="formData.pedido.categoria_id" required
                            class=" form-select mt-1 block w-full border-pink-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
                            <option value="" disabled>Seleccione una categoría</option>
                            <option :value=categoria.id v-for="categoria in categorias">{{categoria.nombre}}</option>
                        </select>
                    </div>
                    <div class="col-12 col-sm-6">
                        <label for="tipoEntrega" class="block text-sm font-medium text-pink-700">Tipo de Entrega</label>
                        <select id="tipoEntrega" v-model="formData.pedido.tipo_entrega" required
                            class="form-select mt-1 block w-full border-pink-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
                            <option value="" disabled>Seleccione una opción</option>
                            <option value=1>Recogida en tienda</option>
                            <option value=2>Envío a domicilio</option>
                        </select>
                    </div>
                    <div v-if="formData.pedido.tipo_entrega === '2'">
                        <label for="direccion" class="block text-sm font-medium text-pink-700">Dirección de
                            Envío</label>
                        <input type="text" id="direccion" v-model="formData.pedido.dir_envio" required
                            class="form-control mt-1 block w-full border-pink-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="descripcion" class="block text-sm font-medium text-pink-700">Descripción</label>
                        <textarea id="descripcion" v-model="formData.pedido.descripcion" rows="3" required
                            class="form-control mt-1 block w-full border-pink-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"></textarea>
                    </div>

                </div>
                <div class="d-flex justify-content-end mt-4">
                    <button type="submit" class="btn btn-success">Crear pedido</button>
                </div>
            </div>

        </form>
    </div>
</template>