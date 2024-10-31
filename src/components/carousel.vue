<script setup>
defineProps(['images'])

</script>

<template>
    <div id="carousel" class="carousel slide p-0" data-bs-ride="carousel" >
        <div class="carousel-inner" v-if="images.length === 1">
            <div class="carousel-item active" v-for="img in images">
                <img :src=img.url class="d-block w-100" :alt=img.alt>
            </div>
        </div>
        <div class="carousel-inner" v-else-if="images.length > 1">
            <div class="carousel-item active">
                <img :src=images[0].url class="d-block w-100" :alt=images[0].alt>
            </div>
            <div class="carousel-item" v-for="img in images.slice(1)">
                <img :src=img.url class="d-block w-100" :alt=img.alt>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
<style scoped>
img{
    height: 512px !important;
}
</style>