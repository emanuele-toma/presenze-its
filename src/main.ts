import { response } from "./data.js";

const container = document.querySelector("#container")!;
const giorni = new Set(
  response.map((row) => new Date(row.dtLezione).toLocaleDateString())
);
giorni.forEach((giorno) => {
  const stack = document.createElement("div");
  stack.classList.add("stack");

  const title = document.createElement("h3");
  title.textContent = `${giorno} (${getDayStartEnd(giorno)})`;
  stack.appendChild(title);

  const table = document.createElement("table");
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headerCols = ["Ora inizio", "Ora fine", "Presenza", "Assenza", ""];

  headerCols.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headerRow.appendChild(th);
  });

  header.appendChild(headerRow);

  const body = document.createElement("tbody");

  let totalPresenza = 0;
  let totalAssenza = 0;

  response.forEach((row) => {
    const rowGiorno = new Date(row.dtLezione).toLocaleDateString();

    if (rowGiorno === giorno) {
      const tr = document.createElement("tr");
      const oraInizio = new Date(row.oraInizio).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const oraFine = new Date(row.oraFine).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const presenza = row.orePresenza;
      const assenza = row.oreAssenza;

      const cols = [oraInizio, oraFine, presenza, assenza];

      cols.forEach((col, index) => {
        const td = document.createElement("td");
        td.textContent = col.toString();
        if (index === 3 && assenza > 0) {
          td.style.color = "red";
        }
        tr.appendChild(td);
      });

      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkboxCell.appendChild(checkbox);
      tr.appendChild(checkboxCell);

      body.appendChild(tr);

      totalPresenza += presenza;
      totalAssenza += assenza;
    }
  });

  const totalRow = document.createElement("tr");
  const totalLabel = document.createElement("td");
  totalLabel.textContent = "Totale";
  totalLabel.colSpan = 2;
  totalRow.appendChild(totalLabel);

  const totalPresenzaCell = document.createElement("td");
  totalPresenzaCell.textContent = totalPresenza.toString();
  totalRow.appendChild(totalPresenzaCell);

  const totalAssenzaCell = document.createElement("td");
  totalAssenzaCell.textContent = totalAssenza.toString();
  totalRow.appendChild(totalAssenzaCell);

  // add a checkbox that marks all the checkboxes in the table 
  const totalCheckboxCell = document.createElement("td");
  const totalCheckbox = document.createElement("input");
  totalCheckbox.type = "checkbox";
  totalCheckboxCell.appendChild(totalCheckbox);
  totalRow.appendChild(totalCheckboxCell);

  totalCheckbox.addEventListener("change", (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    const checkboxes = body.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = isChecked;
    });
  });

  body.appendChild(totalRow);

  table.appendChild(header);
  table.appendChild(body);
  stack.appendChild(table);
  container.appendChild(stack);
});

// crea una funzione che accetta il giorno e restituisce l'ora di inizio e fine
function getDayStartEnd(day: string): string {
  const allHours = response
    .filter((row) => new Date(row.dtLezione).toLocaleDateString() === day)
    .map((row) => [row.oraInizio, row.oraFine])
    .flat();
  let timespans = [];
  let start = allHours[0],
    end;
  for (let i = 1; i < allHours.length; i = i + 2) {
    end = allHours[i];
    let next = allHours[i + 1];

    if (!next) {
      timespans.push([start, end]);
      break;
    }

    if (end !== next) {
      timespans.push([start, end]);
      start = next;
    }
  }

  return timespans
    .map((span) => {
      const startHours = new Date(span[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const endHours = new Date(span[1]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${startHours} - ${endHours}`;
    })
    .join(", ");
}
