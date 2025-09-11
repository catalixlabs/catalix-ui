import ora, { type Ora, type Options as OraOptions } from "ora";

export async function withSpinner<T>(
  text: string,
  task: () => Promise<T>,
  options?: OraOptions
): Promise<T> {
  const spinner: Ora = ora({ text, ...options }).start();

  try {
    const result = await task();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
}
