<script setup>
import { onErrorCaptured, onMounted, ref } from 'vue';
import SimpleModal from '../simpleModal.vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const emit = defineEmits(['detectedQrCode']);

const status = ref({1:'Cargando...',2:'Buscando...',3:'Encontrado',4:'Error'})
const statusActual = ref(1)
const error = ref(null)
const activeQr = ref(false);
let qrmodal = null
function onDetect(detectedCodes) {
    console.log(detectedCodes)
    try {
        let value = JSON.parse(detectedCodes[0].rawValue)
        console.log(value);
        statusActual.value = 3;
        //validar formato
        emit('detectedQrCode',value);
        document.getElementById('qr-modal-close').click();
        
    } catch (err) {
        console.log(err);
    }

}

function logErrors(err) {
    error.value = `[${err.name}]: `

    if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
        error.value +=
            'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
        error.value += err.message
    }

}
const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref(defaultConstraintOptions)

async function onCameraReady() {

  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId }
    }))
  ]
  statusActual.value=2;
  error.value = ''
}

onMounted(() => {
    qrmodal = document.getElementById('qr-modal');

    qrmodal.addEventListener('shown.bs.modal', ((event) => {
        console.log('qr modal abierto');
        activeQr.value = true;
    }))
    qrmodal.addEventListener('hide.bs.modal', ((event) => {
        console.log('qr modal cerrado');
        activeQr.value = false;
    }))
})
</script>
<template>
    <SimpleModal id-modal="qr-modal" title="Leer Código QR">
        <div v-if="activeQr">
            <QrcodeStream @error="logErrors" @detect="onDetect" @camera-on="onCameraReady" :constraints="selectedConstraints" />
        </div>
        <div class="text-center">
            Estado: {{ status[statusActual] }}
        </div>
        <div class="text-center">
            {{ error }}
        </div>
    </SimpleModal>
</template>

<style></style>