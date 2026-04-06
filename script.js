/* ==========================================
   1. ANIMATION DE FOND (CANVAS)
   ========================================== */
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#D5CABC', '#E8D5CC', '#BDA18A'];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   2. GESTION DES MODALES (COMPÉTENCES)
   ========================================== */
const modal = document.getElementById("modal-competence");
const modalCorps = document.getElementById("modal-corps");
const btnFermer = document.querySelector(".bouton-fermer");

function genererModale(titre, icone, items) {
    let htmlContenu = `
        <div style="font-size: 3.5rem; text-align:center; margin-bottom:10px;">${icone}</div>
        <h3 style="border-bottom: 2px solid #BDA18A; padding-bottom:10px; text-align:center;">${titre}</h3>
        <div style="margin-top:20px;">`;

    items.forEach(item => {
        const niveau = item.getAttribute('data-level') || 50;
        const statut = item.getAttribute('data-statut') || "En cours";
        const desc = item.getAttribute('data-desc') || "Compétence acquise en formation.";
        
        let texteNiveau = "Débutant";
        if(niveau > 40) texteNiveau = "Intermédiaire";
        if(niveau > 75) texteNiveau = "Maîtrisé";

        htmlContenu += `
            <div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius:10px; border-left: 5px solid #BDA18A;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong>${item.childNodes[0].textContent}</strong>
                    <span style="font-size:0.8rem; font-weight:bold; color:#BDA18A;">${texteNiveau}</span>
                </div>
                <div style="background:#eee; height:8px; border-radius:4px; overflow:hidden; margin-bottom:8px;">
                    <div style="width:${niveau}%; height:100%; background:#BDA18A;"></div>
                </div>
                <p style="font-size:0.85rem; color:#666;">${desc}</p>
            </div>`;
    });

    htmlContenu += `</div>`;
    modalCorps.innerHTML = htmlContenu;
    modal.style.display = "block";
}

// Un seul écouteur pour les cartes
document.querySelectorAll('.carte-comp').forEach(carte => {
    carte.style.cursor = "pointer";
    carte.addEventListener('click', () => {
        const titre = carte.querySelector('h3').innerText;
        const icone = carte.querySelector('.icone-cat').innerText;
        const items = carte.querySelectorAll('li');
        genererModale(titre, icone, items);
    });
});

if(btnFermer) btnFermer.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

/* ==========================================
   3. GRAPHIQUE (CHART.JS)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const canvasGraph = document.getElementById('monGraphique');
    if (!canvasGraph) return;

    const dataExplieguee = [
        { title: "Systèmes & Virtualisation", text: "Windows Server, Linux, VMware, Proxmox." },
        { title: "Réseaux & Infrastructures", text: "Cisco, VLAN, Routage, DNS/DHCP." },
        { title: "Cybersécurité", text: "PfSense, VPN, Wireshark, Fortinet." },
        { title: "Support & Veille", text: "GLPI, Documentation, Veille technologique." }
    ];

    const monGraphique = new Chart(canvasGraph.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Systèmes', 'Réseaux', 'Sécurité', 'Support'],
            datasets: [{
                data: [35, 30, 20, 15],
                backgroundColor: ['#BDA18A', '#3498db', '#e74c3c', '#2ecc71'],
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (evt, activeElements) => {
                if (activeElements.length > 0) {
                    const idx = activeElements[0].index;
                    document.getElementById('details-titre').innerText = dataExplieguee[idx].title;
                    document.getElementById('details-texte').innerText = dataExplieguee[idx].text;
                }
            }
        }
    });
});

/* ==========================================
   4. OUTILS (RETOUR EN HAUT & SCHÉMA)
   ========================================== */
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener('scroll', () => {
    if (backToTopBtn) backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

const schemaImg = document.getElementById('schema-img');
if (schemaImg) {
    schemaImg.addEventListener('click', function() {
        modalCorps.innerHTML = `<img src="${this.src}" style="width:100%; border-radius:10px;">
                                <p style="margin-top:15px;">Architecture réseau multi-sites.</p>`;
        modal.style.display = "block";
    });
}
