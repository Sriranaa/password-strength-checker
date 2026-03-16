// Select the necessary DOM elements
const passwordInput = document.getElementById('password-input');
const strengthMessage = document.getElementById('strength-message');

// MODIFIED: Select new validation rule elements
const ruleLength = document.getElementById('rule-length');
const ruleLowercase = document.getElementById('rule-lowercase');
const ruleUppercase = document.getElementById('rule-uppercase');
const ruleNumber = document.getElementById('rule-number');
const ruleSpecial = document.getElementById('rule-special');

// Listen for real-time input events on the password field
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    
    // Clear feedback and reset rules when input is empty
    if (password.length === 0) {
        strengthMessage.textContent = '';
        strengthMessage.className = 'message';
        resetRules();
        return;
    }

    // MODIFIED: Defined Regular Expressions for each required condition
    const regexLength = /.{6,}/; // At least 6 characters
    const regexLowercase = /[a-z]/; // At least one lowercase letter
    const regexUppercase = /[A-Z]/; // At least one uppercase letter
    const regexNumber = /[0-9]/; // At least one number
    const regexSpecial = /[^A-Za-z0-9]/; // Anything that is not a letter or number

    // Check each condition against the password
    const isLengthValid = regexLength.test(password);
    const isLowercaseValid = regexLowercase.test(password);
    const isUppercaseValid = regexUppercase.test(password);
    const isNumberValid = regexNumber.test(password);
    const isSpecialValid = regexSpecial.test(password);

    // MODIFIED: Update the UI for each perfect validator rule
    updateRuleStyle(ruleLength, isLengthValid);
    updateRuleStyle(ruleLowercase, isLowercaseValid);
    updateRuleStyle(ruleUppercase, isUppercaseValid);
    updateRuleStyle(ruleNumber, isNumberValid);
    updateRuleStyle(ruleSpecial, isSpecialValid);

    // Calculate how many conditions are satisfied
    const satisfiedCount = [isLengthValid, isLowercaseValid, isUppercaseValid, isNumberValid, isSpecialValid].filter(Boolean).length;

    // MODIFIED: Update strength indicator based on number of satisfied conditions
    if (satisfiedCount === 5) {
        strengthMessage.textContent = 'Strong';
        strengthMessage.className = 'message strong';
    } else if (satisfiedCount >= 3) {
        strengthMessage.textContent = 'Medium';
        strengthMessage.className = 'message medium';
    } else {
        strengthMessage.textContent = 'Weak';
        strengthMessage.className = 'message weak';
    }
});

// MODIFIED: Helper function to apply valid/invalid styling and icons to list items
function updateRuleStyle(element, isValid) {
    const iconSpan = element.querySelector('span');
    if (isValid) {
        // Change to green with check mark when satisfied
        element.className = 'valid';
        iconSpan.textContent = '✓'; 
    } else {
        // Change to red with cross when not satisfied
        element.className = 'invalid';
        iconSpan.textContent = '✗'; 
    }
}

// MODIFIED: Helper function to reset all rules when input is blank
function resetRules() {
    const rules = [ruleLength, ruleLowercase, ruleUppercase, ruleNumber, ruleSpecial];
    rules.forEach(rule => {
        rule.className = 'invalid';
        rule.querySelector('span').textContent = '✗';
    });
}
