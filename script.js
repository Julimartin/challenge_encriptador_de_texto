// Obtención de elementos del DOM
const botonEncriptar = document.getElementById("btn_encriptar");
const botonDesencriptar = document.getElementById("btn_desencriptar");
const botonCopiar = document.getElementById('btn_copiar');
const textoInput = document.getElementById("texto");
const textoResultadoElement = document.getElementById('textoResultado');
const imgRespuesta = document.getElementById('main__response-img');
const instruccion = document.getElementById('main__response-instruction');
const no_message = document.getElementById('main__response-no-message');


const reglasEncriptar = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const reglasDesencriptar = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};


function traducirTexto(texto, reglas) {
    for (const item in reglas) {
        if (reglas.hasOwnProperty(item)) {
            texto = texto.split(item).join(reglas[item]);
        }
    }
    return texto;
}


const encriptar = texto => traducirTexto(texto, reglasEncriptar);
const desencriptar = texto => traducirTexto(texto, reglasDesencriptar);


function validarTexto(texto) {
    const regex = /^[a-z\s]+$/;
    return regex.test(texto);
}


function ocultarElementos() {
    imgRespuesta.classList.add('oculto');
    instruccion.classList.add('oculto');
    no_message.classList.add('oculto');
}


function mostrarTexto(funcion) {
    const texto = textoInput.value;

    if (!texto) {
        alert("El campo de texto está vacío. Por favor, ingresa un texto.");
    }
    else if (!validarTexto(texto)) {
        alert("Solo letras minúsculas sin acentos ni caracteres especiales.");
    } else {
        ocultarElementos();
        const textoResultado = funcion(texto);
        
        // Reiniciar la animación
        textoResultadoElement.classList.remove('fadeIn');
        void textoResultadoElement.offsetWidth; // Forzar reflujo
        textoResultadoElement.classList.add('fadeIn');

        textoResultadoElement.textContent = textoResultado;


        if (textoResultado) {
            botonCopiar.classList.remove('oculto');
        }
    }
}

function resetearMainResponse() {
    if (textoInput.value.trim() === "") {
        // Restablece el contenido a su estado original
        imgRespuesta.classList.remove('oculto');
        instruccion.classList.remove('oculto');
        no_message.classList.remove('oculto');
        textoResultadoElement.textContent = "";
        botonCopiar.classList.add('oculto');
    }
}

function copiarTexto() {
    const textoResultado = textoResultadoElement.textContent;
    navigator.clipboard.writeText(textoResultado)
        .then(() => alert("Texto copiado al portapapeles"))
        .catch(err => console.error('Error al copiar el texto: ', err));
}


botonEncriptar.addEventListener('click', () => mostrarTexto(encriptar));
botonDesencriptar.addEventListener('click', () => mostrarTexto(desencriptar));
botonCopiar.addEventListener('click', copiarTexto);
textoInput.addEventListener('input', resetearMainResponse);