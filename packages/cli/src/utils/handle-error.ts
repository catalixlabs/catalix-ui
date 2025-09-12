import chalk from "chalk";
import z from "zod/v4";

export function handleError(error: unknown) {
  console.error(chalk.red("something went wrong, check below for details"));
  console.error(chalk.red("If the problem persists, open an issue on GitHub."));

  if (error instanceof z.ZodError) {
    console.log(chalk.red("Zod validation error"));
    console.log(z.treeifyError(error).errors);

    return;

    // for (const issue of error.issues) {
    //   console.log(`- ${chalk.cyan(issue.path.join("."))}: ${issue.message}`);
    //   return;
    // }
  }
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
    return;
  }
  console.error(chalk.red(error));
  console.log("");
  process.exit(1);
}
