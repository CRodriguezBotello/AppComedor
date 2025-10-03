document.addEventListener("DOMContentLoaded", () => {
  const semanaBtns = document.querySelectorAll(".marcar-semana");
  const selectMonthBtn = document.getElementById("select-month");
  const rows = document.querySelectorAll(".calendar tbody tr");

  let mesSeleccionado = false;

  // Click individual en celdas (excepto columna de botones)
  document.querySelectorAll(".calendar td:not(.disabled):not(:last-child)").forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.innerText.trim() !== "") {
        cell.classList.toggle("selected");
      }
    });
  });

  // Botones de semana (ahora con toggle y cambio de texto)
  semanaBtns.forEach((btn, index) => {
    btn.textContent = "Seleccionar semana"; // Cambiamos el texto inicial
    btn.addEventListener("click", () => {
      const row = rows[index];
      const cells = row.querySelectorAll("td:not(.disabled):not(:last-child)");

      const allSelected = [...cells].every(cell => 
        cell.innerText.trim() === "" || cell.classList.contains("selected")
      );

      if (allSelected) {
        // Si toda la semana está marcada → desmarcar toda
        cells.forEach(cell => {
          if (cell.innerText.trim() !== "") {
            cell.classList.remove("selected");
          }
        });
        btn.textContent = "Seleccionar semana"; // cambiar texto
      } else {
        // Si no está toda marcada → marcar todas
        cells.forEach(cell => {
          if (cell.innerText.trim() !== "") {
            cell.classList.add("selected");
          }
        });
        btn.textContent = "Desmarcar semana"; // cambiar texto
      }
    });
  });

  // Botón mes entero (toggle)
  selectMonthBtn.addEventListener("click", () => {
    const allCells = document.querySelectorAll(".calendar td:not(.disabled):not(:last-child)");
    if (!mesSeleccionado) {
      allCells.forEach(cell => {
        if (cell.innerText.trim() !== "") {
          cell.classList.add("selected");
        }
      });
      selectMonthBtn.textContent = "Desmarcar mes entero";
      mesSeleccionado = true;
    } else {
      allCells.forEach(cell => {
        if (cell.innerText.trim() !== "") {
          cell.classList.remove("selected");
        }
      });
      selectMonthBtn.textContent = "Seleccionar mes entero";
      mesSeleccionado = false;
    }
  });
});
