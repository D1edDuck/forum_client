import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/api/type";
import { editAccount, loginUser, quickLogin, registerUser } from "./userThunk";
import Cookies from "js-cookie";

export interface IFormValue {
  name: string;
  email: string;
  phone: string;
  password: string;
  [key: string]: string | undefined;
}

interface ValidationError {
  field: keyof IFormValue;
  message: string;
}

interface UserState {
  user: IUser | null;
  token: string | undefined;
  initialized: boolean;
  loading: boolean;
  error: string | null;
  formValue: IFormValue;
  validationErrors: ValidationError[];
  isFormValid: boolean;
}

const initialState: UserState = {
  user: null,
  token: undefined,
  initialized: true,
  loading: false,
  error: null,
  formValue: {
    name: "",
    password: "",
    phone: "+7",
    email: "",
  },
  validationErrors: [],
  isFormValid: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = undefined;
      state.error = null;
      state.loading = false;
      state.initialized = true;
      Cookies.remove("jwt");
    },

    inputValue(
      state,
      action: PayloadAction<{ id: keyof IFormValue; value: string }>,
    ) {
      const { id, value } = action.payload;
      state.formValue[id] = value;

      validateField(state, id, value);
    },
    resetValue(state) {
      state.formValue = {
        name: "",
        email: "",
        phone: "+7",
        password: "",
      };
      state.validationErrors = [];
      state.isFormValid = false;
    },

    clearValidationErrors(state) {
      state.validationErrors = [];
    },

    validateForm(state, action: PayloadAction<string>) {
      const formType = action.payload;
      validateAllFields(state, formType);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.validationErrors = [];
        state.isFormValid = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.validationErrors = [];
        state.isFormValid = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      })

      .addCase(quickLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.initialized = false;
      })
      .addCase(quickLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload.user;
        state.token = Cookies.get("jwt");
      })
      .addCase(quickLogin.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.token = undefined;
      })

      .addCase(editAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload.user;
      })
      .addCase(editAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      });
  },
});

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  maxLength: 50,
};

function checkPasswordStrength(password: string): {
  score: number;
  message: string;
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
  };
} {
  const requirements = {
    length: password.length >= PASSWORD_REQUIREMENTS.minLength,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;

  let message = "";
  if (score <= 2) message = "Слабый пароль";
  else if (score <= 3) message = "Средний пароль";
  else if (score <= 4) message = "Хороший пароль";
  else message = "Отличный пароль";

  return { score, message, requirements };
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    return "+7" + digits.slice(1);
  } else if (digits.startsWith("7")) {
    return "+7" + digits.slice(1);
  } else if (digits.startsWith("9")) {
    return "+7" + digits;
  }

  if (phone.startsWith("+")) {
    const withoutPlus = digits;
    if (withoutPlus.startsWith("7")) {
      return "+" + withoutPlus;
    }
  }

  return "+7" + digits;
}

function validatePhone(phone: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  const formatted = formatPhoneNumber(phone);
  const digits = formatted.replace(/\D/g, "");

  if (digits.length !== 11) {
    return {
      isValid: false,
      formatted,
      error: "Телефон должен содержать 10 цифр после кода страны",
    };
  }

  const validPrefixes = ["9", "4", "8"];
  const secondDigit = digits[1];
  if (!validPrefixes.includes(secondDigit)) {
    return {
      isValid: false,
      formatted,
      error: "Неверный формат российского номера",
    };
  }

  return { isValid: true, formatted };
}

function validateField(
  state: UserState,
  field: keyof IFormValue,
  value: string,
) {
  state.validationErrors = state.validationErrors.filter(
    (e) => e.field !== field,
  );

  let error: ValidationError | null = null;

  switch (field) {
    case "email":
      if (!value) {
        error = { field, message: "Email обязателен" };
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = { field, message: "Неверный формат email" };
        }
      }
      break;

    case "password":
      if (!value) {
        error = { field, message: "Пароль обязателен" };
      } else {
        const strength = checkPasswordStrength(value);

        if (value.length < PASSWORD_REQUIREMENTS.minLength) {
          error = {
            field,
            message: `Пароль должен быть минимум ${PASSWORD_REQUIREMENTS.minLength} символов`,
          };
        } else if (!strength.requirements.uppercase) {
          error = {
            field,
            message: "Пароль должен содержать хотя бы одну заглавную букву",
          };
        } else if (!strength.requirements.lowercase) {
          error = {
            field,
            message: "Пароль должен содержать хотя бы одну строчную букву",
          };
        } else if (!strength.requirements.numbers) {
          error = {
            field,
            message: "Пароль должен содержать хотя бы одну цифру",
          };
        }
      }
      break;

    case "name":
      if (!value) {
        error = { field, message: "Имя обязательно" };
      } else if (value.length < 2) {
        error = { field, message: "Имя должно содержать минимум 2 символа" };
      } else if (value.length > 50) {
        error = { field, message: "Имя не должно превышать 50 символов" };
      } else if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value)) {
        error = {
          field,
          message: "Имя может содержать только буквы, пробелы и дефис",
        };
      }
      break;

    case "phone":
      if (!value) {
        error = { field, message: "Телефон обязателен" };
      } else {
        const phoneValidation = validatePhone(value);
        state.formValue.phone = phoneValidation.formatted;

        if (!phoneValidation.isValid) {
          error = {
            field,
            message: phoneValidation.error || "Неверный формат телефона",
          };
        }
      }
      break;
  }

  if (error) {
    state.validationErrors.push(error);
  }

  if (field === "confirmPassword" || field === "password") {
    const password = state.formValue.password;
    const confirm = state.formValue.confirmPassword;

    state.validationErrors = state.validationErrors.filter(
      (e) =>
        e.field !== "confirmPassword" || e.message !== "Пароли не совпадают",
    );

    if (password && confirm && password !== confirm) {
      state.validationErrors.push({
        field: "confirmPassword",
        message: "Пароли не совпадают",
      });
    }
  }

  state.isFormValid = state.validationErrors.length === 0;
}

function validateAllFields(state: UserState, formType: string) {
  state.validationErrors = [];

  if (formType === "register") {
    if (!state.formValue.email) {
      state.validationErrors.push({
        field: "email",
        message: "Email обязателен",
      });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.formValue.email)) {
        state.validationErrors.push({
          field: "email",
          message: "Неверный формат email",
        });
      }
    }

    if (!state.formValue.password) {
      state.validationErrors.push({
        field: "password",
        message: "Пароль обязателен",
      });
    } else {
      const strength = checkPasswordStrength(state.formValue.password);

      if (state.formValue.password.length < PASSWORD_REQUIREMENTS.minLength) {
        state.validationErrors.push({
          field: "password",
          message: `Пароль должен быть минимум ${PASSWORD_REQUIREMENTS.minLength} символов`,
        });
      } else if (!strength.requirements.uppercase) {
        state.validationErrors.push({
          field: "password",
          message: "Пароль должен содержать заглавную букву",
        });
      } else if (!strength.requirements.lowercase) {
        state.validationErrors.push({
          field: "password",
          message: "Пароль должен содержать строчную букву",
        });
      } else if (!strength.requirements.numbers) {
        state.validationErrors.push({
          field: "password",
          message: "Пароль должен содержать цифру",
        });
      }
    }

    if (!state.formValue.name) {
      state.validationErrors.push({
        field: "name",
        message: "Имя обязательно",
      });
    } else if (state.formValue.name.length < 2) {
      state.validationErrors.push({
        field: "name",
        message: "Имя должно содержать минимум 2 символа",
      });
    }

    if (!state.formValue.phone) {
      state.validationErrors.push({
        field: "phone",
        message: "Телефон обязателен",
      });
    } else {
      const phoneValidation = validatePhone(state.formValue.phone);
      state.formValue.phone = phoneValidation.formatted;

      if (!phoneValidation.isValid) {
        state.validationErrors.push({
          field: "phone",
          message: phoneValidation.error || "Неверный формат телефона",
        });
      }
    }

    if (state.formValue.password !== state.formValue.confirmPassword) {
      state.validationErrors.push({
        field: "confirmPassword",
        message: "Пароли не совпадают",
      });
    }
  }

  if (formType === "login") {
    if (!state.formValue.phone) {
      state.validationErrors.push({
        field: "phone",
        message: "Введите номер",
      });
    }
    if (!state.formValue.password) {
      state.validationErrors.push({
        field: "password",
        message: "Введите пароль",
      });
    }
  }

  state.isFormValid = state.validationErrors.length === 0;
}

export const {
  logout,
  inputValue,
  resetValue,
  clearValidationErrors,
  validateForm,
} = userSlice.actions;
export default userSlice.reducer;
