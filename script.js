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

// Initialize the year dropdown
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let year = currentYear; year <= currentYear + 10; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  if (year === currentYear) {
    option.selected = true;
  }
  yearSelect.appendChild(option);
}

// Initialize the month dropdown
const monthSelect = document.getElementById("month");
const currentMonth = new Date().getMonth() + 1;
monthSelect.value = currentMonth;

// Get the settings toggle and content
const settingsToggle = document.getElementById("settings-toggle");
const settingsContent = document.getElementById("settings-content");

// Function to toggle settings visibility
function toggleSettings() {
  const isExpanded = settingsToggle.getAttribute("aria-expanded") === "true";
  settingsToggle.setAttribute("aria-expanded", !isExpanded);

  // Add transition class
  settingsContent.classList.toggle("expanded");

  // Ensure focus management and accessibility
  if (!isExpanded) {
    // When opening, move focus to the first interactive element
    setTimeout(() => {
      const firstInput = settingsContent.querySelector("input");
      if (firstInput) firstInput.focus();
    }, 300); // Match the transition duration
  }
}

// Initialize settings toggle state
settingsToggle.setAttribute("aria-expanded", "false");
settingsContent.style.visibility = "visible"; // Ensure content is visible for animation

// Function to format date based on selected format
function formatDate(date, format) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayName = shortDayNames[date.getDay()];
  const monthName = shortMonthNames[date.getMonth()];

  const includeDay = document.getElementById("includeDay").checked;
  const includeYear = document.getElementById("includeYear").checked;
  const dayPrefix = includeDay ? `${dayName}, ` : "";
  const yearSuffix = includeYear ? ` ${year}` : "";

  switch (format) {
    case "day-only":
      return `${dayPrefix}${day}${yearSuffix}`;
    case "short":
      return `${dayPrefix}${day} ${monthName}${yearSuffix}`;
    case "numeric-ddmm":
      return `${dayPrefix}${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}${yearSuffix}`;
    case "numeric-mmdd":
      return `${dayPrefix}${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}${yearSuffix}`;
    case "numeric-short":
      return `${dayPrefix}${day}/${month}${yearSuffix}`;
    default:
      return `${dayPrefix}${day}${yearSuffix}`;
  }
}

// Function to generate the journal
function generateJournal() {
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const dateFormat = document.querySelector(
    'input[name="dateFormat"]:checked'
  ).value;

  const output = document.getElementById("output");
  const daysInMonth = new Date(year, month, 0).getDate();

  let journal = "";

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    journal += formatDate(date, dateFormat) + "\n\n";
  }

  output.textContent = journal;
}

// Function to copy to clipboard
function copyToClipboard() {
  const output = document.getElementById("output");
  navigator.clipboard.writeText(output.textContent).then(() => {
    const copyButton = document.getElementById("copy-btn");
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      Copied!
    `;
    setTimeout(() => {
      copyButton.innerHTML = originalText;
    }, 2000);
  });
}

// Generate initial journal
generateJournal();
