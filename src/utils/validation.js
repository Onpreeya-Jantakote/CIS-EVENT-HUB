export const validateField = (fieldName, value, additionalData = {}) => {
  let errorMessage = "";
  const safeValue = typeof value === "string" ? value.trim() : "";

  switch (fieldName) {
    case "studentId":
      if (!safeValue) {
        errorMessage = "Please enter your student ID";
      } else if (safeValue.length !== 10) {
        errorMessage = "Student ID must be exactly 10 digits";
      } else if (!/^\d+$/.test(safeValue)) {
        errorMessage = "Student ID must contain only numbers";
      }
      break;

    case "firstname":
      if (!safeValue) {
        errorMessage = "Please enter your first name";
      } else if (safeValue.length < 2) {
        errorMessage = "First name must be at least 2 characters";
      }
      break;

    case "lastname":
      if (!safeValue) {
        errorMessage = "Please enter your last name";
      } else if (safeValue.length < 2) {
        errorMessage = "Last name must be at least 2 characters";
      }
      break;

    case "email":
      if (!safeValue) {
        errorMessage = "Please enter your email";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeValue)) {
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "password":
      if (!safeValue) {
        errorMessage = "Please enter your password";
      } else if (safeValue.length < 6) {
        errorMessage = "Password must be at least 6 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(safeValue)) {
        errorMessage =
          "Password must contain uppercase, lowercase and number";
      }
      break;

    case "confirmPassword":
      if (!safeValue) {
        errorMessage = "Please confirm your password";
      } else if (safeValue !== additionalData.password) {
        errorMessage = "Passwords don't match";
      }
      break;

    default:
      break;
  }

  return {
    isValid: errorMessage === "",
    errorMessage,
  };
};

export const validateAllFields = (formData) => {
  const errors = {};
  const { password, confirmPassword } = formData;

  for (const [key, value] of Object.entries(formData)) {
    errors[key] = validateField(key, value, { password }).errorMessage;
  }

  const isFormValid = Object.values(errors).every((error) => error === "");

  return {
    errors,
    isFormValid,
  };
};

export const isFormComplete = (formData) => {
  let complete = true;

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === "string" && value.trim() === "") {
      complete = false;
      break;
    }
    if (typeof value === "boolean" && value === false && key === "agreeTerms") {
      complete = false;
      break;
    }
  }

  return complete;
};

export const getFieldErrorStyle = (hasError) => {
  return hasError
    ? "border-red-500 focus:ring-red-400"
    : "border-gray-300 focus:ring-blue-400";
};
