

// 2. Animation de fond (Cercles flottants)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#D5CABC', '#E8D5CC', '#BDA18A'];

class Particle {
    constructor() {
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
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();


// Sélection des éléments
const modal = document.getElementById("modal-competence");
const modalCorps = document.getElementById("modal-corps");
const btnFermer = document.querySelector(".bouton-fermer");

// On ajoute l'événement clic sur chaque CARTE
document.querySelectorAll('.carte-comp').forEach(carte => {
    carte.style.cursor = "zoom-in"; // Curseur spécial pour indiquer le clic
    
    carte.addEventListener('click', function() {
        // On copie le HTML de la carte dans la modale
        modalCorps.innerHTML = this.innerHTML;
        // On affiche la modale
        modal.style.display = "block";
        // On cache le curseur de zoom à l'intérieur
        modalCorps.querySelector('.icone-cat').style.fontSize = "5rem";
    });
});

// Fermer au clic sur la croix
btnFermer.onclick = function() {
    modal.style.display = "none";
}

// Fermer si on clique n'importe où en dehors de la fenêtre blanche
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Telecharge un fichier des competence 

document.querySelectorAll('.carte-comp').forEach(carte => {
    carte.addEventListener('click', function() {
        const titre = this.querySelector('h3').innerText;
        const icone = this.querySelector('.icone-cat').innerText;
        const items = this.querySelectorAll('li');

        // Construire le nouveau contenu avec barres

        let htmlContenu = `<div style="font-size: 4rem; margin-bottom: 10px;">${icone}</div>`;
        htmlContenu += `<h3>${titre}</h3><ul>`;

        items.forEach(item => {
            const niveau = item.getAttribute('data-level');
            let texteNiveau = "Débutant";
            if(niveau > 40) texteNiveau = "Intermédiaire";
            if(niveau > 75) texteNiveau = "Maîtrisé";

            htmlContenu += `
                <li style="margin-bottom:20px; border:none; background:none;">
                    <strong>${item.innerText}</strong>
                    <span class="label-niveau">${texteNiveau} - ${niveau}%</span>
                    <div class="container-niveau">
                        <div class="barre-progression" style="width: ${niveau}%"></div>
                    </div>
                </li>`;
        });

        htmlContenu += `</ul>`;
        
        modalCorps.innerHTML = htmlContenu;
        modal.style.display = "block";
    });
});
document.querySelectorAll('.carte-comp').forEach(carte => {
    
    // 1. GESTION DU CLIC SUR LA CARTE ENTIÈRE (Tout afficher)
    carte.addEventListener('click', function(e) {
        const titre = this.querySelector('h3').innerText;
        const icone = this.querySelector('.icone-cat').innerText;
        const items = this.querySelectorAll('li');

        genererModale(titre, icone, items);
    });

    // 2. GESTION DU CLIC SUR UNE LIGNE PRÉCISE (Une seule compétence)
    const lignes = carte.querySelectorAll('li');
    lignes.forEach(li => {
        li.addEventListener('click', function(e) {
            e.stopPropagation(); // EMPÊCHE de déclencher le clic sur la carte entière
            
            const titreCarte = carte.querySelector('h3').innerText;
            const iconeCarte = carte.querySelector('.icone-cat').innerText;
            
            // On crée un tableau avec UN SEUL élément pour réutiliser la fonction
            const itemUnique = [this]; 
            
            genererModale(titreCarte, iconeCarte, itemUnique);
        });
    });
});

function genererModale(titre, icone, items) {
    let htmlContenu = `
        <div style="font-size: 3rem; text-align:center;">${icone}</div>
        <h3 style="border-bottom: 2px solid var(--color-accent); padding-bottom:10px;">${titre}</h3>
        <div style="text-align:left; width:100%;">`;

    items.forEach(item => {
        const statut = item.getAttribute('data-statut') || "En cours d'acquisition";
        const desc = item.getAttribute('data-desc') || "Compétence développée durant la formation.";
        
        htmlContenu += `
            <div style="margin-bottom: 20px; padding: 10px; background: #fff; border-radius:10px; border-left: 4px solid var(--color-accent);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-size:1.1rem;">${item.childNodes[0].textContent}</strong>
                    <span style="font-size:0.7rem; padding:3px 8px; background:var(--color-light); border-radius:15px; font-weight:bold;">${statut}</span>
                </div>
                <p style="font-size:0.85rem; color:#666; margin-top:5px;">${desc}</p>
            </div>`;
    });

    htmlContenu += `</div>`;
    
    document.getElementById("modal-corps").innerHTML = htmlContenu;
    document.getElementById("modal-competence").style.display = "block";
}

/* Graphique*/
document.addEventListener('DOMContentLoaded', function() {
    const canvasElement = document.getElementById('monGraphique');
    if (!canvasElement) return;

    const ctx = canvasElement.getContext('2d');

    const dataExplieguee = [
       
    { 
        title: "Systèmes & Virtualisation", 
        text: "Administration avancée de Windows Server (AD/GPO), Linux Debian, et gestion d'environnements virtualisés sous VMware et Proxmox." 
    },
    { 
        title: "Réseaux & Infrastructures", 
        text: "Conception d'architectures Cisco (VLANs, Routage inter-VLAN), protocoles de routage OSPF et gestion des services critiques DNS/DHCP." 
    },
    { 
        title: "Cybersécurité", 
        text: "Protection périmétrique via pare-feu PfSense/Fortinet, mise en œuvre de tunnels VPN IPsec/OpenVPN et analyse de trames Wireshark." 
    },
    { 
        title: "Support & Veille", 
        text: "Gestion de parc et ticketing via GLPI, assistance aux utilisateurs, rédaction de documentations techniques et veille technologique constante." 
    }
];

   

    const monGraphique = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Systèmes & Virtualisation',
                    'Réseaux & Infra',
                    'Cybersécurité',
                    'Support & Veille'],
            datasets: [{
                data: [35, 30, 20, 15],
                backgroundColor: [
                                    '#BDA18A', '#3498db', '#e74c3c', '#2ecc71'  // Vert Support
                                    ],
                hoverOffset: 30,
                borderWidth: 2,
                borderColor: '#ffffff'
            
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { font: { size: 14, weight: 'bold' }, padding: 20 }
                }
            },
            // GESTION DU CLIC
            onClick: (evt, activeElements) => {
                if (activeElements.length > 0) {
                    // On récupère l'index de la tranche cliquée
                    const index = activeElements[0].index;
                    const info = dataExplieguee[index];


                    const titreElem = document.getElementById('details-titre');
                    const texteElem = document.getElementById('details-texte');
                    const boxElem = document.getElementById('details-graph');

                    // Animation de changement
                    boxElem.style.opacity = 0;

                    setTimeout(() => {
                        titreElem.innerText = info.title;
                        texteElem.innerText = info.text;
                        titreElem.style.color = monGraphique.data.datasets[0].backgroundColor[index];
                        boxElem.style.opacity = 1;
                    }, 200);
                }
            }
        }
    });
});





// Gestion du bouton retour en haut
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    // Si on descend de plus de 300px, on montre le bouton
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// Quand on clique, on remonte tout en haut en douceur
backToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};


document.getElementById('schema-img').addEventListener('click', function() {
    const titre = "Architecture Réseau Détaillée";
    const contenu = `<img src="${this.src}" style="width:100%; border-radius:10px;">
                     <p style="margin-top:15px; color:#333;">Cette topologie illustre une infrastructure multi-sites avec VPN IPsec et redondance des services critiques.</p>`;
    
    // On réutilise ta fonction générerModale ou ouvrirModale
    genererModale(titre, "📊", []); 
    // Note : Ajuste selon ta fonction actuelle pour injecter l'image dans le corps.
    document.getElementById("modal-corps").innerHTML = contenu;
});


