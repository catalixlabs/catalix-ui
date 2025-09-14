import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import registry from "../../../../registry.json";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  
  const component = registry.items.find((item) => item.name === name);
  if (!component) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  // Read file contents
  const componentWithContent = {
    ...component,
    files: await Promise.all(
      component.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.path);
        const content = await readFile(filePath, "utf-8");
        return { ...file, content };
      })
    ),
  };

  return NextResponse.json(componentWithContent);
}
