    export function getErrorMessage(error) {
        try{
            var errorJson = JSON.parse(error.message);
            return errorJson.message
        } catch {
            return "An error happened."
        }
    }

    export function getLineHeight(element) {
        // Create a temporary span element with the same styles as the textarea
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'normal';
        tempSpan.style.fontFamily = getComputedStyle(element).fontFamily;
        tempSpan.style.fontSize = getComputedStyle(element).fontSize;
        tempSpan.style.lineHeight = getComputedStyle(element).lineHeight;
        tempSpan.textContent = 'M'; // Use 'M' as it is often the tallest character

        document.body.appendChild(tempSpan);
        const lineHeight = tempSpan.offsetHeight;
        document.body.removeChild(tempSpan);

        return lineHeight;
    }
    
    export function limitText(textarea) {
        // Get the line height of the textarea

        const lineHeight = getLineHeight(textarea);
        // Determine the maximum number of visible lines
        const maxLines = Math.floor(textarea.clientHeight / lineHeight);
        // Split the textarea value into lines
        const lines = textarea.value.split('\n');
        let truncatedValue = ''; // Store the truncated text
        let currentLineCount = 0; // Keep track of the current line count

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineLength = line.length;
            
            // Handle lines longer than the textarea width
            if (lineLength > textarea.cols) {
                const wrappedLines = Math.ceil(lineLength / textarea.cols);
                if (currentLineCount + wrappedLines > maxLines) {
                    // Truncate the line if it exceeds the maximum visible lines
                    truncatedValue += line.slice(0, textarea.cols * (maxLines - currentLineCount)) + '\n';
                    break;
                } else {
                    for (let j = 0; j < wrappedLines; j++) {
                        if (currentLineCount < maxLines) {
                            // Add the wrapped line to the truncated text
                            const slicedLine = line.slice(j * textarea.cols, (j + 1) * textarea.cols) + '\n';

                            truncatedValue += slicedLine;
                            currentLineCount++;
                        }
                    }
                }
            } else {
                if (currentLineCount < maxLines) {
                    // Add the line to the truncated text
                    truncatedValue += line + '\n';
                    currentLineCount++;
                } else {
                    break;
                }
            }
        }

        // Remove the last '\n' added in the loop
        const finalText = adjustNewlines(truncatedValue.slice(0, -1));
        return finalText;
    }

    function adjustNewlines(text) {
        let result = '';
        let i = 0;
        
        while (i < text.length) {
            if (text[i] === '\n') {
                // Check if there's a space before the newline and it's not already moved
                let lastSpaceIndex = result.lastIndexOf(' ');
                if (lastSpaceIndex !== -1 && result.charAt(lastSpaceIndex + 1) !== '\n') {
                    result = result.substring(0, lastSpaceIndex + 1) + '\n' + result.substring(lastSpaceIndex + 1);
                } else {
                    result += '\n'; // If no space before, just append the newline
                }
            } else {
                result += text[i]; // Append non-newline characters as they are
            }
            i++;
        }
        return result;
    }
    