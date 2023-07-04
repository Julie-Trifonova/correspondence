import isMatch from "date-fns/isMatch";

export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
  if (value) return undefined;
  return "Поле необходимо заполнить";
};

export const maxLengthValidator =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    if (value && value.length > maxLength) {
      return `Максимальная длина ${maxLength} символов`;
    }
    return undefined;
  };
export const dateValidator =
  (dateFormat: string): FieldValidatorType =>
  (value) => {
    if (value && !isMatch(value, dateFormat)) {
      return `Формат даты 'дд.мм.ггггг'`;
    }
    return undefined;
  };
// `/^[a-zA-Z0-9]+@([a-zA-Z0-9]+\\.)+[A-Za-z]+$/`
export const emailValidator = (): FieldValidatorType => (value) => {
  if (value && !value.match(/[[a-zA-Z0-9]+@([a-zA-Z0-9]+\\.)+[A-Za-z]+]/g)) {
    return `Некорректный e-mail`;
  }
  return undefined;
};

// export const textValidator = (maxLength: number): FieldValidatorType => (value) => {
//   // if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
// console.log(value)
// }
