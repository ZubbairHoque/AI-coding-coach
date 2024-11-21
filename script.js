document.querySelector("#myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  console.log('Form submission triggered');

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
    alert("Thank you for completing the questionnaire!");

    // Create FormData object to collect form data
    const formData = new FormData(this); // `this` refers to the form element here

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data:', data); // Log the form data

    // Make the fetch request to submit the form data to the server
    console.log('Making fetch request...');
    fetch('http://localhost:3000/submit-form', { // Adjust the URL if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Convert the data to JSON
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then(data => {
      console.log('Server response:', data);
      alert('Form submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    });
  } else {
    alert("Please answer all questions before submitting.");
  }
});
