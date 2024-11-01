<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/assets/images/logo-melosos.png" alt="logo melosos" width="75" height="56">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse txt-notosans" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/catalogo" class="nav-link">Catálogo</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/talleres" class="nav-link">Talleres</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/contacto" class="nav-link">Contacto</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-brand{
    padding-bottom: 0 !important;
}

.navbar-nav .nav-link.active, .navbar-nav .nav-link.show{
    color: palevioletred;
}
</style>