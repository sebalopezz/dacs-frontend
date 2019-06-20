
const Login = {
    template: `
        <div class="m-5 text-center"> 
            <input type="radio" id="one" value="paciente" v-model="opcion" checked>
            <label for="one">Paciente</label>
            <br>
            <input type="radio" id="two" value="medico" v-model="opcion">
            <label for="two">Medico</label>
            <br>
            <!-- <span>Eligio: {{ opcion }}</span> -->
            <h1>Login</h1>
            <form @submit.prevent="submit">
                <input type="text" v-model="dni" placeholder="Ingrese ID"><br>
                <input type="submit" class="btn btn-primary" value="Buscar">
            </form>
        </div>
    `,
    data(){
        return{
            opcion: '', //medico
            dni: '',
            buscar: true,
            historias: []
        }
    },
    methods: {
        submit: function () {
            if (this.opcion == 'medico') {
                this.$router.push("/medico");
            } else {
                this.$router.push({name: 'paciente.id', params: { id: this.dni }})
            }
        }
    }
}