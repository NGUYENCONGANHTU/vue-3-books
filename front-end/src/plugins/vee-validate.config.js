import { configure, defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
configure({
  generateMessage: (context) => {
    const messages = {
      required: ` ${context.field} is required.`,
      email: ` ${context.field} is invalid.`,
    };

    const message =
      messages[context.rule.name] || `${context.field} is invalid.`;
    return message;
  },
});
