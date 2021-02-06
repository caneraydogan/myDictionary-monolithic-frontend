export class ConsoleTypes {
    static INFO = 'info';
    static WARNING = 'warn';
    static LOG = 'log';
    static ERROR = 'error';
}

export class LoggerService {
    static logs: string[] = [];

    static push(type: ConsoleTypes, message: any) {
        this.logs.push(message);
    }

    static list(show: boolean) {
        if (show) {
            console.log(this.logs);
        }
        return this.logs;
    }

    static info(message: any) {
        this.push(ConsoleTypes.INFO, message);
    }

    static log(message: any) {
        this.push(ConsoleTypes.LOG, message);
    }

    static warning(message: any) {
        this.push(ConsoleTypes.WARNING, message);
    }

    static error(message: any) {
        this.push(ConsoleTypes.ERROR, message);
    }
}
