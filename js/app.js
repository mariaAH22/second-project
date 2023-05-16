// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
explanation()
cargarEventListeners();

function cargarEventListeners() {
     // it activate when you click on add to cart
     listaCursos.addEventListener('click', agregarCurso);

     // if the course is deleted
     carrito.addEventListener('click', eliminarCurso);

     // when the car is emptied
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Functions
// add the course to the shopping cart
function agregarCurso(e) {
     e.preventDefault();
     // Delegation to add-cart
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // send the selected course so the data of the course can be read
          leerDatosCurso(curso);
     }
}

// read the data of the course that has been added
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// deleted the course of the DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // delet from the array which represent the cart
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// shows the course in the cart 
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// delted the courses from the DOM
function vaciarCarrito() {
     
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

function explanation() {
        const explanationUser = window.alert('In this project an example of a online courses shop will be shown. The propose of this project is to show that i am able to work with css, html and javascript.');
}
