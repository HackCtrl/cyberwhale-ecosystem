
/**
 * Utility function for handling challenge file downloads
 */

export const downloadChallengeFile = (challengeId: string, fileName: string) => {
  // Map challenge IDs to file paths
  const filePaths: Record<string, Record<string, string>> = {
    '7': {
      'encrypted_archive.zip': '/src/assets/ctf/crypto/encrypted_archive.zip',
      'hint.txt': '/src/assets/ctf/crypto/hint.txt'
    }
  };

  // Check if the challenge and file exist
  if (!filePaths[challengeId] || !filePaths[challengeId][fileName]) {
    console.error(`File ${fileName} not found for challenge ${challengeId}`);
    return false;
  }

  // Get the file path
  const filePath = filePaths[challengeId][fileName];
  
  // In a real application, this would fetch the file from the server
  // For demonstration purposes, we'll create a download link for the local file
  
  // Create a link element
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  
  // Append to the body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return true;
};
