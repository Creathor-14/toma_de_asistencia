
const img_logo = document.querySelector('.logo');
const page = document.querySelector('.pagina');



function mostrarLogo() {
    //img_logo.style.display = 'block';
    page.style.display = 'none';
    
}
function ocultarLogo() {
    img_logo.classList.add("desaparece");
}
function mostrarPagina() {
    
    page.style.display = 'block';
}
function fix(){
    img_logo.style.display = 'none';
}



setTimeout(mostrarLogo, 1000);
setTimeout(ocultarLogo, 3000);

setTimeout(fix, 6500);
setTimeout(mostrarPagina, 4000);