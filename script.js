/* =========================================
   SCRIPT.JS - VERSIÓN ROBUSTA
   ========================================= */

// 1. FUNCIÓN DE NAVEGACIÓN
function showSection(sectionId) {
    console.log("Intentando mostrar sección:", sectionId); // Para depurar

    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section-view');
    sections.forEach(sec => {
        sec.style.display = 'none'; // Forzar ocultado con estilo directo
        sec.classList.remove('active');
    });

    // Desactivar todos los links del menú
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block'; // Forzar mostrado
        setTimeout(() => targetSection.classList.add('active'), 10); // Pequeño retardo para animación
    } else {
        console.error("No se encontró la sección con ID:", sectionId);
    }

    // Activar el link correspondiente en el menú
    // Mapeo manual para asegurar que coincida
    if(sectionId === 'view-home') document.getElementById('link-home').classList.add('active');
    if(sectionId === 'view-insights') document.getElementById('link-insights').classList.add('active');
    if(sectionId === 'view-portfolio') document.getElementById('link-portfolio').classList.add('active');
    if(sectionId === 'view-opportunities') document.getElementById('link-opportunities').classList.add('active');
}

// 2. CONTROL DE MODALES
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Bloquear scroll de fondo
    } else {
        console.error("Modal no encontrado:", modalId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restaurar scroll
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 3. CALCULADORA DE INTERÉS COMPUESTO
function calculateCompoundInterest() {
    let P = parseFloat(document.getElementById('init-amount').value) || 0;
    let PMT = parseFloat(document.getElementById('monthly-contrib').value) || 0;
    let r = parseFloat(document.getElementById('annual-rate').value);
    let years = parseFloat(document.getElementById('years-grow').value) || 0;

    if (isNaN(r)) r = 21.17; // Valor por defecto

    let annualRate = r / 100;
    let monthlyRate = annualRate / 12;
    let n = years * 12;
    let futureValue = 0;

    if (monthlyRate === 0) {
        futureValue = P + (PMT * n);
    } else {
        let compoundPrincipal = P * Math.pow(1 + monthlyRate, n);
        let compoundSeries = PMT * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
        futureValue = compoundPrincipal + compoundSeries;
    }

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0
    });

    const resultElement = document.getElementById('calc-result');
    if (resultElement) resultElement.innerText = formatter.format(futureValue);
}

// 4. INICIALIZACIÓN (Al cargar la página)
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Cargado. Inicializando...");
    
    // Asegurar que estamos en INICIO al abrir
    showSection('view-home');

    // Calcular el total de la cartera para el dashboard
    calculatePortfolioTotal();
});

function calculatePortfolioTotal() {
    const total = 866840; // Valor fijo o suma dinámica
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    const element = document.getElementById('total-portfolio-value');
    if(element) element.innerText = formatter.format(total);
}