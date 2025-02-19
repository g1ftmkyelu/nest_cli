export class FileNavigator {
    constructor(files) {
        this.files = files;
        this.currentIndex = 0;
        this.markedFiles = new Set();
    }

    next() {
        this.currentIndex = Math.min(this.currentIndex + 1, this.files.length - 1);
        return this.files[this.currentIndex];
    }

    previous() {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        return this.files[this.currentIndex];
    }

    toggleMark() {
        const currentFile = this.files[this.currentIndex];
        if (this.markedFiles.has(currentFile)) {
            this.markedFiles.delete(currentFile);
        } else {
            this.markedFiles.add(currentFile);
        }
    }

    getCurrentFile() {
        return this.files[this.currentIndex];
    }

    isMarked(file) {
        return this.markedFiles.has(file);
    }
}