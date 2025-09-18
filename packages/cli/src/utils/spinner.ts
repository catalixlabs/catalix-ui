import ora, { type Ora, type Options as OraOptions } from "ora";

export const withSpinner = async <T>(
  text: string,
  task: (spinner: Ora) => Promise<T>,
  options?: OraOptions
): Promise<T> => {
  const spinner: Ora = ora({ text, ...options }).start();

  try {
    const result = await task(spinner);
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
};
