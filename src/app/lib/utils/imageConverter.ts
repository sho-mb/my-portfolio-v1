export const getImageSizeFromFile = (file: File): Promise<{ width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && typeof event.target.result === 'string') {
        const image = new Image();
        image.onload = () => {
          const size = {
            width: image.width,
            height: image.height,
          };
          resolve(size);
        };
        image.onerror = (error) => {
          reject(error);
        };
        image.src = event.target.result;
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
