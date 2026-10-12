/**
 * reservation.js — Reservation form validation for Al-Aseel Restaurant
 * Handles: field validation, past-date check, inline error messages
 * Tasks: 8.2
 */

'use strict';

(function () {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Field references
        const nameField = document.getElementById('res-name');
        const phoneField = document.getElementById('res-phone');
        const dateField = document.getElementById('res-date');
        const timeField = document.getElementById('res-time');
        const guestsField = document.getElementById('res-guests');

        // Error span references
        const errorName = document.getElementById('error-res-name');
        const errorPhone = document.getElementById('error-res-phone');
        const errorDate = document.getElementById('error-res-date');
        const errorTime = document.getElementById('error-res-time');
        const errorGuests = document.getElementById('error-res-guests');

        // Clear previous errors and invalid classes
        [errorName, errorPhone, errorDate, errorTime, errorGuests].forEach(function (el) {
            el.textContent = '';
        });
        [nameField, phoneField, dateField, timeField, guestsField].forEach(function (el) {
            el.classList.remove('is-invalid');
        });

        // Hide any previous success message
        const successDiv = document.getElementById('reservation-success');
        if (successDiv) {
            successDiv.hidden = true;
            successDiv.textContent = '';
        }

        let firstInvalid = null;
        let hasError = false;

        // Validate name
        if (isEmptyField(nameField.value)) {
            errorName.textContent = 'الرجاء إدخال الاسم الكامل';
            nameField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = nameField;
            hasError = true;
        }

        // Validate phone
        if (isEmptyField(phoneField.value)) {
            errorPhone.textContent = 'الرجاء إدخال رقم الهاتف';
            phoneField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = phoneField;
            hasError = true;
        }

        // Validate date (empty check first, then past-date check)
        if (isEmptyField(dateField.value)) {
            errorDate.textContent = 'الرجاء اختيار تاريخ الحجز';
            dateField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = dateField;
            hasError = true;
        } else if (isPastDate(dateField.value)) {
            errorDate.textContent = 'يجب أن يكون تاريخ الحجز اليوم أو في المستقبل';
            dateField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = dateField;
            hasError = true;
        }

        // Validate time
        if (isEmptyField(timeField.value)) {
            errorTime.textContent = 'الرجاء اختيار وقت الحجز';
            timeField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = timeField;
            hasError = true;
        }

        // Validate guests
        if (isEmptyField(guestsField.value)) {
            errorGuests.textContent = 'الرجاء إدخال عدد الأشخاص';
            guestsField.classList.add('is-invalid');
            if (!firstInvalid) firstInvalid = guestsField;
            hasError = true;
        }

        if (hasError) {
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // All valid — show success message and reset form
        if (successDiv) {
            successDiv.textContent = 'شكراً! تم تأكيد حجزك بنجاح. نتطلع إلى استقبالك في مطعم الأصيل.';
            successDiv.hidden = false;
        }
        form.reset();
    });
})();
