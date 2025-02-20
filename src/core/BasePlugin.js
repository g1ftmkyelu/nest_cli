export class BasePlugin {
    constructor(options = {}) {
      this.options = options;
    }
  
    initialize() {
      // Override in child classes
    }
  
    execute() {
      // Override in child classes
    }
  
    cleanup() {
      // Override in child classes
    }
  
    // Add utility methods that might be useful for all plugins
    getFileExtension(filePath) {
      const ext = filePath.toLowerCase().match(/\.[^.]*$/);
      return ext ? ext[0] : '';
    }
  
    isTextFile(filePath) {
      const textExtensions = [
        '.txt', '.js', '.jsx', '.ts', '.tsx', '.md', '.json', '.yaml', '.yml',
        '.html', '.css', '.scss', '.less', '.py', '.java', '.rb', '.php', '.cpp',
        '.c', '.h', '.cs', '.go', '.rs', '.swift', '.kt', '.sql', '.sh', '.bash'
      ];
      return textExtensions.includes(this.getFileExtension(filePath));
    }
  }