<script setup>
defineProps({
    'idModal': {
        type: String,
        required: true
    },
    'title': {
        type: [String, null],
        required: true,
        default:null
    },
})
</script>
<template>
    <!-- Modal -->
    <div class="modal fade" :id="idModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header" >
                    <h1 class="modal-title fs-5" id="exampleModalLabel" v-if="title">{{title}}</h1>
                    <button type="button" :id="idModal +'-close'" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <!--       <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->
            </div>
        </div>
    </div>
</template>