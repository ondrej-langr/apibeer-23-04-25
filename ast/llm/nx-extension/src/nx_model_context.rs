use std::env;
use zed_extension_api::{self as zed, Command, ContextServerId, Project, Result};

const BIN: &str =
    "/Users/daichi/Desktop/Work/apitree/apibeer-23-04-25/ast/llm/node_modules/.bin/nx-mcp";

struct NxModelContextExtension;

impl zed::Extension for NxModelContextExtension {
    fn new() -> Self {
        Self
    }

    fn context_server_command(
        &mut self,
        _context_server_id: &ContextServerId,
        project: &Project,
    ) -> Result<Command> {
        Ok(Command {
            command: BIN.to_string(),
            args: vec![env::current_dir().unwrap().to_string_lossy().to_string()],
            env: vec![],
        })
    }
}

zed::register_extension!(NxModelContextExtension);
