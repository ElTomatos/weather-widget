/// <reference types="react-scripts" />

declare module "!!raw-loader!!sass-loader!*" {
  const content: string;
  export default content;
}
