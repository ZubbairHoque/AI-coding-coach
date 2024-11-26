document.querySelector("#myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  console.log("Form submission triggered");

  const questions = document.querySelectorAll(".formbold-question");
  let allAnswered = true;

  // Check if all questions are answered
  questions.forEach((question) => {
    const options = question.querySelectorAll("input[type='radio']");
    const isAnswered = Array.from(options).some((option) => option.checked);

    if (!isAnswered) {
      allAnswered = false;
      question.querySelector("label").style.color = "red"; // Highlight unanswered questions
    } else {
      question.querySelector("label").style.color = ""; // Reset label color
    }
  });

  if (allAnswered) {
    // Create FormData object to collect form data
    const formData = new FormData(this); // `this` refers to the form element here

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data); // Log the form data

    // Store the entire form data in sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(data));

    // Calculate career
    const careerTally = {}; // Object to track tallies for each career
    Object.values(data).forEach((value) => {
      careerTally[value] = (careerTally[value] || 0) + 1; // Count occurrences
    });

    // Determine the career with the highest tally
    const userCareer = Object.keys(careerTally).reduce((a, b) =>
      careerTally[a] > careerTally[b] ? a : b
    );

    // Debugging output
    console.log("User Career:", userCareer);
    console.log("Form Data Stored:", JSON.stringify(data));

    // Store the career result in sessionStorage
    sessionStorage.setItem("userCareer", userCareer);

    // Redirect to results page
    window.location.href = "resultsform.html";
  } else {
    alert("Please answer all questions before submitting.");
  }
});
