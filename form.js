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

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldName + 'Error');


    let isValid = true;
    let errorMessage = '';


    switch(fieldName) {
        case 'regdNo':
            if (!value) {
                isValid = false;
                errorMessage = 'Registration Number is required';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Registration Number must be at least 3 characters';
            }
            break;

        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 3) {
                isValid = false;
