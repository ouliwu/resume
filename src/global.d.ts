declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.txt" {
  const content: string;
  export default content;
}

declare module "marked-mangle" {
  const mangle: any;
  export {mangle};
}


