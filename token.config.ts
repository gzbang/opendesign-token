module.exports = {
  prefix: "--o-",
  output: "./src/shared/theme",
  themeMap: [
    {
      key: "light",
      name: "opendesign.light",
    },
    {
      key: "dark",
      name: "opendesign.dark",
    },
  ],
  defaultTheme: "",
  tokenFile: ["./src/shared/token/opendesign-token.json"],
  codeSnippetsFile: ".vscode/opendesign.token.code-snippets",
};
