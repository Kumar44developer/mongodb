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

    if (submissionsList.style.display === 'none' || !submissionsList.style.display) {
        await loadSubmissions();
        submissionsList.style.display = 'block';
        submissionsList.classList.add('show');
        viewSubmissionsBtn.textContent = 'Hide All Registrations';
    } else {
        submissionsList.style.display = 'none';
        submissionsList.classList.remove('show');
        viewSubmissionsBtn.textContent = 'Show All Registrations';
    }
}

async function loadSubmissions() {
    const submissionsContent = document.getElementById('submissionsContent');
    submissionsContent.innerHTML = '<div class="no-submissions">Loading...</div>';



    try {
        const response = await fetch('/get-users');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            submissionsContent.innerHTML = '';
            result.data.forEach((user, index) => {
                const card = document.createElement('div');
                card.className = 'submission-card';

                const dateObj = new Date(user.createdAt);
                const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();


                card.innerHTML = `
                    <div class="submission-field">
                        <span class="submission-label">Reg. No.:</span>
                        <span class="submission-value">${escapeHtml(user.regdNo)}</span>
                    </div>
                    <div class="submission-field">
                        <span class="submission-label">Name:</span>
                        <span class="submission-value">${escapeHtml(user.name)}</span>
                    </div>
                    <div class="submission-field">
                        <span class="submission-label">Email:</span>
                        <span class="submission-value">${escapeHtml(user.email)}</span>
                    </div>
                    <div class="submission-field">
                        <span class="submission-label">Branch:</span>
                        <span class="submission-value">${escapeHtml(user.branch)}</span>
                    </div>
                    <div class="submission-field">
                        <span class="submission-label">Registered:</span>
                        <span class="submission-value">${formattedDate}</span>
                    </div>
                `;
                submissionsContent.appendChild(card);
            });
        } else {
            submissionsContent.innerHTML = '<div class="no-submissions">No registrations yet.</div>';
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
        submissionsContent.innerHTML = '<div class="no-submissions">Error loading registrations. Please try again.</div>';
    }
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
