const mobilemenuIcon = document.querySelector(".hamburger-menu-icon");
const mobileMenu = document.querySelector(".mobile-nav-menu");

// --- Validation Elements ---
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password1");
const passwordMatchInput = document.getElementById("password2");
const createAccountBtn = document.getElementById("create-account-btn");
const registerForm = document.querySelector(".register");

// Error Message Elements
const firstNameError = document.getElementById("firstname-error");
const lastNameError = document.getElementById("lastname-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const passwordMatchError = document.getElementById("passwordmatch-error");

// Password Checklist Elements
const lengthCheck = document.getElementById("length-check");
const numberCheck = document.getElementById("number-check");
const uppercaseCheck = document.getElementById("uppercase-check");
const lowercaseCheck = document.getElementById("lowercase-check");
const specialCheck = document.getElementById("special-check");


// --- Helper Functions ---

// --- Helper Functions ---

// Validate Name: Min 2 chars, no numbers
function validateName(name) {
  if (name.length < 2) return "Name must be at least 2 characters.";
  
  let hasNumber = false;
  
  for (let i = 0; i < name.length; i++) {
    if (!isNaN(parseInt(name[i])) && name[i] !== " ") hasNumber = true; // Check if character is a number
  }

  if (hasNumber) return "Name cannot contain numbers.";

  return ""; // Valid
}

// Validate Email: '@' and '.', blocked domains
function validateEmail(email) {
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return "Email must contain '@' and '.'";
  }

  const blockedDomains = ["tempmail.com", "mailinator.com", "10minutemail.com"];
  const domain = email.split("@")[1];
  
  if (domain && blockedDomains.includes(domain)) {
      return "This email domain is not allowed.";
  }

  return ""; // Valid
}


// Validate Password Logic
function validatePassword(password) {
  // Length Check
  if (password.length >= 8) {
      lengthCheck.classList.add("valid-check");
  } else {
      lengthCheck.classList.remove("valid-check");
  }

  // Number Check (using while loop as requested)
  let hasNumber = false;
  let i = 0;
  while (i < password.length) {
    if (!isNaN(parseInt(password[i]))) {
      hasNumber = true;
      break;
    }
    i++;
  }
  if (hasNumber) numberCheck.classList.add("valid-check");
  else numberCheck.classList.remove("valid-check");


  // Uppercase Check
  let hasUpper = false;
  i = 0;
  while (i < password.length) {
      if (password[i] >= 'A' && password[i] <= 'Z') {
          hasUpper = true;
          break;
      }
      i++;
  }
  if (hasUpper) uppercaseCheck.classList.add("valid-check");
  else uppercaseCheck.classList.remove("valid-check");


  // Lowercase Check
  let hasLower = false;
  i = 0;
  while (i < password.length) {
      if (password[i] >= 'a' && password[i] <= 'z') {
          hasLower = true;
          break;
      }
      i++;
  }
  if (hasLower) lowercaseCheck.classList.add("valid-check");
  else lowercaseCheck.classList.remove("valid-check");


  // Special Character Check
  const specialChars = "!@#$%^&*";
  let hasSpecial = false;
  i = 0;
  while (i < password.length) {
      if (specialChars.includes(password[i])) {
          hasSpecial = true;
          break;
      }
      i++;
  }
  if (hasSpecial) specialCheck.classList.add("valid-check");
  else specialCheck.classList.remove("valid-check");

  return (password.length >= 8 && hasNumber && hasUpper && hasLower && hasSpecial);
}

// Check Validations and Toggle Button
function checkAllValidations() {
    // Return early if elements don't exist (e.g. on login page)
    if (!firstNameInput || !createAccountBtn) return;

    const isFirstNameValid = validateName(firstNameInput.value.trim()) === "";
    const isLastNameValid = validateName(lastNameInput.value.trim()) === "";
    const isEmailValid = validateEmail(emailInput.value.trim()) === "";
    const isPasswordValid = validatePassword(passwordInput.value); 
    const isMatchValid = passwordInput.value === passwordMatchInput.value && passwordInput.value !== "";
    const isAgreed = document.getElementById("agreed").checked;

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isMatchValid && isAgreed) {
        createAccountBtn.removeAttribute("disabled");
    } else {
        createAccountBtn.setAttribute("disabled", "true");
    }
}

// Function to handle Blur events (Show error if invalid)
function handleBlur(input, validatorFn, errorElement, optionalOtherInput) {
    const error = validatorFn(input.value.trim(), optionalOtherInput);
    if (error) {
        errorElement.textContent = error;
        input.classList.add("input-error");
    } else {
        errorElement.textContent = "";
        input.classList.remove("input-error");
    }
    checkAllValidations();
}

// Function to handle Input events (Remove error and red border immediately when user types, but keep button disabled until fully valid)
function handleInput(input, errorElement) {
    // When typing, we want to clear the explicitly shown error message
    // BUT we might want to keep the red border until it's actually valid? 
    // Requirement says: "Once the field’s requirements are satisfied, the red border is removed."
    // This implies we should check validity on input to remove the border.
    
    // For now, let's clear the message. The border removal logic depends on whether we re-validate on input.
    // If we want real-time green/red feedback, we should validate on input. 
    errorElement.textContent = ""; 
    
    // Let's re-run validation just to check if we can remove the red border
    // Note: We need to know WHICH validator to use. 
    // Ideally we'd pass the validator here too, or just simplify:
    
    // Simplified User Requirement: "Error messages ... only display when the user tries to move to the next field"
    // "Once the field’s requirements are satisfied, the red border is removed." -> Implies real-time validation for success.
    
    checkAllValidations(); 
}


// --- Event Listeners ---

// Mobile Menu
if (mobilemenuIcon) {
    mobilemenuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("display");
    });
}


// Input Validation Listeners (Only attach if elements exist)
if (firstNameInput) {
    const validateNameWrapper = (val) => validateName(val);
    const validateEmailWrapper = (val) => validateEmail(val);
    // Password wrapper returns error string if invalid
    const validatePasswordWrapper = (val) => {
        const isValid = validatePassword(val); // This function only returns boolean and updates UI checklist
        return isValid ? "" : "Password does not meet requirements.";
    };
    const validateMatchWrapper = (val, otherVal) => {
         return (val === otherVal && val !== "") ? "" : "Passwords do not match.";
    };


    // First Name
    firstNameInput.addEventListener("blur", () => {
        handleBlur(firstNameInput, validateNameWrapper, firstNameError);
    });
    firstNameInput.addEventListener("input", () => {
         const error = validateName(firstNameInput.value.trim());
         if (!error) firstNameInput.classList.remove("input-error"); // Remove red border if valid
         firstNameError.textContent = ""; // Clear error text
         checkAllValidations();
    });

    // Last Name
    lastNameInput.addEventListener("blur", () => {
        handleBlur(lastNameInput, validateNameWrapper, lastNameError);
    });
    lastNameInput.addEventListener("input", () => {
         const error = validateName(lastNameInput.value.trim());
         if (!error) lastNameInput.classList.remove("input-error");
         lastNameError.textContent = "";
         checkAllValidations();
    });

    // Email
    emailInput.addEventListener("blur", () => {
        handleBlur(emailInput, validateEmailWrapper, emailError);
    });
    emailInput.addEventListener("input", () => {
         const error = validateEmail(emailInput.value.trim());
         if (!error) emailInput.classList.remove("input-error");
         emailError.textContent = "";
         checkAllValidations();
    });

    // Password
    passwordInput.addEventListener("focus", () => {
        document.getElementById("password-checklist").style.display = "block";
    });

    passwordInput.addEventListener("blur", () => {
        // Hide checklist on blur
        document.getElementById("password-checklist").style.display = "none";

        // Validation logic
        const isValid = validatePassword(passwordInput.value);
        if (!isValid) {
             passwordInput.classList.add("input-error");
        } else {
             passwordInput.classList.remove("input-error");
        }
    });
    passwordInput.addEventListener("input", () => {
        const isValid = validatePassword(passwordInput.value);
        if (isValid) passwordInput.classList.remove("input-error");
        // Don't hide checklist items here? validatePassword helper does that.
        
        // Also check match
        if (passwordMatchInput.value && passwordInput.value !== passwordMatchInput.value) {
            // Don't show error yet, wait for blur? 
            // Stick to previous behavior for match? 
        }
        checkAllValidations();
    });

    // Password Match
    passwordMatchInput.addEventListener("blur", () => {
        if (passwordInput.value !== passwordMatchInput.value) {
            passwordMatchError.textContent = "Passwords do not match.";
            passwordMatchInput.classList.add("input-error");
        } else {
            passwordMatchError.textContent = "";
            passwordMatchInput.classList.remove("input-error");
        }
        checkAllValidations();
    });
    passwordMatchInput.addEventListener("input", () => {
        if (passwordInput.value === passwordMatchInput.value) {
            passwordMatchInput.classList.remove("input-error");
            passwordMatchError.textContent = "";
        }
        checkAllValidations();
    });


    document.getElementById("agreed").addEventListener("change", checkAllValidations);

    // Form Submission
    createAccountBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default submission
        
        // Safety check (should be disabled anyway)
        if (createAccountBtn.hasAttribute("disabled")) return;

        createAccountBtn.disabled = true; // Prevent double submit
        const originalText = "CREATE ACCOUNT";
        
        // Animated "Creating Account..." text
        let dots = 0;
        createAccountBtn.textContent = "CREATING ACCOUNT";
        const dotInterval = setInterval(() => {
            dots = (dots + 1) % 4; // Cycle 0-3
            let text = "CREATING ACCOUNT";
            for(let i=0; i<dots; i++) text += ".";
            createAccountBtn.textContent = text;
        }, 500);

        setTimeout(() => {
            // Stop animation
            clearInterval(dotInterval);
            
            // Show Success Notification (Toast)
            const toast = document.getElementById("toast-notification");
            if(toast) {
                toast.classList.remove("hidden");
                // Small delay to allow 'display: block' to apply before fading in (if using display:none)
                requestAnimationFrame(() => {
                    toast.classList.add("show-toast");
                });
                
                // Hide Toast after 2 seconds and Redirect
                setTimeout(() => {
                    toast.classList.remove("show-toast");
                    setTimeout(() => {
                        toast.classList.add("hidden");
                        // Redirect to Login Page
                        window.location.href = "login.html";
                    }, 300); // Wait for fade out transition
                }, 2000); // Shortened to 2 seconds for quicker redirect
            } else {
                 alert("Account Created Successfully!"); // Fallback
                 window.location.href = "login.html";
            }

            // Reset Button (Optional since we redirect, but good practice)
            createAccountBtn.textContent = originalText;
            createAccountBtn.disabled = false;
        }, 2000); // 2 second delay
    });
}
