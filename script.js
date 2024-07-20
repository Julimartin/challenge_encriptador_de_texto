const botonEncriptar = document.getElementById("btn_encriptar");
const botonDesencriptar = document.getElementById("btn_desencriptar");
const botonCopiar = document.getElementById('btn_copiar');

function traducirTexto(textoEncriptado, reglas) {
    for (let item in reglas) {
        if (reglas.hasOwnProperty(item)) {
            const traduccion = reglas[item];
            textoEncriptado = textoEncriptado.split(item).join(traduccion);
        }
    }
    return textoEncriptado;
}

function encriptar(texto) {

    const reglas = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };
    return traducirTexto(texto, reglas);
}

function desencriptar(texto) {

    const reglas = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u"
    };
    return traducirTexto(texto, reglas);
}

function ocultarElementos() {
    document.getElementById('img-respuesta').classList.add('oculto');
    document.getElementById('instrucción').classList.add('oculto');
    document.getElementById('frase').classList.add('oculto');
}

function mostrarTexto(funcion) {
    ocultarElementos();
    const texto = document.getElementById("texto").value;
    const textoEncriptado = funcion(texto);
    document.getElementById('textoResultado').textContent = textoEncriptado;
    

    // Mostrar el botón de copiar si hay un resultado
    if (textoResultado) {
        botonCopiar.classList.remove('oculto');
    }
}

function copiarTexto() {
    const textoResultado = document.getElementById('textoResultado').textContent;
    navigator.clipboard.writeText(textoResultado)
        .then(() => {
            alert("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

botonEncriptar.addEventListener('click', () => mostrarTexto(encriptar));
botonDesencriptar.addEventListener('click', () => mostrarTexto(desencriptar));
botonCopiar.addEventListener('click', copiarTexto);