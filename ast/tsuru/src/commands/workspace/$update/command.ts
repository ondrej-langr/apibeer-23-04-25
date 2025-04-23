import { defineCommand } from "tsuru";

type CommandQuestions = {
  name: string;
};

export default defineCommand<CommandQuestions>({
  description: "Update workspace command",
  handler() {
    const program = this.getProgram();
    program.logger.warn("Workspace has been updated!");
  },
});
