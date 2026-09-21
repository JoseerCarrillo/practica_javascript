const SUPABASE_URL =
    "https://snbqpbyccivqbjiougbv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Rk7KYM7CYX9M817efpPjeQ_9-4vDgTs";

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