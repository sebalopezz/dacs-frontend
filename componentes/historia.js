
const Historia = { template: `
<div class="m-5">
    <h1>Esta es una historia</h1>
    <router-link to="/" class="btn btn-success">Volver a Login</router-link>
    <table class="table ficha">
        <tr>
            <td class="w-25">ID Visita</td>
            <td>{{historia.id}}</td>
        </tr>
        <tr>
            <td>Fecha</td>
            <td>{{historia.pacienteId}}</td>
        </tr>
        <tr>
            <td>Sintomas</td>
            <td>{{historia.fechaInicio}}</td>
        </tr>
        <tr>
            <td>Diagnostico</td>
            <td>{{historia.grupoSanguineo}}</td>
        </tr>
        <tr>
            <td>ID Receta</td>
            <td>{{historia.observaciones}}</td>
        </tr>
    </table>
    <h4>Visitas</h4>
    <table class="table table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Fecha</th>
                <th>Sintomas</th>
                <th>Diagnostico</th>
                <th>ID Receta</th>
                <th>ID Medico</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="visita in historia.visitas" v-on:click="getVisita(visita.id)" class="clickable-row">
                <td>{{visita.id}}</td>
                <td>{{visita.fecha}}</td>
                <td>{{visita.sintomas}}</td>
                <td>{{visita.diagnostico}}</td>
                <td>{{visita.idreceta}}</td>
                <td>{{visita.idmedico}}</td>
            </tr>
        </tbody>
    </table>    
    <h4> Medicamentos </h4>
</div>
`,
data(){
    return{
        idhistoria: this.$route.params.id,
        historia: Object
    }
},
created: function () {
    this.getHistoria();
},
methods: {
    getHistoria: function () {
    console.log('Se cargo la historia');

    fetch(URL+'historiasclinicas/'+this.idhistoria)
        .then(response => response.json())
        .then(json => this.historia = json)
    }
}
}