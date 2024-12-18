const pelicula = {
    titulo: "El Padrino", 
    director: "Francis Ford Coppola", 
    genero: "Drama", 
    lanzamiento: 1972
}

//Antes: 

let titulo = pelicula.titulo;
console.log(titulo);

//Ahora: 

let {director, genero, lanzamiento, titulo:tituloPeli} = pelicula; 

console.log(director);
console.log(genero);
console.log(lanzamiento);
console.log(tituloPeli);