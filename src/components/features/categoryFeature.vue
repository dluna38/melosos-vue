<script setup>
defineProps(['card','h','w'])
</script>
<template>
    <div>
        <img :src="card.image" :alt="card.name" :width="w" :height="h"
            class="mx-auto my-4 rounded-3 shadow-lg object-cover" />
        <h3 class="text-xl font-semibold text-pink-700">{{ card.name }}</h3>
        <p class="text-pink-400">{{ card.description }}</p>
    </div>
</template>