const Turnos={
  template:`
<div class="m-5">
<h2 id="title-turnos">Turnos al dia: {{fecha}} </h2>
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
        <td>{{turno["nombre"].nombre }}</td>
        <td>{{turno.hora|filterHora}}</td>
        <td> 
          <button type="button" class="btn btn-outline-success" v-on:click="atenderVisita(turno.id, turno.idpaciente)">
            Atender
          </button>
        </td>
        <td><button type="button" class="btn btn-outline-danger" v-on:click="eliminarTurno(turno.id)">Quitar</button></td>
      </tr>
    </tbody>
</table>
<div class="loader" v-if="loading">Loading</div>
<div v-if='sinTurnos' class="alert alert-success" role="alert">
  No hay turnos pendientes
</div>
<div class="row" style="justify-content: center"></div>
</div>`,
  data(){
    return{
      turnos:[],
      atender:'',
      fecha:'',
      sinTurnos:false,
      loading:false,
      idMedico:this.$parent.idmedico
    }
  },
  created:function(){
    // this.idMedico='';
    this.fecha= new Date().toLocaleDateString();
    this.getTurnos();
  },
  methods:{
    getTurnos:function(){
      this.loading=true;
      // Api Grupo de historias
      const url="https://young-brook-94379.herokuapp.com/api/turnos/"
      fetch(API_TURNOS+this.idMedico)
        .then(response=>{
          response.json()
          .then(turnos=>{
            
            if (turnos.length>0){
              var fecha=new Date().toISOString().slice(0,10);
              turnos.forEach(turno => {
                if(turno['fecha']==fecha){
                  this.turnos.push(turno);
                };
              });
            };
            if(this.turnos.length==0){
              this.sinTurnos=true;
            }
            console.log(this.turnos);
            this.loading=false;
          });                   
        });          
    },
    atenderVisita:function(idTurno, idPaciente){
      // cambiar el estado del turno en la api, a atendido 
      // const url= ""
      fetch(API_TURNOS+idTurno ,{
        method:"PUT",
        body:JSON.stringify({
          "id":idTurno,
          "estado":"atendido"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response=>{
        response.json()
        .then(turnos=>{
          console.log(turnos)
          this.getTurnos()
        });                   
      }); 
      this.$router.push({name: 'medico.paciente.id', params: { id: idPaciente }});
    },
    eliminarTurno:function(idTurno){
      //eliminar o cambiar estado a ausente.
      // const url= ""
      // fetch(url,{
      //   method:"POST",
      //   body:{
      //     "id":idTurno,
      //     "estado":"ausente"
      //   }
      // })
      // .then(response=>{
      //   response.json()
      //   .then(turnos=>{
      //     this.turnos=turnos;
      //     console.log(turnos)
      //   });                   
      // }); 
    }
  },
  filters: {
    filterHora: function (value) {
      if (!value) return ''
      value = value.substring(0,5)
      return value
    },
    Dato:function(value){
      if(!value) return 'dato';
    }

  }
}