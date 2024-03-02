class Message {

    id;
    content;
    author;

    constructor(content, author) {
        this.id = Date.now();
        this.content = content;
        this.author = author;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getAuthor() {
        return this.author;
    }

    setContent(content) {
        this.content = content;
    }

    setAuthor(author) {
        this.author = author;
    }

}

module.exports = Message;