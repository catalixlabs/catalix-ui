import chalk from "chalk";
import z from "zod/v4";

export const handleError = (error: unknown) => {
  console.error(chalk.gray("something went wrong, check below for details."));
  console.error(chalk.gray("If the problem persists, open an issue on GitHub"));
  console.log("");

  if (error instanceof z.ZodError) {
    console.log(chalk.red("Validation error"));
    console.log(z.treeifyError(error).errors);
    return;
  }

  if (error instanceof Error) {
    console.error(chalk.red(error.message));
    return;
  }

  console.error(chalk.red(error));
  console.log("");
  process.exit(1);
};
