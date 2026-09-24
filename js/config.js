const SUPABASE_URL = "https://eskumvmaljvrwiwqwiis.supabase.co";

const SUPABASE_KEY = "sb_publishable_hL6OPFPftKb5UzCdvSTktA_28YoG6VW";

function obtenerHeaders() {

    return {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    };
}

function mostrarEstudiantes(estudiantes) {

    const tabla = document.querySelector(
        "#tablaEstudiantes"
    );

    tabla.innerHTML = "";

    estudiantes.forEach(estudiante => {

        tabla.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.programa}</td>
                <td>${estudiante.estado}</td>
                <td>
                    <button
                        onclick="editarEstudiante(${estudiante.id})"
                    >
                        Editar
                    </button>

                    <button
                        onclick="eliminarEstudiante(${estudiante.id})"
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

async function obtenerEstudiantes() {
    try {
        const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/estudiantes?select=*`, {
            method: "GET",
            headers: obtenerHeaders()
        });

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar estudiantes");
        }

        const estudiantes = await respuesta.json();
        console.log(estudiantes);
        mostrarEstudiantes(estudiantes);

    } catch (error) {
        console.error("Error:", error);
    }
}

async function crearEstudiante(estudiante) {
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/estudiantes`, {
        method: "POST",
        headers: obtenerHeaders(),
        body: JSON.stringify(estudiante)
    });

    if (!respuesta.ok) {
        throw new Error("No fue posible crear el estudiante");
    }
}

const estudiante = {
    nombre: document.querySelector("#nombre").value,
    correo: document.querySelector("#correo").value,
    programa: document.querySelector("#programa").value,
    estado: "Activo"
};

crearEstudiante(estudiante);
obtenerEstudiantes();