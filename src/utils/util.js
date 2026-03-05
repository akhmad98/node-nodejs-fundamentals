import fs, { constants } from 'node:fs/promises';

export const isFileOrDirectoryExist = async (path) => {
  const errorMsg = 'FS operation failed';

  try {
    await fs.access(path, constants.R_OK);
  } catch (error) {
    if (error.code === 'ENOENT') {
        console.error(errorMsg);
    } else if (error.code === 'EACCES') {
      console.error('Error: ', 'Access Denied!');
    }
    console.error('Error: ', error); 
  }
} 