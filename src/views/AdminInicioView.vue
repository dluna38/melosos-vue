<template>
    <a class="btn btn-success" href="/administracion/pedidos/nuevo">crear pedido</a>
    <button class="btn btn-warning" @click="testPost" >crear pedido</button>
    <h1>Admin inicio</h1>
</template>

<script setup>
import axios from 'axios';


function testPost(params) {
    axios.post('pendientes/nuevo').then((res)=>{
        console.log(res);
    }).catch(error =>{
        console.log(error);
        
    })
}
</script>

