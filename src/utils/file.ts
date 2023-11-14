type TCommonMimeTypes = 'application/json';

export function createSingleFile(data: any, filename: string, type: TCommonMimeTypes) {
  var file = new Blob([data], { type: type });

  const navigator = window.navigator as any; // NOTE: required to prevent typescript error (https://stackoverflow.com/questions/69552023/after-update-typescript-3-7-2-to-latest-typescript-4-4-4-error-ts2339)

  if (navigator.msSaveOrOpenBlob)
    // IE10+
    navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

export function readSingleFile() {
  return new Promise((resolve, reject) => {
    let fileContent;

    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.onchange = (e: any) => {
      var file = e.target?.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        fileContent = e.target?.result;
        document.body.removeChild(fileInput);
        resolve(fileContent);
      };
      reader.onerror = function (e) {
        document.body.removeChild(fileInput);
        reject('Failed to load file');
      };
      reader.readAsText(file);
    };
    document.body.appendChild(fileInput);
    fileInput.click();
  });
}
