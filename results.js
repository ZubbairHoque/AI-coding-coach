document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the form data and career result from sessionStorage
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const userCareer = sessionStorage.getItem("userCareer");

  // Debugging outputs
  console.log("Retrieved formData:", formData);
  console.log("Retrieved userCareer:", userCareer);

  const careerResultElement = document.getElementById("career-result");
  const careerDescriptionElement = document.getElementById("career-details");
  const careerFitReasonElement = document.getElementById("career-fit-reason");
  const careerDescriptionTitleElement = document.getElementById("career-description-title");

  // Career descriptions and reasons
  const careerDescriptions = {
    "Software Development": "A software developer designs, creates, and maintains applications or systems.",
    "Data Analyst": "A data analyst interprets data and provides insights to help businesses make decisions.",
    "Data Science": "A data scientist analyzes and interprets complex data to help companies make decisions.",
  };

  const careerFitReasons = {
    "Software Development": "You have a strong aptitude for problem-solving and coding!",
    "Data Analyst": "You excel at working with data and providing actionable insights!",
    "Data Science": "Your analytical mindset and ability to work with data align with this field.",
  };

  // Display the user's career and description dynamically
  if (formData && userCareer) {
    careerResultElement.textContent = userCareer;
    careerDescriptionTitleElement.textContent = `What a ${userCareer} Does`;

    careerDescriptionElement.textContent = careerDescriptions[userCareer] || "Career description not available.";
    careerFitReasonElement.textContent = careerFitReasons[userCareer] || "We couldn't determine a fit based on your answers.";
  } else {
    console.error("Missing formData or userCareer in sessionStorage.");
    careerResultElement.textContent = "No career result found. Please complete the questionnaire.";
    careerDescriptionElement.textContent = "No career description available.";
    careerFitReasonElement.textContent = "No reason available.";
  }
});
