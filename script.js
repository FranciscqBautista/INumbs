let numerosOriginales = [];
let numerosDesordenados = [];

function generarNumeros(cantidad) {
    const numeros = [];
    while (numeros.length < cantidad) {
        const numero = Math.floor(Math.random() * 90) + 10; // Números entre 10 y 99
        if (!numeros.includes(numero)) {
            numeros.push(numero);
        }
    }
    return numeros;
}

function mostrarNumerosSimultaneamente(numeros, tiempo, callback) {
    const display = document.getElementById("numeros");

    // Mostrar todos los números al mismo tiempo
    display.textContent = `Números: ${numeros.join(", ")}`;

    // Ocultar después del tiempo especificado
    setTimeout(() => {
        display.textContent = ""; // Limpiar la pantalla
        callback();
    }, tiempo * 1000);
}

function iniciarJuego() {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const tiempo = parseInt(document.getElementById("tiempo").value);

    numerosOriginales = generarNumeros(cantidad);
    numerosDesordenados = [...numerosOriginales].sort(() => Math.random() - 0.5);

    document.getElementById("configuracion").style.display = "none";

    mostrarNumerosSimultaneamente(numerosOriginales, tiempo, () => {
        document.getElementById("numeros").textContent = `Números desordenados: ${numerosDesordenados.join(", ")}`;
        document.getElementById("ordenar").style.display = "block";
    });
}

function verificarOrden() {
    const entrada = document.getElementById("entradaOrden").value;
    const numerosIngresados = entrada.split(",").map(num => parseInt(num.trim()));

    const esCorrecto = JSON.stringify(numerosIngresados) === JSON.stringify(numerosOriginales);

    if (esCorrecto) {
        alert("¡Felicidades! Has ordenado los números correctamente.");
    } else {
        alert(`Incorrecto. El orden correcto era: ${numerosOriginales.join(", ")}`);
    }

    // Reiniciar el juego
    document.getElementById("configuracion").style.display = "block";
    document.getElementById("ordenar").style.display = "none";
    document.getElementById("entradaOrden").value = "";
    document.getElementById("numeros").textContent = "";
}
