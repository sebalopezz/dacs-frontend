
const Medico = { 
    template: `
        <div id="medico">
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/medico/turnos" class="nav-link"> Turnos </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/medico/pacientes" class="nav-link"> Paciente </router-link>
                    </li>
                </ul>
            </nav>
            <router-view></router-view>
        </div>
    `,
    created: function () {
        this.$router.push({path: '/medico/'+this.dni+'/pacientes'})
    },
    data() {
        return {
           idmedico: this.$route.params.idmed
        }
    },

}
