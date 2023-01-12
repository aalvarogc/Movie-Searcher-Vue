const { createApp } = Vue;
    
createApp({
  // DATOS
  data() {
    return {
        films: [],
        filmInformation: [],
        pagina: 1,
        httpRequest: new XMLHttpRequest(),
        movieSearcherInput: "",
        activeSearch: false,
        activeLightBox: false,
        moviesNotFounded: false
    }
  },
  // MÉTODOS
  methods:{
    lanzaPrimeraPeticionPeliculas(){
        this.pagina = 1;
        this.httpRequest.open("GET", "https://www.omdbapi.com/?apikey=b8d85a5&page="+this.pagina+"&s="+this.movieSearcherInput);
        this.httpRequest.onreadystatechange = this.tratarPrimerasPeliculas;
        this.httpRequest.send();
        this.pagina++;
    },
    tratarPrimerasPeliculas(){
        if(this.httpRequest.readyState === XMLHttpRequest.DONE){
            if(this.httpRequest.status === 200){
                this.datos = JSON.parse(this.httpRequest.responseText);
                this.activeSearch = true;
                if(this.datos.Response != "False"){
                    this.films = this.datos.Search;
                    this.moviesNotFounded = false;
                }else{
                    this.moviesNotFounded = true;
                }
            }
        }
    },
    lanzaPeticionInformacionPelicula(id){
        this.httpRequest.open("GET", "https://www.omdbapi.com/?apikey=b8d85a5&i="+id);
        this.httpRequest.onreadystatechange = this.tratarInformacionPelicula;
        this.httpRequest.send();
    },
    tratarInformacionPelicula(){
        if(this.httpRequest.readyState === XMLHttpRequest.DONE){
            if(this.httpRequest.status === 200){
                this.activeLightBox = true;
                datos = JSON.parse(this.httpRequest.responseText);
                if(datos.Response != "False"){
                    this.filmInformation = datos;
                }else{
                    return false;
                }
            }
        }
    },
    lanzaPeticionPeliculas(){
        this.httpRequest.open("GET", "https://www.omdbapi.com/?apikey=b8d85a5&page="+this.pagina+"&s="+document.getElementById("artistName").value);
        this.httpRequest.onreadystatechange = this.tratarPeliculas;
        this.httpRequest.send();
        this.pagina++;
    },
    tratarPeliculas(){
        if(this.httpRequest.readyState === XMLHttpRequest.DONE){
            if(this.httpRequest.status === 200){
                this.datos = JSON.parse(this.httpRequest.responseText);
                if(this.datos.Response != "False"){
                    this.films = this.films.concat(this.datos.Search);
                }else{
                    return false;
                }
            }
        }
    },
    eventScroll(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 400) {
            this.lanzaPeticionPeliculas();
        }
    }
  },
  mounted(){
    window.addEventListener("scroll", this.eventScroll);
  }
}).mount('#app')