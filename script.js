document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrengthMeter = document.getElementById('password-strength-meter');
    const passwordStrengthMeterBar = document.querySelector('.password-strength-meter-bar');

    // Function to update password strength meter
    function updatePasswordStrengthMeter() {
        const password = passwordInput.value;
        const strength = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        let strengthScore = 0;
        if (strength.length) strengthScore++;
        if (strength.lowercase) strengthScore++;
        if (strength.uppercase) strengthScore++;
        if (strength.number) strengthScore++;
        if (strength.specialChar) strengthScore++;

        let strengthColor = '';
        if (strengthScore === 5) {
            strengthColor = 'password-strength-meter-bar-strong';
        } else if (strengthScore >= 3) {
            strengthColor = 'password-strength-meter-bar-medium';
        } else {
            strengthColor = 'password-strength-meter-bar-weak';
        }

        passwordStrengthMeterBar.style.width = (strengthScore * 20) + '%';
        passwordStrengthMeterBar.className = 'password-strength-meter-bar ' + strengthColor;
    }

    // Event listener for password input to update strength meter
    passwordInput.addEventListener('input', function() {
        updatePasswordStrengthMeter();
    });

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validate email format using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate gender
        if (!gender) {
            alert('Please select your gender.');
            return;
        }

        // Validate address
        if (address === '') {
            alert('Please enter your address.');
            return;
        }

        // Validate phone number format
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.');
            return;
        }

        // Validate password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 8 characters long.');
            return;
        }

        // Validate password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please re-enter your passwords.');
            return;
        }

        // If all validations pass, you can proceed with form submission or further processing
        alert('Sign up successful!');
        // Here you can add code to submit the form or perform further actions
    });
});
