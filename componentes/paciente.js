
const Paciente = { template: `
    <div class="m-5">
        <router-link to="/" class="btn btn-success"> < Volver a Login</router-link>
        <br><br>
        <table class="table ficha">
            <tr>
                <td class="w-25">ID Historia</td>
                <td>{{historia.id}}</td>
            </tr>
            <tr>
                <td>ID Paciente</td>
                <td>{{historia.idpaciente}}</td>
            </tr>
            <tr>
                <td>Fecha Inicio</td>
                <td>{{historia.fechainicio}}</td>
            </tr>
            <tr>
                <td>Grupo sanguineo</td>
                <td>{{historia.gruposanguineo}}</td>
            </tr>
            <tr>
                <td>Observaciones</td>
                <td>{{historia.observaciones}}</td>
            </tr>
        </table>
            <h4>Visitas</h4>
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Sintomas</th>
                    <th>Diagnostico</th>
                    <th>ID Receta</th>
                    <th>ID Medico</th>
                </tr>
            <thead>
                <tr v-for="visita in historia.visitas" v-on:click="getVisita(visita.id)" class="clickable-row">
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
        fetch(URL+'historiasclinicas/'+this.dni)
            .then(response => response.json())
            .then(json => this.historia = json)
        },
        getVisita: function (idvisita) {
            // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
            this.$router.push({name: 'visita.id', params: { id: idvisita }})
        }
    }
}