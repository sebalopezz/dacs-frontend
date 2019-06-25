
const PacienteVisita = { template: `
<div class="m-5">
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
</div>
`,
data(){
    return{
        idvisita: this.$route.params.id,
        visita: Object
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