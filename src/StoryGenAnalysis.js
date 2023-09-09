const Anthropic = require('@anthropic-ai/sdk');

// insert API Key
const anthropic = new Anthropic({
  apiKey: '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', // defaults to process.env["ANTHROPIC_API_KEY"]
});

// Our function to pass in the age, theme, character to create a prompt
async function main(age, theme, character) {
  const completion = await anthropic.completions.create({
    model: 'claude-2',
    max_tokens_to_sample: 300,
    prompt: `${Anthropic.HUMAN_PROMPT} Create a gender neutral story for a ${age} about ${theme} using a ${character}${Anthropic.AI_PROMPT}`,
  });

  console.log(completion);
}

 main("4", "car", "Lightning McQueen");

