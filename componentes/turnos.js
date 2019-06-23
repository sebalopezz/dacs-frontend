const Turnos={
    template:`
<div>
  <h2 id="title-turnos">Turnos al dia: 22/06</h2>
  <table class="table text-center table-striped" id="table-turnos">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Orden</th>
          <th scope="col">Nombre</th>
          <th scope="col">Horario</th>
          <th scope="col">Atender</th>
          <th scope="col">Ausente</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(turno, index) in turnos"> 
          <th scope="row">{{index+1}}</th>
          <td>{{turno.nombre}}</td>
          <td>{{turno.hrInicio|filterHora}}</td>
          <td> 
            <button type="button" class="btn btn-outline-success" v-on:click="atenderVisita(turno.idPaciente)">
              Atender
            </button>
          </td>
          <td><button type="button" class="btn btn-outline-danger">Quitar</button></td>
        </tr>
      </tbody>
  </table>
  <div class="row" style="justify-content: center">
</div>
</div>`,
    data(){
      return{
        turnos:[],
        atender:'', 
      }
    },
    created:function(){
      this.turnos.push({
        id:10,
        idPaciente:1,
        idMedico:10,
        nombre:'Gerardo Enrique',
        hrInicio:'2019-06-20T21:41:43.802+0000',
        fechaTurno:'2019-03-15'
      });
      this.turnos.push({
        id:11,
        idPaciente:2,
        idMedico:10,
        nombre:'Sebastian Lopez',
        hrInicio:'2019-06-20T21:41:43.802+0000',
        fechaTurno:'2019-03-15'
      });
     console.log(this.turnos);
      
    },
    methods:{
      getTurnos:function(){
        console.log('Se inicializa y busca el tu')
        fetch(URL+'historiasclinicas/'+this.dni)
          .then(response=>{
            this.turnos=response;
          });
      },
      atenderVisita:function(idPaciente){
        this.$router.push({name: 'medico.paciente.id', params: { id: idPaciente }})
      }     

    },
    // "2019-06-20T21:41:43.802+0000"
    filters: {
      filterHora: function (value) {
        if (!value) return ''
        value = value.substring(11,16)
        return value
      }
    }
}