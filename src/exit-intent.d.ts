declare module 'exit-intent' {
  export interface Config {
    edges: {
      top: boolean;
      right: boolean;
      bottom: boolean;
      left: boolean;
    };
    threshold: number;
    maxDisplays: number;
    eventThrottle: number;
    onExitIntent: () => void;
  }

  export default function ExitIntent(options?: Config): () => void;
}
