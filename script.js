document.querySelector("form").addEventListener("submit", function (event) {
    // Prevent the form from submitting
    event.preventDefault();
  
    // Get all questions
    const questions = document.querySelectorAll(".formbold-question");
    let allAnswered = true; // Flag to track if all questions are answered
  
    questions.forEach((question, index) => {
      // Find radio buttons within the question
      const options = question.querySelectorAll("input[type='radio']");
      const isAnswered = Array.from(options).some((option) => option.checked);
  
      // Highlight unanswered questions
      if (!isAnswered) {
        allAnswered = false;
        question.querySelector("label").style.color = "red"; // Highlight label in red
      } else {
        question.querySelector("label").style.color = ""; // Reset label color if answered
      }
    });
  
    if (allAnswered) {
      alert("Thank you for completing the questionnaire!");
      this.submit(); // Submit the form if all questions are answered
    } else {
      alert("Please answer all questions before submitting.");
    }
  });
  