import { BasePlugin } from '../core/BasePlugin.js';
import { highlight } from 'cli-highlight';
import chalk from 'chalk';

export class HighlightPlugin extends BasePlugin {
  constructor(options) {
    super(options);
    this.languageMap = {
      '.js': 'javascript',
      '.jsx': 'javascript',
      '.ts': 'typescript',
      '.tsx': 'typescript',
      '.py': 'python',
      '.java': 'java',
      '.html': 'html',
      '.css': 'css',
      '.scss': 'scss',
      '.less': 'less',
      '.json': 'json',
      '.xml': 'xml',
      '.md': 'markdown',
      '.php': 'php',
      '.rb': 'ruby',
      '.go': 'go',
      '.rs': 'rust',
      '.cpp': 'cpp',
      '.c': 'c',
      '.cs': 'csharp',
      '.swift': 'swift',
      '.sql': 'sql',
      '.yaml': 'yaml',
      '.yml': 'yaml',
      '.sh': 'bash',
      '.bash': 'bash'
    };
  }

  highlightContent(content, filePath) {
    if (!this.options.syntaxHighlight) return content;

    const extension = this.getFileExtension(filePath);
    const language = this.languageMap[extension] || '';

    try {
      return highlight(content, {
        language,
        theme: {
            keyword: chalk.blue.bold,
            string: chalk.green,
            function: chalk.cyan.bold,
            number: chalk.yellow,
            comment: chalk.gray.italic,
            class: chalk.magenta.bold,
            constant: chalk.yellow.bold,
            variable: chalk.white,
            operator: chalk.magenta,
            boolean: chalk.red.bold,
            decorator: chalk.blueBright,
            parameter: chalk.white.bold,
            namespace: chalk.cyanBright,
            escape: chalk.greenBright,
            builtin: chalk.redBright.bold,
            tag: chalk.red,
            attribute: chalk.cyan,
            value: chalk.greenBright,
            entity: chalk.blueBright,
            directive: chalk.yellowBright,
            symbol: chalk.green,
            label: chalk.magentaBright,
            instruction: chalk.red.bold,
            register: chalk.yellowBright,
            macro: chalk.cyanBright,
            preprocessor: chalk.blueBright,
            property: chalk.whiteBright,
            pseudoClass: chalk.yellowBright,
            pseudoElement: chalk.magentaBright,
            selector: chalk.greenBright,
            select:chalk.bgMagentaBright,
            tagName: chalk.redBright,
            method: chalk.blue.bold,
            module: chalk.cyanBright,
            enum: chalk.yellowBright,
            typedef: chalk.magenta.bold,
            interface: chalk.blueBright,
            annotation: chalk.redBright,
            field: chalk.cyan,
            statement: chalk.greenBright,
            exception: chalk.red.bold,
            shellCommand: chalk.blueBright,
            prompt: chalk.gray,
            substitution: chalk.cyanBright,
            heredoc: chalk.green,
            stringEscape: chalk.yellowBright,
            delimiter: chalk.magenta,
            interpolation: chalk.blueBright,
            regex: chalk.greenBright.bold,
            regexCharClass: chalk.magenta,
            regexQuantifier: chalk.yellowBright,
            regexGroup: chalk.blue.bold,
            regexOperator: chalk.cyanBright,
            regexEscape: chalk.redBright,
            htmlTag: chalk.redBright,
            htmlAttribute: chalk.cyan,
            htmlEntity: chalk.blueBright,
            htmlDoctype: chalk.yellowBright,
            htmlComment: chalk.gray.italic,
            jsxTag: chalk.redBright,
            jsxAttribute: chalk.cyan,
            jsxBrace: chalk.blueBright,
            jsxExpression: chalk.greenBright,
            jsxString: chalk.green,
            jsxPunctuation: chalk.magenta,
            controlFlow: chalk.blueBright.bold,
            loop: chalk.cyanBright.bold,
            condition: chalk.yellowBright.bold,
            returnValue: chalk.magentaBright.bold,
            importExport: chalk.bgMagenta.bold,
            async: chalk.blueBright.bold,
            await: chalk.cyanBright.bold,
            promise: chalk.yellowBright.bold,
            event: chalk.magentaBright.bold,
            callback: chalk.blueBright.bold,
            errorHandling: chalk.redBright.bold,
            dataType: chalk.cyanBright.bold,
            array: chalk.yellowBright.bold,
            object: chalk.magentaBright.bold,
            null: chalk.gray.bold,
            undefined: chalk.gray.italic,
            templateLiteral: chalk.greenBright.bold,
            destructuring: chalk.blueBright.bold,
            spreadOperator: chalk.cyanBright.bold,
            restOperator: chalk.yellowBright.bold,
            arrowFunction: chalk.magentaBright.bold,
            generator: chalk.blueBright.bold,
            iterator: chalk.cyanBright.bold,
            map: chalk.yellowBright.bold,
            set: chalk.magentaBright.bold,
            weakMap: chalk.blueBright.bold,
            weakSet: chalk.cyanBright.bold,
            proxy: chalk.yellowBright.bold,
            reflect: chalk.magentaBright.bold,
            symbolType: chalk.blueBright.bold,
            bigInt: chalk.cyanBright.bold,
            typedArray: chalk.yellowBright.bold,
            dataView: chalk.magentaBright.bold,
            arrayBuffer: chalk.blueBright.bold,
            sharedArrayBuffer: chalk.cyanBright.bold,
            atomic: chalk.yellowBright.bold,
            json: chalk.magentaBright.bold,
            url: chalk.blueBright.bold,
            textEncoder: chalk.cyanBright.bold,
            textDecoder: chalk.yellowBright.bold,
            blob: chalk.magentaBright.bold,
            file: chalk.blueBright.bold,
            fileReader: chalk.cyanBright.bold,
            fileList: chalk.yellowBright.bold,
            formData: chalk.magentaBright.bold,
            headers: chalk.blueBright.bold,
            request: chalk.cyanBright.bold,
            response: chalk.yellowBright.bold,
            abortController: chalk.magentaBright.bold,
            eventTarget: chalk.blueBright.bold,
            eventListener: chalk.cyanBright.bold,
            customEvent: chalk.yellowBright.bold,
            mutationObserver: chalk.magentaBright.bold,
            intersectionObserver: chalk.blueBright.bold,
            resizeObserver: chalk.cyanBright.bold,
            performance: chalk.yellowBright.bold,
            performanceObserver: chalk.magentaBright.bold,
            console: chalk.blueBright.bold,
            timer: chalk.cyanBright.bold,
            immediate: chalk.yellowBright.bold,
            queueMicrotask: chalk.magentaBright.bold,
            structuredClone: chalk.blueBright.bold,
            finalizationRegistry: chalk.cyanBright.bold,
            weakRef: chalk.yellowBright.bold,
            curlyBrace: chalk.greenBright,
            parenthesis: chalk.magentaBright,
            squareBracket: chalk.yellowBright
          }
          ,
        ignoreIllegals: true
      });
    } catch (error) {
      console.error(chalk.red(`Highlighting failed for ${filePath}: ${error.message}`));
      return content;
    }
  }
}