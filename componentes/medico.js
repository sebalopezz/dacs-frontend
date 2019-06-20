
const Medico = { 
    template: `
        <div>
            <h1> Bienvenido </h1>
            <h2> Esta es la pagina de medicos </h2>
            <router-link to="/" class="btn btn-success"> Registrar visita sin turno </router-link>
            <router-link to="/create" class="btn btn-success"> Nueva historia clinica </router-link><br><br>
            <router-link to="/medico/historiasclinicas" class="btn btn-primary"> Ver historias clínicas</router-link><br><br>
            <router-link to="/create" class="btn btn-primary"> Ver próximos turnos </router-link><br><br>
            <h2> Próximos turnos </h2>

        </div>
    ` 
}
