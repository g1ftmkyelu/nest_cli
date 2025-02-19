export const EXCLUDED_DIRS = new Set([
    'node_modules', 'vendor', 'venv', '__pycache__',
    '.git', 'target', 'dist', 'build'
]);

export const MEDIA_EXTENSIONS = new Set([
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg',
    '.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv',
    '.mp3', '.wav', '.ogg', '.flac'
]);

export const DEFAULT_OPTIONS = {
    depth: Infinity,
    lineLimit: 200,
    syntaxHighlight: false,
    lineNumbers: false,
    hidden: false,
    size: false,
};