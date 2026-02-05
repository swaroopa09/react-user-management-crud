export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // NEW FIELD
  dob?: string;
  [key: string]: any; // Allows future fields
}

export interface FormField {
  name: keyof User;
  label: string;
  type: string;
  required?: boolean;
  pattern?: RegExp;
}


