const express = require('express');
const multer = require('multer'); 
const upload = multer(); 
const router = express.Router();
const {Libro, Biblioteca} = require("./claseBiblioteca.js");

//rutas
router.get('/registro', (req, res) => {
    res.render('formRegistro');
});

router.post('/nuevoLibro',  upload.none(), (req, res) =>{
    let BDLibros = new Biblioteca("biblioteca.json");

    const libro = req.body;
    //console.log('datos del formulario:', libro);

    let codigo = req.body.codigo;
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let ano = req.body.ano;
    let obtencion = req.body.obtencion;

    if(!codigo || isNaN(Number(codigo)) || !titulo || !autor || !ano){
        return res.json({ 
            exito: false, 
            mensaje: 'Libro NO registrado con éxito',
            libro: libro 
        });
    }
    else{
        codigo = Number(codigo);
        if(BDLibros.existeLibro(codigo)){
            return res.json({ 
                exito: false, 
                mensaje: 'Libro NO registrado con éxito',
                libro: libro 
            });
        }
        else{
            if (String(codigo).length == 13){
                BDLibros.registrarLibro(codigo, titulo, autor, ano, obtencion);
                BDLibros.cerrarBD();
                return res.json({ 
                    exito: true, 
                    mensaje: 'Libro registrado con éxito',
                    libro: libro 
                });
                //res.render('exito', { exito: "Éxto al Registrar el Libro", codigo: "codigo", titulo: "titulo" });
            }
            else{
                return res.json({ 
                    exito: false, 
                    mensaje: 'Libro NO registrado con éxito',
                    libro: libro 
                });
            } 
        }
    }
    BDLibros.cerrarBD();

});

router.put('/editarLibro', upload.none(), (req, res) => {
    let BDLibros = new Biblioteca("biblioteca.json");

    const libro = req.body;
    //console.log('datos del formulario:', libro);

    let codigo = req.body.codigo;
    let i = BDLibros.buscarLibro(codigo);
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let ano = req.body.ano;
    let obtencion = req.body.obtencion;


    if(!codigo || isNaN(Number(codigo)) || !titulo || !autor || !ano){
        return res.json({ 
            exito: false, 
            mensaje: 'Libro NO actualizado con éxito',
            libro: libro 
        });
    }
    else{
        i.titulo = titulo;
        i.autor = autor;
        i.ano = ano;
        i.obtencion = obtencion;

        BDLibros.cerrarBD();
        return res.json({ 
            exito: true, 
            mensaje: 'Libro actualizado con éxito',
            libro: libro 
        });
    }
});

router.post('/busquedaLibro', (req, res) => {
    let BDLibros = new Biblioteca("biblioteca.json");
    
    let codigo = req.body.codigo;

    if(!codigo || isNaN(Number(codigo))){
        res.render('fallo',  { error: "Código invalido", codigo: "codigo", titulo: "titulo" });
    }
    else{
        if(!BDLibros.existeLibro(codigo)){
            res.render('fallo',  { error: "El Libro no Existe en la Base de Datos", codigo: "codigo", titulo: "titulo"  });
        }
        else{
            let i = BDLibros.buscarLibro(codigo);

            let titulo = i.titulo;
            let autor = i.autor;
            let ano = i.ano;
            let obtencion = i.obtencion;
        
            res.render('formModificar', { codigo:codigo, titulo:titulo, autor:autor, ano:ano, obtencion:obtencion })
        }

    }
});

router.get('/listado', upload.none(), (req, res) => {
    res.render('listado');
});

router.get('/api/biblioteca', upload.none(), (req, res) => {
    let BDLibros = new Biblioteca("biblioteca.json");
    res.json(BDLibros.listaLibros);
});

router.delete('/eliminarLibro', upload.none(), (req, res) => {
    let BDLibros = new Biblioteca("biblioteca.json");

    const libro = req.body;
    //console.log('datos del formulario:', libro);

    let codigo = req.body.codigo;
    //console.log(codigo);
    if(!codigo || isNaN(Number(codigo))){
        return res.json({ 
            exito: false, 
            mensaje: 'Libro NO eliminado con éxito',
            libro: libro 
        });
    }
    else{
        codigo = Number(codigo);
        BDLibros.eliminarLibro(codigo);
        BDLibros.cerrarBD();
    
        return res.json({ 
            exito: true, 
            mensaje: 'Libro eliminado con éxito',
            libro: libro 
        });
    }
    
});


module.exports = router;