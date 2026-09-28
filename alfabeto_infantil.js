//-------------------------------------//
//--|funcionalidad_alfabeto_infantil|--//
//-------------------------------------//
const tarjetas = document.querySelectorAll(".tarjeta_letra");
const botones_favorito = document.querySelectorAll(".boton_favorito");
const botones_escuchar = document.querySelectorAll(".boton_escuchar");
const buscador = document.getElementById("buscar_alfabeto");
const cantidad_favoritos = document.getElementById("cantidad_favoritos");
const limpiar_favoritos = document.getElementById("limpiar_favoritos");
const mensaje_busqueda = document.getElementById("mensaje_busqueda");
//-----------------------------------------------------------//
//--|guardar_y actualizar_en_favoritos_usando_localstorage|--//
//-----------------------------------------------------------//
let favoritos = JSON.parse(localStorage.getItem("favoritos_alfabeto")) || [];
function actualizar_favoritos() {
    tarjetas.forEach(
        function(tarjeta) {
            const id = tarjeta.dataset.id;
            const boton = tarjeta.querySelector(".boton_favorito");
            const icono = boton.querySelector("i");
            if (favoritos.includes(id)) {
                boton.classList.add("activo");
                icono.classList.remove("fa-regular");
                icono.classList.add("fa-solid");
            } else {
                boton.classList.remove("activo");
                icono.classList.remove("fa-solid");
                icono.classList.add("fa-regular");
            }
        }
    );
    cantidad_favoritos.textContent = favoritos.length;
    localStorage.setItem("favoritos_alfabeto", JSON.stringify(favoritos));
}
//-----------------------//
//--|eventos_favoritos|--//
//-----------------------//
botones_favorito.forEach(
    function(boton, indice) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = tarjetas[indice];
                const id = tarjeta.dataset.id;
                if (favoritos.includes(id)) {
                    favoritos =
                        favoritos.filter(
                            function(favorito) {
                                return favorito !== id;
                            }
                        );
                } else {
                    favoritos.push(id);
                }
                actualizar_favoritos();
            }
        );
    }
);
//-----------------------//
//--|busqueda_tarjetas|--//
//-----------------------//
buscador.addEventListener(
    "input",
    function() {
        const texto = buscador.value .toLowerCase() .trim();
        let resultados = 0;
        tarjetas.forEach(
            function(tarjeta) {
                const letra = tarjeta.dataset.letra;
                const palabra = tarjeta.dataset.palabra;
                const coincide = letra.includes(texto) || palabra.includes(texto);
                if (coincide) {
                    tarjeta.style.display = "";
                    resultados++;
                } else {
                    tarjeta.style.display = "none";
                }
            }
        );
        if (resultados === 0) {
            mensaje_busqueda.classList.add("mostrar");
        } else {
            mensaje_busqueda.classList.remove("mostrar");
        }
    }
);
//-------------------------//
//--|lectura_de_palabras|--//
//-------------------------//
botones_escuchar.forEach(
    function(boton, indice) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = tarjetas[indice];
                const letra = tarjeta.dataset.letra;
                const palabra = tarjeta.dataset.palabra;
                const texto = `${letra}. ${palabra}`;
                const voz = new SpeechSynthesisUtterance(texto);
                voz.lang = "es-ES";
                voz.rate = 0.8;
                speechSynthesis.cancel();
                speechSynthesis.speak(voz);
            }
        );
    }
);
//----------------------------------------//
//--|limpiar_favoritos_con_localstorage|--//
//----------------------------------------//
limpiar_favoritos.addEventListener(
    "click",
    function() {
        if (favoritos.length === 0) {
            alert("No hay favoritos guardados.");
            return;
        }
        const confirmar = confirm("¿Deseas eliminar todos los favoritos?");
        if (!confirmar) {
            return;
        }
        favoritos = [];
        localStorage.removeItem("favoritos_alfabeto");
        actualizar_favoritos();
    }
);
actualizar_favoritos();