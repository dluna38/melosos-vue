<template>
    <section class="vh-100 bg-purple-300">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block align-self-center">
                                <img src="/assets/images/logo-melosos.png" alt="login form" class="img-fluid" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">
                                    <form>
                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Iniciar sesión</h5>

                                        <div class="form-floating mb-4">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com">
                                            <label for="floatingInput">Correo</label>
                                        </div>
                                        <div class="form-floating mb-4">
                                            <input type="password" class="form-control" id="floatingPassword"
                                                placeholder="Password">
                                            <label for="floatingPassword">Contraseña</label>
                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button data-mdb-button-init data-mdb-ripple-init
                                                class="btn btn-dark btn-lg btn-block" type="button">Iniciar</button>
                                        </div>

                                        <a class="small text-muted" href="/administracion/inicio">Olvidaste la contraseña?</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
const user = ref({
    email: null,
    password: null
})

function makeLogin() {
    if (user.email === null || user.password === null) {
        return;
    }
    axios.get('http://localhost/meloso-app/public/sanctum/csrf-cookie').then(response => {
        console.log(response);
        axios.post('/login', user.value).then(response => {
            console.log('login complete');
            console.log(response);
        }).catch(error => {
            console.log('login error');
            console.log(error);
        })
    });
}
</script>

<style>
/* section {
    background-color: pink;
} */
</style>