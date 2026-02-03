document.addEventListener("DOMContentLoaded", ()=>{

//! Select  Element
const calculateBtn = document.getElementById("calculateBtn");
const amountInput = document.getElementById("amount");
const yearsInput = document.getElementById("years");
const interestInput = document.getElementById("interest");
//summary elements
const monthlyPayment = document.getElementById("monthly");
const totalPayment = document.getElementById("total");
const totalInterestPayment = document.getElementById("totalInterest");

const loader = document.getElementById("chartLoader");
const canvas = document.getElementById("loanChart");
// ensure loader is hidden and canvas not shown until a calculation runs
if (loader) loader.style.display = 'none';
if (canvas) canvas.style.display = 'none';


//function to calculate loan
function calculateLoan() {
  // show loader before calculation
  loader.style.display = "flex";
  canvas.style.display = "none";

  const principal = parseFloat(amountInput.value);
  const interest = parseFloat(interestInput.value) / 100 / 12;
  const payments = parseFloat(yearsInput.value) * 12;
  if (isNaN(principal) || isNaN(interest) || isNaN(payments)) {
    alert("Please enter valid numbers");
    return;
  }
  //compute monthly payment
  const x = Math.pow(1 + interest, payments);
  const monthly = (principal * x * interest) / (x - 1);
  if (isFinite(monthly)) {
    //calculate total payment and total interest
    const total = monthly * payments;
    const totalInterest = total - principal;
    //update UI

    animation(monthlyPayment, 0, monthly, 1000);
    animation(totalPayment, 0, total, 1000);
    animation(totalInterestPayment, 0, totalInterest, 1000);

    // update amortization breakdown
    generateBreakdown(principal, interest, payments, monthly);
    // draw chart
    drawChart(principal, totalInterest);
  }
}

function animation(element, start, end, duration) {
  let startTime = null;

  function update(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;

    element.textContent = value.toFixed(2);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


let loanChart;

function drawChart(principal, totalInterest) {
  const ctx = document.getElementById("loanChart");
  if (!ctx) return;

  // destroy old chart
  if (loanChart) {
    loanChart.destroy();
  }

  // simulate loading delay (optional, looks smooth)
  setTimeout(() => {
    // if Chart.js isn't available, stop and hide loader
    if (typeof Chart === "undefined") {
      loader.style.display = "none";
      canvas.style.display = "none";
      return;
    }

    // show the canvas before creating the chart so Chart.js can size it correctly
    loader.style.display = "none";
    canvas.style.display = "block";

    loanChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Principal", "Total Interest"],
        datasets: [
          {
            data: [principal, totalInterest],
            backgroundColor: ["#1a73e8", "#e53935"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.2,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 8
            }
          }
        },
        layout: {
          padding: {
            top: 0,
            bottom: 0
          }
        }
      },
    });

    // ensure chart resizes correctly after creation
    loanChart.resize();
  }, 800); // loader duration
}


//bind event to calculate button
calculateBtn.addEventListener("click", calculateLoan );

// export breakdown PDF
const exportPdfBtn = document.getElementById('exportPdfBtn');
if (exportPdfBtn) {
  exportPdfBtn.addEventListener('click', exportBreakdownPdf);
}

} 
);

function exportBreakdownPdf() {
  const table = document.querySelector('.breakdown-table');
  if (!table) return alert('No breakdown table found to export.');

  const rows = Array.from(table.querySelectorAll('tbody tr'));
  if (!rows.length) return alert('No breakdown data to export.');

  const headers = Array.from(table.querySelectorAll('thead th')).map(h => h.textContent.trim());
  const body = rows.map(r => Array.from(r.querySelectorAll('td')).map(td => td.textContent.trim()));

  try {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
      return alert('PDF library not loaded.');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    doc.text('Loan Breakdown', 40, 40);

    doc.autoTable({
      head: [headers],
      body: body,
      startY: 60,
      styles: { fontSize: 9, cellPadding: 6 },
      headStyles: { fillColor: [7, 32, 56], textColor: 255 }
    });

    doc.save('loan-breakdown.pdf');
  } catch (err) {
    console.error(err);
    alert('Export failed. See console for details.');
  }
}



function generateBreakdown(principal, interest, payments, emi) {
  const tbody = document.getElementById("breakdownBody");
  tbody.innerHTML = "";

  let balance = principal;

  for (let month = 1; month <= payments; month++) {
    const interestPayment = balance * interest;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${month}</td>
      <td>${emi.toFixed(2)}</td>
      <td>${interestPayment.toFixed(2)}</td>
      <td>${principalPayment.toFixed(2)}</td>
      <td>${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
    `;
    tbody.appendChild(row);
  }
}
