import { readPackageJSON } from "pkg-types";

export const getPackageJSONInfo = async (cwd: string) => {
  return await readPackageJSON(cwd);
};
