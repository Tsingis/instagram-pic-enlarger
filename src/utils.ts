export function getLargePictureUrl(url: any): string {
    if (url.match(/\//g).length > 4) {
      url = url.substr(0, url.lastIndexOf("\/"));
    }
    return url + "/media/?size=l";
  };