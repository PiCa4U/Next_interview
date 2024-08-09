export {};

declare global {
    interface Window {
        clarity: (command: string, eventName: string) => void;
    }
}
