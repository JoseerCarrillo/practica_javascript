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

async function actualizarEstudiante(
    id,
    estudiante
) {

    const respuesta = await fetch(
        `${SUPABASE_URL}/rest/v1/estudiantes?id=eq.${id}`,
        {
            method: "PATCH",
            headers: obtenerHeaders(),
            body: JSON.stringify(estudiante)
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            "No fue posible actualizar"
        );
    }

    await obtenerEstudiantes();
}

async function eliminarEstudiante(id) {
    const confirmar = confirm("¿Desea eliminar este estudiante?");

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/estudiantes?id=eq.${id}`, {
            method: "DELETE",
            headers: obtenerHeaders()
        });

        if (!respuesta.ok) {
            throw new Error("No fue posible eliminar");
        }

        await obtenerEstudiantes();

    } catch (error) {
        console.error("Error:", error);
    }
}

async function editarEstudiante(id) {
    try {
        const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/estudiantes?id=eq.${id}&select=*`, {
            method: "GET",
            headers: obtenerHeaders()
        });

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar el estudiante");
        }

        const resultado = await respuesta.json();
        const estudiante = resultado[0];

        document.querySelector("#nombre").value = estudiante.nombre;
        document.querySelector("#correo").value = estudiante.correo;
        document.querySelector("#programa").value = estudiante.programa;

        estudianteEditando = id;

    } catch (error) {
        console.error("Error:", error);
    }
}

document.querySelector("#formEstudiante").addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const estudiante = {
        nombre: document.querySelector("#nombre").value,
        correo: document.querySelector("#correo").value,
        programa: document.querySelector("#programa").value,
        estado: "Activo"
    };

    if (estudianteEditando === null) {
        await crearEstudiante(estudiante);
    } else {
        await actualizarEstudiante(estudianteEditando, estudiante);
        estudianteEditando = null;
    }

    await obtenerEstudiantes();
    this.reset();
});

obtenerEstudiantes();