import { defineCommand } from "tsuru";

type CommandQuestions = {
  name: string;
};

export default defineCommand<CommandQuestions>({
  description: "Hello command",
  questions: [
    {
      name: "name",
      type: "input",
      message: "What is your name?",
    },
  ],
  handler() {
    const { name } = this.getAnswers();

    console.log(`Hello, ${name}`);
  },
});
