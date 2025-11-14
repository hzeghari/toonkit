// Simple token counter - approximates tokens similar to LLM tokenization
export function countTokens(text: string): number {
  // Rough approximation: split on whitespace and punctuation
  // Real tokenizers are more complex, but this gives a reasonable estimate
  const tokens = text
    .split(/(\s+|[,.:;{}[\]()"])/g)
    .filter(t => t.trim().length > 0);
  
  return tokens.length;
}
