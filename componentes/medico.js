
const Medico = { 
    template: `
        <div id="medico">
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a @click="aTurnos" class="nav-link"> Turnos </a>
                    </li>
                    <li class="nav-item">
                        <a @click="aPacientes" class="nav-link"> Pacientes </a>
                    </li>
                </ul>
            </nav>
            <router-view></router-view>
        </div>
    `,
    created: function () {
        this.$router.push({path: '/medico/'+this.idmedico+'/pacientes'})
    },
    data() {
        return {
           idmedico: this.$route.params.idmed
        }
    },
    methods: {
        aTurnos: function () {
            this.$router.push({path: '/medico/'+this.idmedico+'/turnos'})
        },
        aPacientes: function () {
            this.$router.push({path: '/medico/'+this.idmedico+'/pacientes'})
        },
    },

}
