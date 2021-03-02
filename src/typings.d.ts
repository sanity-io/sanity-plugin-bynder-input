declare module '*.css' {
  const content: { [className: string]: CSSProperties };
  export default content;
}
