import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const NoticeSchema = vine.object({
    noticeName: vine.string().minLength(3).maxLength(100),
});
