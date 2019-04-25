export function isImageLoaded (img) {
  if(img.complete) {
    return false;
  }

  if(img.naturalWidth === 0) {
    return false;
  }

  return true;
}

export function isElement (obj) {
  return obj instanceof HTMLElement;
}

export function isObject (obj) {
  return obj instanceof Object;
}