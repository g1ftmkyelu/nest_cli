# nest_cli 🌳

![nest_cli Logo](/logo.png)

`nest_cli` is a command-line interface (CLI) tool designed to display the structure of a codebase in a structured and readable format. It provides a visual tree representation of directories and displays file contents with line numbers.

## Features ✨

- Generates a visual tree structure of directories.
- Displays file contents with line numbers.
- Skips `node_modules` and hidden files by default.
- Easy to use and integrate into your workflow.

## Installation 🛠️

To install `nest_cli` globally on your system, use npm:

```bash
npm install -g  @giftmk/nest_cli
```

## Usage 💻

Once installed, you can use `nest_cli` to display the structure of any directory. Simply run:

```bash
nest_cli <path>
```

Replace `<path>` with the path to the directory you want to process. If no path is provided, `nest_cli` will process the current directory.

### Example

```bash
nest_cli /path/to/your/project
```

This command will display the directory structure and file contents of the specified project directory.

## Example Output 📋

Here is a simple example of what the output might look like when running `nest_cli` on a sample project directory:

```
project-directory
├── src
│   ├── index.js
│   └── utils.js
├── package.json
└── README.md

/src/index.js:
--------------------------------------------------------------------------------
  1 | // This is a sample file
  2 | console.log('Hello, world!');
  3 |
--------------------------------------------------------------------------------

/src/utils.js:
--------------------------------------------------------------------------------
  1 | // Utility functions
  2 | export function add(a, b) {
  3 |   return a + b;
  4 | }
--------------------------------------------------------------------------------

/package.json:
--------------------------------------------------------------------------------
  1 | {
  2 |   "name": "sample-project",
  3 |   "version": "1.0.0",
  4 |   "main": "index.js"
  5 | }
--------------------------------------------------------------------------------

/README.md:
--------------------------------------------------------------------------------
  1 | # Sample Project
  2 | This is a sample project.
--------------------------------------------------------------------------------
```

## Options ⚙️

Currently, `nest_cli` does not have additional command-line options, but future updates may include more features and customization options.

## Contributing 🤝

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/g1ftmkyelu/nest_cli).

- [Open an Issue](https://github.com/g1ftmkyelu/nest_cli/issues)
- [Submit a Pull Request](https://github.com/g1ftmkyelu/nest_cli/pulls)

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author 👨‍💻

- **Gift Mkyelu**

## Contact 📧

For any questions or feedback, feel free to contact the author at [mkyelugift@gmail.com](mailto:mkyelugift@gmail.com).

---

Thank you for using `nest_cli`! I hope it helps you navigate and understand your codebase more efficiently. 🚀
