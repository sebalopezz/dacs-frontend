
const PacienteVisita = { template: `
<div class="m-5">
<<<<<<< HEAD
    <h1>Esta es una visita</h1>
    <router-link to="/" class="btn btn-success">Volver a Login</router-link>
    <table class="table ficha">
        <tr>
            <td class="w-25">ID Visita</td>
            <td>{{visita.id}}</td>
        </tr>
        <tr>
            <td>Fecha</td>
            <td>{{visita.fecha}}</td>
        </tr>
        <tr>
            <td>Sintomas</td>
            <td>{{visita.sintomas}}</td>
        </tr>
        <tr>
            <td>Diagnostico</td>
            <td>{{visita.diagnostico}}</td>
        </tr>
        <tr>
            <td>ID Receta</td>
            <td>{{visita.idreceta}}</td>
        </tr>
        <tr>
            <td>ID Medico</td>
            <td>{{visita.idmedico}}</td>
        </tr>
        <tr>
            <td>ID Partida</td>
            <td>{{visita.idpartida}}</td>
        </tr>
        <tr>
            <td>ID Historia Clinica</td>
            <td>{{visita.idhistoriaclinica}}</td>
        </tr>
    </table>
    <h4> Medicamentos </h4>
=======
    <div class="loader" v-if="loading">Loading</div>
    <div v-if="!loading">
        <a href="#" @click="$router.go(-1)" class="btn btn-success" > Volver a la historia clinica </a>
        <h4 class="text-center">Visita</h4>
        <table class="table table-sm ficha">
            <tr>
                <td class="w-25">ID Visita</td>
                <td>{{visita.id}}</td>
            </tr>
            <tr>
                <td>Fecha</td>
                <td>{{visita.fecha}}</td>
            </tr>
            <tr>
                <td>Sintomas</td>
                <td>{{visita.sintomas}}</td>
            </tr>
            <tr>
                <td>Diagnostico</td>
                <td>{{visita.diagnostico}}</td>
            </tr>
            <tr>
                <td>ID Receta</td>
                <td>{{visita.idreceta}}</td>
            </tr>
            <tr>
                <td>ID Medico</td>
                <td>{{visita.idmedico}}</td>
            </tr>
            <tr>
                <td>ID Partida</td>
                <td>{{visita.idpartida}}</td>
            </tr>
            <tr>
                <td>ID Historia Clinica</td>
                <td>{{visita.idhistoriaclinica}}</td>
            </tr>
        </table>
        <h4 class="text-center"> Receta </h4>
    </div>
>>>>>>> 223c3f1490007dbf7047ef0b0663a1cc0a426336
</div>
`,
data(){
    return{
        idvisita: this.$route.params.id,
<<<<<<< HEAD
        visita: Object
=======
        visita: Object,
        loading: true,
        receta: []
>>>>>>> 223c3f1490007dbf7047ef0b0663a1cc0a426336
    }
},
created: function () {
    this.getVisita();
},
methods: {
    getVisita: function () {
    console.log('Se cargo la visita');

    fetch(URL+'visitas/'+this.idvisita)
        .then(response => response.json())
        .then(json => this.visita = json)
    }
    }
}
