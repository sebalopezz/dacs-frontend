
const Pacientes = { template: `
<div class="m-5">
    Esto es pacientes
</div>
`/*,
data(){
    return{
        dni: this.$route.params.id,
        historia: Object,
        existe: false,
        loading:true
    }
},
created: function () {
    this.getHistoria();
},
methods: {
    getHistoria: function () {
    console.log('Se cargo la historia');
    fetch(URL+'historiasclinicas/'+this.dni)
        // Paso a texto el response 
        .then(response => response.text())
        .then(text => {
            if (text.length == 0){ 
                this.existe = false; // Si es 0, no existe devolvio NULL
                this.loading = false;
            } else {
                this.historia = JSON.parse(text); // Si no es 0, el response devolvio el objeto
                this.existe = true;
                this.loading = false;
            }
        })
    },
    getVisita: function (idvisita) {
        // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
        this.$router.push({name: 'visita.id', params: { id: idvisita }})
    }
}*/
}