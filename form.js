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
                errorMessage = 'Name must be at least 3 characters';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name should only contain letters and spaces';
            }
            break;


        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'branch':
            if (!value) {
                isValid = false;
                errorMessage = 'Branch is required';
            }
            break;
    }


    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else {
        field.classList.remove('error');
        errorElement.classList.remove('show');
    }

    return isValid;
}


function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + 'Error');
    errorElement.classList.remove('show');
}


function validateForm() {
    const form = document.getElementById('registrationForm');
    const fields = form.querySelectorAll('.form-input');
    let isFormValid = true;


    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    return isFormValid;
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function submitForm() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');
    const successMessage = document.getElementById('successMessage');
    const errorBanner = document.getElementById('errorBanner');
    const errorBannerText = document.getElementById('errorBannerText');


    successMessage.style.display = 'none';
    errorBanner.style.display = 'none';

    const formData = {
        regdNo: document.getElementById('regdNo').value.trim(),
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        branch: document.getElementById('branch').value
    };

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();


        if (result.success) {
            successMessage.textContent = '✓ ' + result.message + ' Your data has been saved to MongoDB.';
            successMessage.style.display = 'block';

            form.reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

        } else {
            errorBannerText.textContent = '✗ ' + result.message;
            errorBanner.style.display = 'block';
        }

    } catch (error) {
        console.error('Error:', error);
        errorBannerText.textContent = '✗ An error occurred while submitting the form. Please try again.';
        errorBanner.style.display = 'block';
        } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

async function toggleSubmissions() {
    const submissionsList = document.getElementById('submissionsList');
    const viewSubmissionsBtn = document.getElementById('viewSubmissionsBtn');
