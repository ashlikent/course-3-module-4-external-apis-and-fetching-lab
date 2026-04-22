const weatherApi = "https://api.weather.gov/alerts/active?area=";
const stateInput = document.querySelector('#state-input');
const fetchAlertsButton = document.querySelector('#fetch-alerts');
const alertsDisplay = document.querySelector('#alerts-display');
const errorMessage = document.querySelector('#error-message');

fetchAlertsButton.addEventListener('click', async () => {
  const state = stateInput.value.trim().toUpperCase();

  alertsDisplay.textContent = '';

  if (!state) {
    errorMessage.textContent = 'Please enter a state abbreviation';
    errorMessage.classList.remove('hidden');
    stateInput.value = '';
    return;
  }

  try {
    const response = await fetch(weatherApi + state);
    const data = await response.json();

    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');

    const alerts = data.features;

    alertsDisplay.textContent = `${data.title}: ${alerts.length}`;

    alerts.forEach((alert) => {
      const alertItem = document.createElement('p');
      alertItem.textContent = alert.properties.headline;
      alertsDisplay.appendChild(alertItem);
    });

    stateInput.value = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    stateInput.value = '';
  }
});



