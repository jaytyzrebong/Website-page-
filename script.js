// NETWORK BACKGROUND
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const NODE_COUNT = 45;
const CONNECTION_DISTANCE = 160;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1
        });
    }
}

function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.25 * (1 - dist / CONNECTION_DISTANCE)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(drawNodes);
}

resizeCanvas();
initNodes();
drawNodes();
window.addEventListener('resize', () => { resizeCanvas(); initNodes(); });

// MENU & NAVIGATION
const sections = document.querySelectorAll('.section');
const menuLinks = document.querySelectorAll('.menu-link');
const menuOverlay = document.getElementById('menuOverlay');
const menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', () => menuOverlay.classList.toggle('open'));

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        menuOverlay.classList.remove('open');
        sections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});

// CONTACT FORM
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! ✅');
});
