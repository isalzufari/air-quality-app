const airPollutionLevel = (level) => {
  if (level >= 150) {
    return "Unhealthy";
  } else if (level >= 100) {
    return "Unhealthy For Sensitive Groups";
  } else if (level >= 50) {
    return "Good";
  }
};

const colorAirPollutionLevel = (level) => {
  if (level >= 150) {
    return "danger";
  } else if (level > 50) {
    return "warning";
  } else if (level > 0) {
    return "success";
  }
};

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export { airPollutionLevel, colorAirPollutionLevel, showFormattedDate };
