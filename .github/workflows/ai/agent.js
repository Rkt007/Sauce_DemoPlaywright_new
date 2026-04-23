import generatePlaywrightCode from "./openaiClient.js";

async function runAgent(page, task) {
  // Generate code using AI
  const code = await generatePlaywrightCode(task);

  console.log("Generated Playwright Code:");
  console.log(code);

  // Convert generated code into executable function
  const asyncFunction = new Function(
    "page",
    `
    return (async () => {
      ${code}
    })();
  `
  );

  // Execute the generated code
  await asyncFunction(page);
}

export default runAgent;