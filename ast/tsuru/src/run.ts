import path from "node:path";
import { Program } from "tsuru";

const program = new Program({
  name: "apitree",
  commandsRoots: new Set([path.resolve("src/commands")]),
});

program.run();
