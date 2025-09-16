// Sample data for medications
const medicamentos = [
    {
        id: 1,
        nombre: "Paracetamol",
        laboratorio: "Pfizer",
        principioActivo: "Paracetamol",
        concentracion: "500 mg",
        presentacion: "Tabletas",
        categoria: "Analgésico",
        stock: 150,
        precio: 5.99,
        requiereReceta: false
    },
    {
        id: 2,
        nombre: "Ibuprofeno",
        laboratorio: "Bayer",
        principioActivo: "Ibuprofeno",
        concentracion: "400 mg",
        presentacion: "Tabletas",
        categoria: "Antiinflamatorio",
        stock: 89,
        precio: 7.50,
        requiereReceta: false
    },
    {
        id: 3,
        nombre: "Amoxicilina",
        laboratorio: "Roche",
        principioActivo: "Amoxicilina",
        concentracion: "500 mg",
        presentacion: "Cápsulas",
        categoria: "Antibiótico",
        stock: 45,
        precio: 12.75,
        requiereReceta: true
    },
    {
        id: 4,
        nombre: "Atorvastatina",
        laboratorio: "Pfizer",
        principioActivo: "Atorvastatina",
        concentracion: "20 mg",
        presentacion: "Tabletas",
        categoria: "Cardiovascular",
        stock: 32,
        precio: 15.20,
        requiereReceta: true
    },
    {
        id: 5,
        nombre: "Omeprazol",
        laboratorio: "Merck",
        principioActivo: "Omeprazol",
        concentracion: "40 mg",
        presentacion: "Cápsulas",
        categoria: "Gastrointestinal",
        stock: 120,
        precio: 9.99,
        requiereReceta: false
    },
    {
        id: 6,
        nombre: "Loratadina",
        laboratorio: "Novartis",
        principioActivo: "Loratadina",
        concentracion: "10 mg",
        presentacion: "Tabletas",
        categoria: "Antialérgico",
        stock: 75,
        precio: 6.80,
        requiereReceta: false
    },
    {
        id: 7,
        nombre: "Metformina",
        laboratorio: "Merck",
        principioActivo: "Metformina",
        concentracion: "850 mg",
        presentacion: "Tabletas",
        categoria: "Diabetes",
        stock: 60,
        precio: 8.45,
        requiereReceta: true
    },
    {
        id: 8,
        nombre: "Aspirina",
        laboratorio: "Bayer",
        principioActivo: "Ácido Acetilsalicílico",
        concentracion: "500 mg",
        presentacion: "Tabletas",
        categoria: "Analgésico",
        stock: 200,
        precio: 4.50,
        requiereReceta: false
    },
    {
        id: 9,
        nombre: "Diazepam",
        laboratorio: "Roche",
        principioActivo: "Diazepam",
        concentracion: "10 mg",
        presentacion: "Tabletas",
        categoria: "Neurológico",
        stock: 18,
        precio: 13.25,
        requiereReceta: true
    },
    {
        id: 10,
        nombre: "Hidrocortisona",
        laboratorio: "Pfizer",
        principioActivo: "Hidrocortisona",
        concentracion: "1%",
        presentacion: "Crema",
        categoria: "Dermatológico",
        stock: 55,
        precio: 11.30,
        requiereReceta: true
    }
];

// Function to render medicamentos
function renderMedicamentos(meds) {
    const container = document.getElementById('medicamentos-container');
    container.innerHTML = '';
    
    meds.forEach(med => {
        // Determine stock status
        let stockStatus = 'stock-high';
        if (med.stock < 30) {
            stockStatus = 'stock-low';
        } else if (med.stock < 70) {
            stockStatus = 'stock-medium';
        }
        
        const card = document.createElement('div');
        card.className = 'medicamento-card';
        card.innerHTML = `
            <div class="medicamento-header">
                <h3 class="medicamento-name">${med.nombre}</h3>
                <p class="medicamento-laboratorio">${med.laboratorio}</p>
            </div>
            <div class="medicamento-body">
                <div class="medicamento-detail">
                    <span class="detail-label">Principio Activo:</span>
                    <span class="detail-value">${med.principioActivo}</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Concentración:</span>
                    <span class="detail-value">${med.concentracion}</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Presentación:</span>
                    <span class="detail-value">${med.presentacion}</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Categoría:</span>
                    <span class="detail-value">${med.categoria}</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Stock:</span>
                    <span class="detail-value ${stockStatus}">${med.stock} unidades</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Precio:</span>
                    <span class="detail-value">$${med.precio.toFixed(2)}</span>
                </div>
                <div class="medicamento-detail">
                    <span class="detail-label">Requiere Receta:</span>
                    <span class="detail-value">${med.requiereReceta ? 'Sí' : 'No'}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Filter function
function filterMedicamentos() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const categoria = document.getElementById('categoria-filter').value;
    const laboratorio = document.getElementById('laboratorio-filter').value;
    const stock = document.getElementById('stock-filter').value;
    
    const filtered = medicamentos.filter(med => {
        // Search text filter
        const matchesSearch = med.nombre.toLowerCase().includes(searchText) || 
                             med.principioActivo.toLowerCase().includes(searchText);
        
        // Category filter
        const matchesCategory = !categoria || med.categoria.toLowerCase() === categoria;
        
        // Laboratory filter
        const matchesLaboratory = !laboratorio || med.laboratorio.toLowerCase() === laboratorio;
        
        // Stock filter
        let matchesStock = true;
        if (stock === 'high') {
            matchesStock = med.stock >= 70;
        } else if (stock === 'medium') {
            matchesStock = med.stock >= 30 && med.stock < 70;
        } else if (stock === 'low') {
            matchesStock = med.stock < 30;
        }
        
        return matchesSearch && matchesCategory && matchesLaboratory && matchesStock;
    });
    
    renderMedicamentos(filtered);
}

// Initial render and event listeners
document.addEventListener('DOMContentLoaded', function() {
    renderMedicamentos(medicamentos);
    
    // Add event listeners for search and filters
    document.getElementById('search-button').addEventListener('click', filterMedicamentos);
    document.getElementById('search-input').addEventListener('keyup', filterMedicamentos);
    document.getElementById('categoria-filter').addEventListener('change', filterMedicamentos);
    document.getElementById('laboratorio-filter').addEventListener('change', filterMedicamentos);
    document.getElementById('stock-filter').addEventListener('change', filterMedicamentos);
});