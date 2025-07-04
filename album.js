// Importar módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Reemplaza esto con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCzL_aegKfE1iLVU41aQpodXg5YkChCxmo",
    authDomain: "wedding-photos-31651.firebaseapp.com",
    projectId: "wedding-photos-31651",
    storageBucket: "wedding-photos-31651.firebasestorage.app",
    messagingSenderId: "723958464122",
    appId: "1:723958464122:web:a2e4e284ef073e49bd45c3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Función para subir archivo
async function uploadFile(file) {
    const path = 'galeria/' + Date.now() + '_' + file.name;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    loadGallery(); // Recargar galería
}

// Cargar galería
async function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = 'Cargando...';

    const listRef = ref(storage, 'galeria/');
    const res = await listAll(listRef);
    gallery.innerHTML = '';

    for (const itemRef of res.items) {
        const url = await getDownloadURL(itemRef);
        const name = itemRef.name.toLowerCase();

        if (name.endsWith('.mp4') || name.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            video.width = 300;
            video.style.margin = '10px';
            gallery.appendChild(video);
        } else if (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.gif')) {
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '200px';
            img.style.margin = '10px';
            img.style.borderRadius = '10px';
            gallery.appendChild(img);
        } else {
            const link = document.createElement('a');
            link.href = url;
            link.textContent = 'Descargar archivo';
            link.target = '_blank';
            gallery.appendChild(link);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) uploadFile(file);
    });
    loadGallery();
});