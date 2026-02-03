# 💰 Loan Calculator Web App

A responsive and interactive Loan Calculator built using HTML, CSS, and JavaScript.  
It calculates EMI, generates a full amortization schedule, visualizes loan distribution with a pie chart, and allows PDF export of the repayment breakdown.

---

## 📸 Preview

![Loan Calculator Screenshot](./screenshot.png)

---

## 🚀 Live Features

- EMI calculation based on:
  - Loan amount
  - Annual interest rate
  - Loan duration (years)

- Animated summary results:
  - Monthly Payment
  - Total Payment
  - Total Interest

- Detailed monthly amortization table
- Pie chart visualization (Principal vs Interest)
- Loading indicator before chart rendering
- Export breakdown table as PDF

---

## 🧠 How It Works

User enters:
- Loan Amount
- Interest Rate
- Loan Duration

On button click:
- EMI is calculated using the standard loan formula
- Results animate smoothly
- Monthly repayment schedule is generated dynamically
- Pie chart renders using Chart.js
- Loader displays while chart initializes
- User can export the full amortization schedule as a PDF

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Chart.js
- jsPDF
- jsPDF autoTable

---

## 📊 EMI Formula Used

EMI = (P × r × (1 + r)^n) / ((1 + r)^n − 1)

Where:
- P = Principal
- r = Monthly interest rate
- n = Total number of payments

---

## 📁 Project Structure

```
loan-calculator/
│
├── index.html
├── style.css
├── script.js
├── screenshot.png
└── README.md
```

---

## 🎯 Why This Project Matters

This project demonstrates:

- DOM manipulation
- Event handling
- Mathematical computation logic
- Dynamic table generation
- Chart integration
- UI animation using requestAnimationFrame
- Third-party library integration
- Clean separation of functionality
- Error handling
- Exporting structured data to PDF

It reflects strong front-end fundamentals and real-world financial calculation implementation.

---

## 🔮 Future Improvements

- Input validation with inline error messages
- Mobile UI enhancements
- Download chart as image
- Dark mode toggle
- Interest comparison mode

---

## 👩‍💻 Author

Ifra Malik  
BSIT | Front-End Developer  
GitHub: https://github.com/ifra489
