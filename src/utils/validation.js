/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    errors: [],
  };

  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    result.errors.push('Password must contain at least one number');
  }

  result.isValid = result.errors.length === 0;

  return result;
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

/**
 * Validate license number format
 * @param {string} licenseNumber - License number to validate
 * @returns {boolean} True if valid
 */
export const validateLicenseNumber = (licenseNumber) => {
  return licenseNumber.trim().length >= 3;
};

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .trim();
};

/**
 * Validate lawyer signup form
 * @param {object} formData - Form data
 * @returns {object} Validation result
 */
export const validateLawyerSignup = (formData) => {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.specializations || formData.specializations.length === 0) {
    errors.specializations = 'At least one specialization is required';
  }

  if (!validateLicenseNumber(formData.licenseNumber)) {
    errors.licenseNumber = 'Valid license number is required';
  }

  if (!formData.yearsOfExperience || formData.yearsOfExperience < 0) {
    errors.yearsOfExperience = 'Years of experience is required';
  }

  if (!formData.hourlyRate || formData.hourlyRate < 0) {
    errors.hourlyRate = 'Hourly rate is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate client signup form
 * @param {object} formData - Form data
 * @returns {object} Validation result
 */
export const validateClientSignup = (formData) => {
  const errors = {};

  if (!formData.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate case creation form
 * @param {object} formData - Form data
 * @returns {object} Validation result
 */
export const validateCaseForm = (formData) => {
  const errors = {};

  if (!formData.caseType) {
    errors.caseType = 'Case type is required';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Description is required';
  }

  if (formData.description && formData.description.length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (!formData.urgencyLevel) {
    errors.urgencyLevel = 'Urgency level is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
