import { Command } from "commander";

const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument('[components...]", "names, url or local path to component')
  .action(async () => {});

export default add;
