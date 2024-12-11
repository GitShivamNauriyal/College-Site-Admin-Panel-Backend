import vine from '@vinejs/vine';
import { CustomErrorReporter } from './customErrorReporter.js';

vine.errorReporter = () => new CustomErrorReporter();

export const SyllabusSchema = vine.object({
    Name: vine.string().minLength(3).maxLength(60),
    semesterNumber: vine.string().minLength(1).maxLength(2),
    courseName: vine.string().minLength(3).maxLength(60),
  });