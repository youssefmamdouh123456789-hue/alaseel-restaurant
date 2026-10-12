/**
 * contact.js — Contact form validation for Al-Aseel Restaurant
 * Handles: field validation, email validation, inline error messages
 * Tasks: 7.2
 */

'use strict';

(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Field references
        const nameField = document.getElementById('contact-name');
        const emailField = document.getElementById('contact-email');
        const phoneField = document.getElementById('contact-phone');
        const messageField = document.getElementById('contact-message');

        // Error span references
        const errorName = document.getElementById('error-name');
        const errorEmail = document.getElementById('error-email');
        const errorPhone = document.getElementById('error-phone');
        const errorMessage = document.getElementById('error-message');

        // Clear previous errors and invalid classes
        [errorName, errorEmail, errorPhone, errorMessage].forEach(function (el) {
            el.textContent = '';
        });
        [nameField, emailField, phoneField, messageField].forEach(function (el) {
            el.classList.remove('is-invalid');
        });

        // Remove any existing success message
        const existingSuccess = form.querySelector('.success-msg');
        if (existingSuccess) existingSuccess.remove();

        let firstInvalid = null;
        let hasError = false;

        // Validate name
        if (isEmptyField(nameField.value)) {
            errorName.textContent = 'الرجاء إدخال الاسم الكامل';
            nameField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = nameField;
            hasError = true;
        }

        // Validate email (empty OR invalid format)
        if (isEmptyField(emailField.value) || !validateEmail(emailField.value)) {
            errorEmail.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
            emailField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = emailField;
            hasError = true;
        }

        // Validate phone
        if (isEmptyField(phoneField.value)) {
            errorPhone.textContent = 'الرجاء إدخال رقم الهاتف';
            phoneField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = phoneField;
            hasError = true;
        }

        // Validate message
        if (isEmptyField(messageField.value)) {
            errorMessage.textContent = 'الرجاء إدخال رسالتك';
            messageField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = messageField;
            hasError = true;
        }

        if (hasError) {
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // All valid — show success message and reset form
        const successDiv = document.createElement('div');
        successDiv.className = 'success-msg';
        successDiv.setAttribute('role', 'alert');
        successDiv.textContent = 'شكراً! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
        form.appendChild(successDiv);
        form.reset();
    });
})();
