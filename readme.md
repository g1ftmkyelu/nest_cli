Here's an improved version of your README with a clear structure, better formatting, and the added Yarn installation command:

---

# 🚀 **NestCLI - The Ultimate Codebase Explorer**

![NestCLI Logo](/logo.png)

**NestCLI** is a powerful and intuitive command-line tool that streamlines code exploration and navigation. With features like syntax highlighting, interactive search, tree visualization, and keyboard navigation, it significantly enhances your workflow, making it effortless to navigate complex projects.

---

## ✨ **Features**

- 📂 **Directory Tree Visualization** – Navigate projects with an intuitive tree view
- 🔍 **Advanced File Search** – Search file content using regex support
- 🎨 **Syntax Highlighting** – Enhanced readability for various programming languages
- ⌨️ **Interactive Keyboard Navigation** – Seamlessly browse files
- 📄 **Pagination for Large Files** – View content efficiently
- ⚙️ **Customizable Configuration** – Save preferred settings for future use
- 🎯 **File Filtering** – Search by extension or name
- 🔢 **Line Numbering** – Improve readability and referencing

---

## 🛠️ **Installation**

You can install **NestCLI** globally using either **npm** or **Yarn**.

### Using npm:
```bash
npm install -g nest-cli
```

### Using Yarn:
```bash
yarn global add nest-cli
```

---

## 🎮 **Usage**

Run the following command to explore a directory:

```bash
nest_cli [options] [directory]
```

### 🔧 **Options**

| Flag                         | Description                                      | Default        |
|------------------------------|--------------------------------------------------|----------------|
| `-d, --depth <level>`         | Limit directory tree depth                       | Infinite       |
| `-e, --extensions <ext>`      | Filter files by extensions (comma-separated)    | All            |
| `-l, --line-numbers`         | Show line numbers in file content               | false          |
| `-s, --size`                  | Display file sizes in tree view                 | false          |
| `--hidden`                    | Include hidden files and directories            | false          |
| `-t, --tree-only`             | Show only the directory structure               | false          |
| `-f, --file-only`             | Show only file contents (hide tree)             | false          |
| `-L, --line-limit <num>`      | Set number of lines to display per page         | 200            |
| `-S, --search <term>`         | Search for files by name (case-insensitive)     | none           |
| `-r, --regex`                 | Enable regex-based search                       | false          |
| `--syntax-highlight`          | Enable syntax highlighting                      | false          |
| `-k, --keyboard-nav`          | Enable interactive navigation                   | false          |
| `--save-config`               | Save current options as default                 | -              |
| `--reset-config`              | Reset to default configuration                  | -              |

---

## 📝 **Examples**

### 📂 **Display Directory Structure**
```bash
nest_cli .
```
**Output:**
```
📁 Project Tree:
├── src/
│   ├── core/
│   │   ├── FileNavigator.js
│   │   └── ConfigManager.js
│   └── plugins/
│       ├── TreePlugin.js
│       └── SearchPlugin.js
├── package.json
└── README.md
```

### 🔍 **Search for Files with Syntax Highlighting**
```bash
nest_cli . -S "plugin" --syntax-highlight
```
**Output:**
```
📄 Found in src/plugins/TreePlugin.js:
export class TreePlugin extends BasePlugin {
    // Syntax-highlighted code...
}
```

### ⌨️ **Enable Interactive Navigation**
```bash
nest_cli . -k
```
**Navigation Controls:**
- `n` – Next file
- `p` – Previous file
- `m` – Mark/unmark file
- `q` – Quit

---

## ⚙️ **Configuration**

### ✅ **Save Custom Settings**
```bash
nest_cli --depth 3 --line-numbers --syntax-highlight --save-config
```

### 🔄 **Reset to Defaults**
```bash
nest_cli --reset-config
```

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps to get started:

1. 🍴 Fork the repository
2. 🌱 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎯 Open a Pull Request

**Useful Links:**
- [Docs] (https://nestcli-docs.vercel.app/docs/intro)
- [GitHub Repository](https://github.com/g1ftmkyelu/nest-cli)
- [Issue Tracker](https://github.com/g1ftmkyelu/nest-cli/issues)
- [Pull Requests](https://github.com/g1ftmkyelu/nest-cli/pulls)

---

## 📜 **License**

NestCLI is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


## 📞 **Need Help?**

If you have any questions or need support:

1. 📚 Check the documentation
2. 🔎 Search existing issues
3. 💬 Open a new issue

---

🚀 **Built with passion by Gift Mkyelu (a.k.a The Code Maestro)** 💻🔥

---

