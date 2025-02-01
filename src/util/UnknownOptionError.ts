export class UnknownOptionError<T> extends Error {
  constructor(readonly optionType: string, readonly unknownOption: T) {
    super(`App: Unknown ${optionType} option: ${unknownOption}`);
  }
}
export interface InputData {
  driverName: string;
  vehicleNumber: string;
  truckWeight: string;
  driverNumber: string;
  errorMessage?: string;
}

export const rcNumberPattern = /^([A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4})$/;
export const PHONE_REGEXP = /^[6789]\d{9}$/;
export const refferalPattern = /^[A-Za-z]{2}\d{3}$/;
export function validateForm(registerForm: any, userType: string) {
  const isPhotoUpload = registerForm?.isPhotoUpload;
  let requiredFields = [];

  if (!registerForm?.address) {
    requiredFields.push('Address');
  }
  if (
    registerForm?.referral_code &&
    !refferalPattern.test(registerForm.referral_code)
  ) {
    requiredFields.push('Referral code (Invalid format)');
  }

  if (userType == 'driver' && !registerForm?.dlPhoto) {
    requiredFields.push('DL image required');
  }

  if (!registerForm?.destination) {
    requiredFields.push('Destination');
  }
  if (!registerForm?.name) {
    requiredFields.push('Name');
  }
  if (!registerForm?.origin) {
    requiredFields.push('Origin');
  }

  if (
    userType !== 'transporter' &&
    registerForm?.rcNumber &&
    !rcNumberPattern.test(registerForm.rcNumber)
  ) {
    requiredFields.push('RC Number (Invalid format)');
  }

  if (isPhotoUpload) {
    if (registerForm?.rcFront === undefined) {
      requiredFields.push('RC Front');
    }
    if (registerForm?.rcBack === undefined) {
      requiredFields.push('RC Back');
    }
  }
  return requiredFields;
}

export const validateRegisterForm = (registerForm: any, userType: string) => {
  const newErrors: any = {};

  if (!registerForm.address) {
    newErrors.address = 'Address is required';
  }

  if (
    registerForm.referral_code &&
    !refferalPattern.test(registerForm.referral_code)
  ) {
    newErrors.referral_code = 'Invalid referral code format';
  }

  if (userType === 'driver' && !registerForm.dlPhoto) {
    newErrors.dlPhoto = 'DL image is required';
  }

  if (registerForm?.destination?.length == 0) {
    newErrors.destination = 'Destination is required';
  }

  if (!registerForm.name) {
    newErrors.name = 'Name is required';
  }

  if (registerForm?.origin?.length == 0) {
    newErrors.origin = 'Origin is required';
  }

  if (
    userType !== 'transporter' &&
    registerForm.rcNumber &&
    !rcNumberPattern.test(registerForm.rcNumber)
  ) {
    newErrors.rcNumber = 'Invalid RC Number format';
  }
  if (userType == 'transporter' && !registerForm.companyName) {
    newErrors.companyName = 'Company name required';
  }
  if (userType == 'driver' && !registerForm.driver_name) {
    newErrors.companyName = 'Driver name required';
  }
  if (registerForm.isPhotoUpload) {
    if (registerForm.rcFront === undefined) {
      newErrors.rcFront = 'RC Front photo is required';
    }
    if (registerForm.rcBack === undefined) {
      newErrors.rcBack = 'RC Back photo is required';
    }
  }

  // Return true if the form is valid (no errors)
  return {isValidForm: Object.keys(newErrors).length === 0, errors: newErrors};
};

export const validateInputRequestForm = (input: InputData): string => {
  if (!input.driverName.trim()) {
    return 'Driver name is required';
  }
  if (!input.vehicleNumber.trim()) {
    return 'RC number is required';
  }
  if (!rcNumberPattern.test(input.vehicleNumber.trim())) {
    return 'Invalid RC number';
  }
  if (!input.driverNumber.trim()) {
    return 'Phone number is required';
  }
  if (!PHONE_REGEXP.test(input.driverNumber.trim())) {
    return 'Invalid phone number';
  }
  if (!input.truckWeight.trim()) {
    return 'Weight is required';
  }
  return '';
};
