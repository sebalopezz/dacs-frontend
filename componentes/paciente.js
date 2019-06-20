
const Paciente = { template: `
    <div class="m-5">
        <h1>Esta es su historia clinica</h1>
        <router-link to="/" class="btn btn-success">Volver a Login</router-link>
            <p>ID Historia: {{historia.id}}</p>
            <p>ID Paciente: {{historia.idpaciente}}</p>
            <p>Fecha Inicio: {{historia.fechainicio}}</p>
            <p>Grupo sanguineo: {{historia.gruposanguineo}}</p>
            <p>Observaciones: {{historia.observaciones}}</p>
            <h4>Visitas</h4>
            <table class="table">
                <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Sintomas</th>
                    <th>Diagnostico</th>
                    <th>ID Receta</th>
                    <th>ID Medico</th>
                </tr>
                <tr v-for="visita in historia.visitas" v-on:click="getVisita(visita.id)">
                    <td>{{visita.id}}</td>
                    <td>{{visita.fecha}}</td>
                    <td>{{visita.sintomas}}</td>
                    <td>{{visita.diagnostico}}</td>
                    <td>{{visita.idreceta}}</td>
                    <td>{{visita.idmedico}}</td>
                </tr>
            </table>
    </div>
    `,
    data(){
        return{
            dni: this.$route.params.id,
            historia: Object
        }
    },
    created: function () {
        this.getHistoria();
    },
    methods: {
        getHistoria: function () {
        console.log('Se cargo la historia');
        // console.log(this.opcion);
        // console.log(this.dni);
        // this.buscar = false;
        fetch('https://young-brook-94379.herokuapp.com/api/historiasclinicas/'+this.dni)
            .then(response => response.json())
            .then(json => this.historia = json)
        },
        getVisita: function (idvisita) {
            // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
            this.$router.push({name: 'visita.id', params: { id: idvisita }})
        }
    }
}