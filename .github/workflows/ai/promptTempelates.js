const promptTemplate = (task) => `
You are a senior QA Automation Engineer.

Convert the following task into Playwright JavaScript test code.

Requirements:
- Use async/await
- Use Playwright test syntax if needed
- Use proper selectors
- Include page.goto()
- Add screenshot at the end

Return ONLY code.

Task:
${task}
`;

export default promptTemplate;