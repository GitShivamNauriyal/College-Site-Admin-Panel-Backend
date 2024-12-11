import vine from '@vinejs/vine';
import { CustomErrorReporter } from './customErrorReporter.js';


// Set the custom error reporter
vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  username: vine.string().minLength(5).maxLength(30),
  password: vine.string().minLength(8).maxLength(25).confirmed(),
});

export const loginSchema =vine.object(
  {
    username: vine.string(),
    password: vine.string(),
  }
)

