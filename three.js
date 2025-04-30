// Inicializar partículas
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    
    // Cena
    const scene = new THREE.Scene();
    
    // Câmera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderizador
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Partículas
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Cores baseadas no esquema de cores do site
    const colorPalette = [
        new THREE.Color(0x2D6A4F), // verde primário
        new THREE.Color(0x40916C), // verde secundário
        new THREE.Color(0x74C69D), // verde claro
        new THREE.Color(0xD4AF37)  // dourado
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Posições aleatórias
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        
        // Cores aleatórias da paleta
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Tamanhos aleatórios
        sizes[i] = Math.random() * 2;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Material das partículas
    const particleMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    // Sistema de partículas
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Animação
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotacionar partículas
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    // Redimensionamento
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Iniciar animação
    animate();
}

// Iniciar partículas quando a página carregar
window.addEventListener('load', initParticles);