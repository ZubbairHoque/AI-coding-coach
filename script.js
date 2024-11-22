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

    // Store the career result in sessionStorage
    sessionStorage.setItem("userCareer", userCareer);

    // Redirect to results page
    window.location.href = "resultsform.html";

    // Optionally: Make a fetch request to submit the form data to the server
    console.log("Making fetch request...");
    fetch("http://localhost:3000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please answer all questions before submitting.");
  }
});
