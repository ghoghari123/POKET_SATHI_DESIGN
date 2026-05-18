declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Tell TypeScript about Tailwind v4 directives
declare const theme: (config: Record<string, unknown>) => string;
declare const apply: (styles: string) => string;
declare const layer: (name: string) => void;