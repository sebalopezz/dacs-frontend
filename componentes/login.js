
const Login = {
    template: `
        <div class="row text-center login-section">
            <div class="col-md-5 m-auto" >
                <h1>Historias clínicas</h1>
                <form @submit.prevent="submit" class="login-form">
                    <h4>Iniciar sesión</h4>
                    <input type="radio" id="one" value="paciente" v-model="opcion">
                    <label for="one" class="mr-5">Paciente</label>
                    <input type="radio" id="two" value="medico" v-model="opcion">
                    <label for="two">Medico</label>
                    <input type="text" v-model="dni" placeholder="Ingrese ID" class="w-100 p-2">
                    <input type="submit" class="btn btn-primary w-100 p-2" value="Buscar">
                </form>
            </div>
        </div>
    `,
    data(){
        return{
            opcion: 'paciente', // o medico
            dni: '',
            buscar: true,
            historias: []
        }
    },
    methods: {
        submit: function () {
            if (this.opcion == 'medico') {
                this.$router.push({name: 'medico.id', params: { idmed: this.dni }})
            } else {
                this.$router.push({name: 'paciente.id', params: { id: this.dni }})
            }
        }
    }
}