// Cache date formatting arrays
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const shortDayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date, format, includeDay) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();

  if (format === "numeric") {
    return includeDay
      ? `${dayNames[dayOfWeek]}, ${day}/${month + 1}/${year}`
      : `${day}/${month + 1}/${year}`;
  }

  let formattedDate = "";
  if (includeDay) {
    formattedDate +=
      format === "long" ? dayNames[dayOfWeek] : shortDayNames[dayOfWeek];
    formattedDate += ", ";
  }

  if (format === "long") {
    formattedDate += `${monthNames[month]} ${day}`;
  } else {
    formattedDate += `${day} ${shortMonthNames[month]}`;
  }

  return formattedDate;
}

function generateJournal() {
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const includeDay = document.getElementById("includeDay").checked;
  const dateFormat = document.getElementById("dateFormat").value;

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // Pre-allocate array for better performance
  const daysInMonth = lastDay.getDate();
  const journalLines = new Array(daysInMonth + 2); // +2 for header and extra newline

  // Set header
  journalLines[0] = `${monthNames[month - 1]} ${year}\n\n`;

  // Generate dates
  const currentDate = new Date(firstDay);
  for (let i = 1; i <= daysInMonth; i++) {
    journalLines[i] = `${formatDate(currentDate, dateFormat, includeDay)}\n\n`;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Join all lines at once
  document.getElementById("output").value = journalLines.join("");
}

function copyToClipboard() {
  const text = document.getElementById("output").value;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

function toggleSettings() {
  const toggle = document.querySelector(".settings-toggle");
  const settings = document.querySelector(".additional-settings");
  toggle.classList.toggle("open");
  settings.classList.toggle("open");
}

// Initialize with current month and year
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Set current month
  document.getElementById("month").value = currentMonth;

  // Populate year dropdown (current year and next 5 years)
  const yearSelect = document.getElementById("year");
  for (let year = currentYear; year <= currentYear + 5; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear;

  generateJournal();
});
