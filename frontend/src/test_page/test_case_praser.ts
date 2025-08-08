
const formatLeetCodeInput = (rawInput: string): string => {

  const regex = /\w+\s*=\s*(?<value>\[.*?\]|".*?"|\S+)/g;
  
  let match;
  const values: string[] = [];


  while ((match = regex.exec(rawInput)) !== null) {
    if (match.groups?.value) {
      values.push(match.groups.value);
    }
  }

  if (values.length === 0) {
    return rawInput.trim();
  }
  
  const formattedParts: string[] = [];

  values.forEach(value => {
   
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.substring(1, value.length - 1);
      if (arrayContent.trim() === '') {
        formattedParts.push('0'); 
      } else {
        const elements = arrayContent.split(',').map(el => el.trim());
        formattedParts.push(String(elements.length));
        formattedParts.push(elements.join(' '));   
      }
    }
 
    else if (value.startsWith('"') && value.endsWith('"')) {
      formattedParts.push(value.substring(1, value.length - 1));
    }
   
    else {
      formattedParts.push(value);
    }
  });

  return formattedParts.join('\n');
};


const parseSamplesFromHtml = (htmlString: any): { input: string; expectedOutput: string }[] => {
  if (!htmlString || typeof htmlString !== 'string') return [];

  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const preElements = tempDiv.querySelectorAll('pre');
    const extractedCases: { input: string; expectedOutput: string }[] = [];

    preElements.forEach(pre => {
      const text = pre.textContent || '';

      if (text.includes('Input:') && text.includes('Output:')) {
        const inputStartIndex = text.indexOf('Input:') + 'Input:'.length;
        const outputStartIndex = text.indexOf('Output:');
        
      
        const rawInput = text.substring(inputStartIndex, outputStartIndex).trim();

   
        const formattedInput = formatLeetCodeInput(rawInput);

        const explanationStartIndex = text.indexOf('Explanation:');
        const outputEndIndex = explanationStartIndex !== -1 ? explanationStartIndex : text.length;

        const output = text.substring(outputStartIndex + 'Output:'.length, outputEndIndex).trim();

        extractedCases.push({
          input: formattedInput,
          expectedOutput: output,
        });
      }
    });

    return extractedCases;
  } catch (error) {
    console.error("Failed to parse samples from HTML:", error);
    return []; 
  }
};

export default parseSamplesFromHtml;