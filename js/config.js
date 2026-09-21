const SUPABASE_URL = "https://eskumvmaljvrwiwqwiis.supabase.co";

const SUPABASE_KEY = "sb_publishable_hL6OPFPftKb5UzCdvSTktA_28YoG6VW";

function obtenerHeaders() {

    return {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    };
}

async function obtenerEstudiantes() {

    try {

        const respuesta = await fetch(
            `${SUPABASE_URL}/rest/v1/estudiantes?select=*`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "No fue posible consultar estudiantes"
            );
        }

        const estudiantes =
            await respuesta.json();

        console.log(estudiantes);

        mostrarEstudiantes(estudiantes);

    } catch (error) {

        console.error(
            "Error:",
            error
        );
    }
}
 obtenerEstudiantes();
async function crearEstudiante(estudiante) {

    const respuesta = await fetch(
        `${SUPABASE_URL}/rest/v1/estudiantes`,
        {
            method: "POST",
            headers: obtenerHeaders(),
            body: JSON.stringify(estudiante)
        }
    );

    if (!respuesta.ok) {
        throw new Error(
            "No fue posible crear el estudiante"
        );
    }
}