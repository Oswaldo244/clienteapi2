let urlPOST= "https://accounts.spotify.com/api/token";

let llave1="grant_type=client_credentials";
let llave2="client_id=23c8592aab72489fb412363a17c6e77c";
let llave3="client_secret=2d439c7cab54401f8cb31647885a4141";

let peticionPOST={
    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:llave1+'&'+llave2+'&'+llave3
}

fetch(urlPOST,peticionPOST)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(datos){
    let token=datos.token_type+" "+datos.access_token;
    console.log(token);
    traerCanciones(token);
})

function traerCanciones(token){
    
    let url="https://api.spotify.com/v1/artists/28gNT5KBp7IjEOQoevXf9N/top-tracks?market=US";
    
    let peticion={
        method:"GET",
        headers:{Authorization:token}
        
    }
    
    fetch(url,peticion)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datosLlegada){
        console.log(datosLlegada);
        console.log(datosLlegada.tracks);
        console.log(datosLlegada.tracks[0]);
        console.log(datosLlegada.tracks[0].name);
        console.log(datosLlegada.tracks[0].preview_url);
        console.log(datosLlegada.tracks[0].album.images[0].url);
        
        let canciones=datosLlegada.tracks;
        pintarDatos(canciones);
        
    })
    
}

function pintarDatos(canciones){
    let contenedorPadre=document.getElementById("contenedorPadre");
    
    canciones.map(function(cancion){
        
        let columna=document.createElement('div');
        columna.classList.add("col");
        
        let tarjeta=document.createElement('div');
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");
        
        let imagen=document.createElement('img');
        imagen.classList.add("card-img-top");
        imagen.src=cancion.album.images[0].url;
        
        let titulo=document.createElement('h3');
        titulo.classList.add("text-center");
        titulo.textContent=cancion.name;
        
        let audio=document.createElement('audio');
        audio.classList.add("w-100");
        audio.setAttribute("controls","");
        audio.src=cancion.preview_url;
        
        tarjeta.appendChild(titulo);
        
        tarjeta.appendChild(imagen);
        
        tarjeta.appendChild(audio);
        
        columna.appendChild(tarjeta);
        
        contenedorPadre.appendChild(columna);
        
    });
}