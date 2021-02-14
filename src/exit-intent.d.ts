declare module 'exit-intent' {
  export interface Config {
    threshold: number;
    maxDisplays: number;
    eventThrottle: number;
    onExitIntent: () => void;
  }

  export default function ExitIntent(options?: Config): () => void;
}
