const inputs = document.querySelectorAll(".input");


function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario
  
    const usuario = document.getElementById('user').value.trim();
    const contrasena = document.getElementById('pass').value.trim();
  
    if (usuario === '' || contrasena === '') {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }
  
    // Validación con usuario y contraseña fijos
    if (usuario === 'admin' && contrasena === '1234') {
      // Redirige si las credenciales son correctas
      window.location.href = 'inventario.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
  