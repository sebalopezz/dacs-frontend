
const Visita = { template: `
<div class="m-5">
    <h1>Esta es una visita</h1>
    <router-link to="/" class="btn btn-success">Volver a Login</router-link>
    <!-- <div v-for="visita in visitas"> -->
        <p>ID Visita: {{visita.id}}</p>
        <p>Fecha: {{visita.fecha}}</p>
        <p>Sintomas: {{visita.sintomas}}</p>
        <p>Diagnostico: {{visita.diagnostico}}</p>
        <p>ID Receta: {{visita.idreceta}}</p>
        <p>ID Medico: {{visita.idmedico}}</p>
        <p>ID Partida: {{visita.idpartida}}</p>
        <p>ID Historia Clinica: {{visita.idhistoriaclinica}}</p>
    <!-- </div> -->
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

    fetch('https://young-brook-94379.herokuapp.com/api/visitas/'+this.idvisita)
        .then(response => response.json())
        .then(json => this.visita = json)
    }
}
}