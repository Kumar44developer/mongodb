document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorBanner = document.getElementById('errorBanner');
    const viewSubmissionsBtn = document.getElementById('viewSubmissionsBtn');
    const submissionsList = document.getElementById('submissionsList');


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        submitForm();
    });

    viewSubmissionsBtn.addEventListener('click', toggleSubmissions);

    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
});
