import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, addDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzL_aegKfE1iLVU41aQpodXg5YkChCxmo",
    authDomain: "wedding-photos-31651.firebaseapp.com",
    projectId: "wedding-photos-31651",
    storageBucket: "wedding-photos-31651.firebasestorage.app",
    messagingSenderId: "723958464122",
    appId: "1:723958464122:web:a2e4e284ef073e49bd45c3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let docEncontrado = null; // Guardamos el documento si lo encontramos
document.getElementById("table-guest").style.display = "none";
window.cargarInvitados = async function () {

    const q = query(collection(db, "guest"), orderBy("confirmation", "desc"));


    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        mensaje.innerText = "Invitados no encontrado.";
        mensaje.style.color = "red";
        docEncontrado = null;
        return;
    }
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
    cuerpoTabla.innerHTML = "";

    let numeroAdultos = 0;
    let numeroNinos = 0;
    querySnapshot.forEach((docSnap) => {
        document.getElementById("table-guest").style.display = "inline-table";

        docEncontrado = { id: docSnap.id, data: docSnap.data() };
        const data = docSnap.data();

        const fila = document.createElement("tr");
        fila.classList.add("con-linea");

        fila.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.last_name}</td>
                    <td>${data.number_guest}</td>
                    <td>${data.childs ? data.childs : ""}</td>
                    <td>${data.confirmation ? "Sí" : "No"}</td>
                    <td><a href="https://wa.me/${data.phone}" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="20" height="20">
                        ${data.phone}</a> </td>
                    <td>${data.note}</td>
                `;
        if (data.confirmation) {
            numeroAdultos += data.number_guest ? data.number_guest : 0;
            numeroNinos += data.childs ? data.childs : 0;
        }

        cuerpoTabla.appendChild(fila);
    });

    const info = document.getElementById("numeroAdultos");
    info.innerText = numeroAdultos;
    info.style.display = "block";

    const numberChilds = document.getElementById("numberChilds");
    numberChilds.innerText = numeroNinos;
    numberChilds.style.display = "block";


};