//scripts para los formularios de añadir y modificar

//formulario añadir
const formulario = document.querySelector('#formulario');

if(formulario){
    formulario.addEventListener('submit', async (e) => {
        // evitar que el formulario recargue la página
        e.preventDefault(); 

        // datos del formulario
        const libro = new FormData(formulario);

        // enviar datos con fetch
        try {
            const respuesta = await fetch('/nuevoLibro', {
                method: 'POST',
                body: libro
            });
            //console.log(nuevoLibro.get('codigo'));

            if (respuesta.ok) {
                const resultado = await respuesta.json();
                
                if (resultado.exito === false) {
                    //hubo un error de validación en el servidor
                    const divError = document.getElementById('mensaje-error');
                    divError.innerText = resultado.mensaje;
                    divError.style.display = 'block';
                } else {
                    //todo bien
                    window.location.href = '/listado'; 
                }
            } else {
                console.error('Error HTTP en la petición');
            }
        } catch (error) {
            console.error('Fallo de red:', error);
        }
    });
}



//formularios editar y eliminar
const formEditar = document.querySelector('#formEditar');

if (formEditar){
    formEditar.addEventListener('submit', async (e) => {
        // evitar que el formulario recargue la página
        e.preventDefault(); 

        // datos del formulario
        const libro = new FormData(formEditar);

        // enviar datos con fetch
        try {
            const respuesta = await fetch('/editarLibro', {
                method: 'PUT',
                body: libro
            });
            //console.log(nuevoLibro.get('codigo'));

            if (respuesta.ok) {
                const resultado = await respuesta.json();
                
                if (resultado.exito === false) {
                    //hubo un error de validación en el servidor
                    const divError = document.getElementById('mensaje-error');
                    divError.innerText = resultado.mensaje;
                    divError.style.display = 'block';
                } else {
                    //todo bien
                    window.location.href = '/listado'; 
                }
            } else {
                console.error('Error HTTP en la petición');
            }
        } catch (error) {
            console.error('Fallo de red:', error);
        }
    });
}


const formEliminar = document.querySelector('#formEliminar');

if (formEliminar){
    formEliminar.addEventListener('submit', async (e) => {
        // evitar que el formulario recargue la página
        e.preventDefault(); 

        const confirmar = confirm("¿Está seguro de que desea eliminar este libro?");
        if (!confirmar) return;
        // datos del formulario
        const libro = new FormData(formEliminar);

        // enviar datos con fetch
        try {
            const respuesta = await fetch('/eliminarLibro', {
                method: 'DELETE',
                body: libro
            });
            //console.log(nuevoLibro.get('codigo'));

            if (respuesta.ok) {
                const resultado = await respuesta.json();
                //console.log('Datos enviados:', resultado);
                window.location.href = '/listado'; 
            } else {
                console.error('Error');
            }
        } catch (error) {
            console.error('Fallo de red:', error);
        }
    });
}
