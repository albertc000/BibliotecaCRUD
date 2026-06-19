//clase para libros y sus funciones
const fs = require("fs");
const prompt = require("prompt-sync")();
const readline = require('readline-sync');

class Libro {
    codigo;     //texto/numero
    titulo;     //texto
    autor;      //texto
    ano;        //numero
    obtencion;  //texto

    constructor(codigo, titulo, autor, ano, obtencion) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.obtencion = obtencion;
    }
}

class Biblioteca {

    listaLibros = [];
    JsonName = "";

    constructor(JsonName) {
        this.JsonName = JsonName;
        if (fs.existsSync(JsonName)) {
            const dataBase = fs.readFileSync(JsonName, "utf8");
            //console.log(dataBase);
            const data = JSON.parse(dataBase).listaLibros;
            //console.log(data); 
            this.listaLibros = data.map(a => new Libro(a.codigo, a.titulo, a.autor, a.ano, a.obtencion));
        } else {
            const dataBase = JSON.stringify({ listaLibros: [] }, null, 2);
            fs.writeFileSync(JsonName, dataBase);
        }
    }


    registrarLibro(codigo, titulo, autor, ano, obtencion) {
        const nuevoLibro = new Libro(codigo, titulo, autor, ano, obtencion);
        this.listaLibros.push(nuevoLibro);
    }

    eliminarLibro(codigo) {
        let libro = this.listaLibros.findIndex(libro => libro.codigo === codigo);
        if (libro !== -1) {
            this.listaLibros.splice(libro, 1);
        }
    }

    buscarLibro(codigo) {
        return this.listaLibros.find(libro => libro.codigo == codigo);
    }

    modificarLibro(codigo, titulo, autor, ano, obtencion) {
        let libro = this.buscarLibro(codigo);
        libro.titulo = titulo;
        libro.autor = autor;
        libro.ano = ano;
        libro.obtencion = obtencion;
    }

    existeLibro(codigo) {
        return this.listaLibros.some(libro => libro.codigo == codigo);
    }

    cerrarBD() {
        const dataBase = JSON.stringify({ listaLibros: this.listaLibros }, null, 2);
        fs.writeFileSync(this.JsonName, dataBase);
    }
}

module.exports.Libro = Libro;
module.exports.Biblioteca = Biblioteca;