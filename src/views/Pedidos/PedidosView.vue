<template>
    <!-- Contenido principal -->
    <main class="flex-1 p-4 overflow-y-auto">
        <h2 class="text-2xl font-bold text-pink-700 mb-6">Listado de Pedidos</h2>

        <!-- Filtros de búsqueda -->
        <div class="bg-white py-3 px-4 rounded-4 shadow-md mb-3">
            <h3 class="text-lg font-semibold text-pink-400 mb-4">Filtros de Búsqueda</h3>
            <div class="row g-3">
                <div class="col-12 col-sm-4">
                    <label for="searchTerm" class="block text-sm font-medium text-pink-700 mb-1">Búsqueda
                        General</label>
                    <input type="text" id="searchTerm" v-model="filters.searchTerm" placeholder="ID, Cliente, etc."
                        class="form-control w-full px-3 py-2 border border-pink rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500">
                </div>
                <div class="col-12 col-sm-4">
                    <label for="status" class=" block text-sm font-medium text-pink-700 mb-1">Estado</label>
                    <select id="status" v-model="filters.status"
                        class="form-select w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500">
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="completado">Completado</option>
                    </select>
                </div>
                <div class="col-12 col-sm-4">
                    <label for="dateRange" class="block text-sm font-medium text-pink-700 mb-1">Rango de Fechas</label>
                    <input type="date" id="dateRange" v-model="filters.dateRange"
                        class="form-control w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500">
                </div>
            </div>
            <div class="mt-4 d-flex justify-content-between">
                <div>
                    <button type="button" @click="aplicarFiltros"
                        class="btn btn-warning px-4 py-2 rounded-4 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                        Aplicar Filtros
                    </button>
                </div>
                <div>
                    <button type="button" @click="leerCodigoQR" data-bs-toggle="modal" data-bs-target="#qr-modal"
                        class="btn btn-outline-secondary px-4 py-2 bg-pink-500 rounded-4 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 flex items-center">
                        <IconQr />
                        <span class="d-none d-sm-inline-block">Leer Código QR</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Lista de pedidos -->
        <div class="bg-white py-3 px-4 rounded-4 shadow-md overflow-hidden">
            <table class="table min-w-full divide-y divide-pink-200">
                <thead class="bg-pink-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">ID
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">
                            Cliente</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">
                            Categoria</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">Fecha
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">
                            Estado</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-pink-400 uppercase tracking-wider">
                            Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-pink-200">
                    <tr v-for="pedido in pedidos" :key="pedido.id" v-if="pedidos.length !== 0">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-900">{{ pedido.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-pink-500">{{ pedido.cliente.nombre }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-pink-500">{{ pedido.categoria.nombre }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-pink-500">{{ toFechaHora(pedido.created_at)
                            }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="estadoClase(pedido.estado)"
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-4">
                                {{ pedido.estadoText }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <RouterLink :to="'/administracion/pedidos/' + pedido.id">Ver</RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row text-center">
                <h5 v-if="pedidos.length === 0">No se encontraron pedidos</h5>
            </div>
        </div>
    </main>

    <QrReaderModal v-on:detected-qr-code="buscarQr"/>
</template>

<script setup>
import IconQr from '@/components/icons/IconQr.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { toFechaHora } from '@/components/Utils/stringUtils';
import QrReaderModal from '@/components/features/QrReaderModal.vue';
const filters = ref({
    searchTerm: '',
    status: '',
    dateRange: ''
})

const pedidos = ref([])
const buscarQr = (qr) => {
    getPedidos('?qrcode='+qr.cod);
}

const aplicarFiltros = (obj = null) => {
    //filters.value
    let strFilters = '?';
    if(obj !== null){
        console.log('filtro qr: ',obj.cod);
        strFilters+='qrcode='+obj.cod+'&';
    }
    console.log('Aplicando filtros:', strFilters);
    // Aquí iría la lógica para aplicar los filtros, posiblemente haciendo una llamada a una API
    return strFilters;
}

const leerCodigoQR = () => {
    console.log('Iniciando lectura de código QR')
    // Aquí iría la lógica para activar la cámara y leer el código QR
}

const estadoClase = (estado) => {
    switch (estado) {
        case 1:
            return 'bg-success-subtle text-yellow-800'
        case 2:
            return 'bg-info-subtle text-blue-800'
        case 3:
            return 'bg-warning-subtle text-green-800'
        case 4:
            return 'bg-danger-subtle text-green-800'
        default:
            return 'bg-secondary-subtle text-gray-800'
    }
}
function getPedidos(query = '') {
    query = query || ''
    axios.get(`/pedido`+query).then((res) => {
        console.log(res.data);
        pedidos.value = res.data.pedidos.data;
    }).catch((error) => {

    })
}   

onBeforeMount(() => {
    getPedidos();
})
</script>