export const getUserId = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '');
  return user && user.id;
};

export const getCurrentUserEmail = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '');
  return user && user.email;
};

export const copyRichTextToClipboard = (htmlTemplate: any, cb: any) =>
  new Promise<void>((resolve, reject) => {
    let success = false;

    const listener = (e: any) => {
      e.clipboardData.setData('text/plain', `${htmlTemplate}`);
      e.clipboardData.setData('text/html', `${htmlTemplate}`);
      e.preventDefault();
      success = true;
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    if (success) {
      cb();
      resolve();
    } else {
      cb('An Error Occured!');
      reject();
    }
  });

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const downloadJSONFile = async (jsonData: any, fileName: string) => {
  const json = JSON.stringify(jsonData);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
