# Catalix UI

CLI for managing Catalix UI components.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util.

```bash
npx @catalix/cli init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx @catalix/cli add [component]
```

### Example

```bash
npx @catalix/cli add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx @catalix/cli add
```

## Documentation

Visit https://catalix-ui.vercel.app/docs to view the documentation.

## License

Licensed under the [MIT license](https://github.com/catalixlabs/catalix-ui/blob/master/LICENSE).
