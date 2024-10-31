<template>
    <!-- card detalle pedido -->
    <div class="p-4">
        <div class="d-flex align-content-center">
        <h2 class="text-2xl font-bold text-pink-700 mb-6">Detalle del Pedido #{{ $route.params.codigo }}
            <span v-if="fechaCreacion !== null">- {{ fechaCreacion }}</span>
        </h2>
        <IconQr class="mx-2 my-auto mb-2" :h="30" :w="30" data-bs-toggle="modal" data-bs-target="#modal-qr" v-if="visibleQr" id="iconQr"/>
    </div>
        <!-- Información del pedido -->
        <div class="bg-white py-3 px-4 rounded-4 shadow-md mb-6">
            <h3 class="text-lg font-semibold text-pink-400 mb-4">Información del Pedido  <span v-if="fechaCreacion !== null">- Estado: {{ pedido.estadoText }}</span></h3>
            <div class="row">
                <div class="col">
                    <p><span class="font-medium">Para cliente:</span> {{ cliente.nombre }}</p>
                    <p><span class="font-medium">Cliente correo:</span> {{ siVacio(cliente.email) }}</p>
                    <p><span class="font-medium">Cliente celular:</span> {{ siVacio(cliente.celular) }}</p>
                </div>
                <div class="col">
                    <p><span class="font-medium">Categoría:</span> {{ pedido.categoria.nombre }}</p>
                    <p><span class="font-medium">Tipo de Entrega:</span> {{ pedido.tipoEntregaText }}</p>
                    <p v-if="pedido.tipoEntrega === 'envio'"><span class="font-medium">Dirección:</span> {{
                        pedido.direccion
                    }}</p>
                </div>
            </div>
            <div class="mt-4">
                <p><span class="font-medium">Descripción:</span> {{ pedido.descripcion }}</p>
            </div>
        </div>
    </div>
    <div class="px-4 pb-4">
        <div class="bg-white py-3 px-4 rounded-4 shadow-md">
            <h3 class="text-lg font-semibold text-pink-400 mb-4"><span
                    :style="{ 'text-decoration': progress === 100 ? 'line-through' : '' }">Tareas Pendientes</span><span
                    v-if="progress === 100"> Completado</span></h3>
            <!-- Barra de progreso -->
            <div class="mb-4">
                <div class="progress" role="progressbar" aria-label="Basic example" :aria-valuenow="progress"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
                </div>
                <p class="text-sm text-pink-700 mt-2">Progreso: {{ completedTasks }} de {{ totalTasks }} tareas
                    completadas
                </p>
            </div>

            <!-- Lista de tareas -->
            <ul class="space-y-2 ps-1">
                <li v-for="(task, index) in tasks" :key="index">
                    <div class="form-check d-flex">
                        <input type="checkbox" :id="`task-${index}`" v-model="task.estado" @change="changeEstadoTask(index)"
                            class="form-check-input h-5 w-5 text-yellow-400 rounded border-pink-300 focus:ring-pink-500">
                        <label :for="`task-${index}`" class="ps-2 form-check-label flex-grow-1 ml-2 text-pink-700">{{
                            task.item
                            }}</label>
                        <button @click="removeTask(index)" class="ml-auto text-pink-400 hover:text-pink-700 btn ">
                            <span class="visually-hidden">Eliminar tarea</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="h-5 w-5"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>

            <!-- Formulario para agregar nueva tarea -->
            <form @submit.prevent="addTask" class="mt-4">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1"><input type="text" v-model="newTask" placeholder="Nueva tarea"
                            class="form-control"></div>
                    <div class="px-2">
                        <button type="submit" class="btn bg-pink-100">
                            Agregar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <SimpleModal id-modal="modal-qr" :title="null">
        <div class="text-center">
            <vue-qrcode v-if="visibleQr" :value="qrCode" :options="{ width: 200 }" />
        </div>
    </SimpleModal>
</template>
<script setup>
import axios from 'axios';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import { siVacio } from '@/components/Utils/stringUtils';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import IconQr from '@/components/icons/IconQr.vue';
import SimpleModal from '@/components/simpleModal.vue';

const route = useRoute();
const router = useRouter();
const visibleQr = ref(false);
const qrCode = ref('');
const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter(task => task.estado).length)
const progress = computed(() => (completedTasks.value / totalTasks.value) * 100)
const fechaCreacion = ref(null);
const newTask = ref('')


function setPedido(params) {
    pedido.value = route.params.data.pedido;
    
    fechaCreacion.value = new Date(pedido.value.created_at).toLocaleDateString('es-CO');
    qrCode.value = `{"cod":"${pedido.value.qr_code}"}`;
    visibleQr.value = true;
    cliente.value = pedido.value.cliente;
    tasks.value = pedido.value.pendientes;
}

onBeforeMount(async () => {
    console.log('onBMoun', route.params);
    setPedido();
})

onBeforeRouteUpdate((to, from) => {
    console.log('call on before', to.params.codigo);
})
const cliente = ref({
    nombre: '',
    email: '',
    celular: '',
})

const pedido = ref({
    id: '001',
    categoria: 'Cajas Sorpresa',
    created_at: '',
    tipoEntrega: '',
    tipoEntregaText: '',
    estadoText: '',
    direccion: '',
    descripcion: ''
})
const tasks = ref([
    { item: 'Comprar materiales', estado: false },
    { item: 'Armar la caja', estado: false },
    { item: 'Decorar la caja', estado: false },
    { item: 'Empacar los regalos', estado: false },
    { item: 'Preparar para envío', estado: false }
])

const addTask = () => {
    let task = newTask.value.trim();
    if (task) {
        let taskObj = { item: newTask.value.trim(), estado: false }
        tasks.value.push(taskObj);

        addTaskServer(taskObj);

        newTask.value = ''
    }
}

function addTaskServer(task) {
    task.pedido_id = pedido.value.id;
    axios.post('pendientes/nuevo',task).then((res)=>{
        console.log(res.data);
        task.id = res.data.id;
        console.log(tasks.value);
        
    }).catch((error)=>{
        removeTaskObj(task)
    })
}
const removeTask = (index) => {
    console.log(tasks.value[index]);
    let task = tasks.value[index]
    tasks.value.splice(index, 1)

    axios.delete('pendientes/delete/'+task.id).catch((error)=>{
        console.log('error eliminado la tarea');
        tasks.value.push(task);
    })
}
function removeTaskObj(task) {
    const index = tasks.indexOf(task);
    if (index !== -1) {
      listaTareas.splice(index, 1);
    }
}
function changeEstadoTask(index) {
    console.log(tasks.value[index]);
    let task = tasks.value[index]
    axios.put('pendientes/update',task).catch((error)=>{
        console.log('error actualizando la tarea');
        tasks.value[index].estado = !task.estado; 
    })
}

</script>

<style>
li {
    list-style: none;
}

.progress-bar {
    background-color: #facc15;
}

#iconQr{
    cursor: pointer;
}
</style>