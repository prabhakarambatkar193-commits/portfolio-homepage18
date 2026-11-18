// Helper function to escape special characters and prevent XSS
function sanitizeInput(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function handleFormSubmit(event) {
    event.preventDefault(); // Stop default form submission for validation

    const rawName = document.getElementById('name').value;
    const rawEmail = document.getElementById('email').value;
    const rawMessage = document.getElementById('message').value;
    const errorMsg = document.getElementById('errorMsg');

    // Clear previous errors
    errorMsg.textContent = "";

    // 1. Client-Side Sanitization
    const cleanName = sanitizeInput(rawName.trim());
    const cleanEmail = sanitizeInput(rawEmail.trim());
    const cleanMessage = sanitizeInput(rawMessage.trim());

    // Basic validation check
    if (!cleanName || !cleanEmail || !cleanMessage) {
        errorMsg.textContent = "All fields are required.";
        return false;
    }

    // 2. Verify Google reCAPTCHA v2 Response
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
        errorMsg.textContent = "Please complete the reCAPTCHA to prove you are not a bot.";
        return false;
    }

    // If all checks pass, data is sanitized and bot is blocked
    console.log("Form submitted successfully with sanitized data:");
    console.log({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        recaptchaToken: recaptchaResponse
    });

    alert("Form submitted successfully!");
    
    // Reset form and reCAPTCHA widget after success
    document.getElementById('contactForm').reset();
    grecaptcha.reset();

    return false; // Change to true if connecting to a live backend action handler
}