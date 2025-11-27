// NAVEGACIÓN ENTRE SECCIONES
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section-view');
    sections.forEach(sec => sec.classList.remove('active'));

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');

    if(sectionId === 'view-home') document.getElementById('link-home').classList.add('active');
    if(sectionId === 'view-insights') document.getElementById('link-insights').classList.add('active');
    if(sectionId === 'view-portfolio') document.getElementById('link-portfolio').classList.add('active');
    if(sectionId === 'view-opportunities') document.getElementById('link-opportunities').classList.add('active');
}

// CONTROL DE MODALES
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// CALCULADORA DE INTERÉS COMPUESTO
function calculateCompoundInterest() {
    let P = parseFloat(document.getElementById('init-amount').value) || 0;
    let PMT = parseFloat(document.getElementById('monthly-contrib').value) || 0;
    let r = parseFloat(document.getElementById('annual-rate').value);
    let years = parseFloat(document.getElementById('years-grow').value) || 0;

    if (isNaN(r)) r = 21.17;

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
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    document.getElementById('calc-result').innerText = formatter.format(futureValue);
}

// CÁLCULO TOTAL CARTERA
document.addEventListener('DOMContentLoaded', function() {
    calculatePortfolioTotal();
});

function calculatePortfolioTotal() {
    // Suma hardcodeada para evitar errores de parseo en JS simple
    // BTC: 240,590 + MSTR: 217,500 + NVDA: 267,000 + DHR: 98,000 + GOOGL: 43,750 = 866,840
    const total = 866840; 
    
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    
    const element = document.getElementById('total-portfolio-value');
    if(element) {
        element.innerText = formatter.format(total);
    }
}