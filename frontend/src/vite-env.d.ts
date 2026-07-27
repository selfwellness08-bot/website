/// <reference types="vite/client" />

declare module "*.css" {}

declare module "pdfjs-dist" {
  const pdfjsLib: any;
  export default pdfjsLib;
}
