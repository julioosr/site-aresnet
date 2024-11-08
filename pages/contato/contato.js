 // Formatação do celular
 document.addEventListener("DOMContentLoaded", function() {
    const celularInput = document.getElementById("celular");

    celularInput.addEventListener("input", function() {
        let value = celularInput.value.replace(/\D/g, ""); // Remove tudo que não é número
        if (value.length > 11) value = value.slice(0, 11); // Limita ao máximo de 11 dígitos

        const formatted = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
                               .replace(/^(\d{2})(\d{4})$/, "($1) $2"); // Aplica a formatação

        celularInput.value = formatted;
    });
});
