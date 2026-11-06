// Credenciales de Supabase
const SUPABASE_URL = 'https://gblloxtlsmlsdeimkcxp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vwF5a94urat93oBzn2NjXg_S7CnPyR0';

// Inicializar cliente de Supabase
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const registerForm = document.getElementById('registerForm');
const mensajeDiv = document.getElementById('mensaje');

registerForm.addEventListener('submit async', async (e) => {}); // placeholder seguro

registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    mensajeDiv.className = 'message';
    mensajeDiv.textContent = '';

    // Validar dominio institucional estricto
    const dominioPermitido = '@asuncionescalada.edu.py';
    if (!email.endsWith(dominioPermitido)) {
        mensajeDiv.textContent = `Acceso denegado: Solo se permiten correos del dominio ${dominioPermitido}`;
        mensajeDiv.classList.add('error');
        return;
    }

    try {
        // Petición de registro a Supabase Auth
        const { data, error } = await _supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        mensajeDiv.textContent = '¡Registro exitoso! Revisa tu correo o inicia sesión.';
        mensajeDiv.classList.add('success');
        registerForm.reset();

    } catch (error) {
        mensajeDiv.textContent = `Error en el registro: ${error.message}`;
        mensajeDiv.classList.add('error');
    }
});