export const calculateDisplayTime = (word: string, baseWPM: number): number => {
  const baseTimePerWord = 60000 / baseWPM; // milliseconds per word at base speed
  const wordLength = word.length;
  
  // Scale timing based on character count
  // 1-6 chars = 1x base time
  // 7-9 chars = 1.8x base time  
  // 10-12 chars = 2.4x base time
  // 13+ chars = 3.2x base time
  const multiplier = wordLength <= 6 ? 1.0 :
                    wordLength <= 9 ? 1.8 :
                    wordLength <= 12 ? 2.4 : 3.2;

  const endChar = word.charAt(word.length - 1);

  // Add pause for punctuation
  let punctuationMultiplier = 1.0;
  if (endChar === "." || endChar === "?" || endChar === "!") {
    punctuationMultiplier = 1.5; // 50% longer for sentence endings
  } else if (endChar === "," || endChar === ";" || endChar === ":") {
    punctuationMultiplier = 1.3; // 30% longer for clause breaks
  } else if (endChar === "—" || endChar === "–" || endChar === "-") {
    punctuationMultiplier = 1.4; // 40% longer for dashes (interruptions/emphasis)
  } else if (endChar === ")" || endChar === "]" || endChar === "}") {
    punctuationMultiplier = 1.2; // 20% longer for closing brackets/parentheses
  } else if (endChar === "\"" || endChar === "'" || endChar === `"` || endChar === "'") {
    punctuationMultiplier = 1.2; // 20% longer for closing quotes
  }
  
  return Math.round(baseTimePerWord * multiplier * punctuationMultiplier);
};