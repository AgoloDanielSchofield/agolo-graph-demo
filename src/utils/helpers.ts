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
