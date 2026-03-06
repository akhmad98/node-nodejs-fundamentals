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

export const splitArrayByNumberOfCores = (arr, numberOfCores) => {
  let result = [];

  const chunkSize = Math.ceil(arr.length / numberOfCores);
  
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}

export const keyMerge = (sortedArr) => {
    let result = [];

    result = sortedArr.reduce((merged, current) => {
        let i = 0, j = 0;
        const combined = [];
        while (i < merged.length && j < current.length) {
        if (merged[i] < current[j]) combined.push(merged[i++]);
        else combined.push(current[j++]);
        }
        return [...combined, ...merged.slice(i), ...current.slice(j)];
    }, []);

    return result;
}