// Obtención de elementos del DOM
const botonEncriptar = document.getElementById("btn_encriptar");
const botonDesencriptar = document.getElementById("btn_desencriptar");
const botonCopiar = document.getElementById('btn_copiar');
const textoInput = document.getElementById("texto");
const textoResultadoElement = document.getElementById('textoResultado');
const imgRespuesta = document.getElementById('img-respuesta');
const instruccion = document.getElementById('instrucción');
const frase = document.getElementById('frase');


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
    frase.classList.add('oculto');
}


function mostrarTexto(funcion) {
    const texto = textoInput.value;

    if (!validarTexto(texto)) {
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


function copiarTexto() {
    const textoResultado = textoResultadoElement.textContent;
    navigator.clipboard.writeText(textoResultado)
        .then(() => alert("Texto copiado al portapapeles"))
        .catch(err => console.error('Error al copiar el texto: ', err));
}


botonEncriptar.addEventListener('click', () => mostrarTexto(encriptar));
botonDesencriptar.addEventListener('click', () => mostrarTexto(desencriptar));
botonCopiar.addEventListener('click', copiarTexto);
