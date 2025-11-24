declare module 'fs-extra';

declare module 'path' {
    export function join(...paths: string[]): string;
    export function resolve(...paths: string[]): string;
    export function dirname(p: string): string;
}

declare module 'url' {
    export function fileURLToPath(url: string): string;
}

declare const process: {
    exit(code?: number): never;
    env: Record<string, string | undefined>;
    argv: string[];
};

// Shim for Express/CORS
declare module 'express' {
    interface Application {
        use(...args: any[]): any;
        get(path: string, handler: any): any;
        post(path: string, handler: any): any;
        listen(port: number, callback?: () => void): any;
    }
    
    interface ExpressStatic {
        (): Application;
        json(): any;
        static(): any;
    }
    
    const express: ExpressStatic;
    export default express;
}
declare module 'cors' {
    const cors: () => any;
    export default cors;
}

// Shim for SSEServerTransport if not in current SDK version
declare module '@modelcontextprotocol/sdk/server/sse.js' {
    export class SSEServerTransport {
        constructor(endpoint: string, res: any);
        start(): Promise<void>;
        send(message: any): Promise<void>;
        close(): Promise<void>;
    }
}
