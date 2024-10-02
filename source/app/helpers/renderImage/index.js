import Constant from "../../../apis/constant";


let dummyUser = { uri: Constant.image + "/assets/images/noUser.jpg" };

export function baseUrl(path) {
  if (path && path !== null && path !== '') return {uri: Constant.image + path};
  else return dummyUser;
}

export function renderImage(image, size = 'small') {
  if (typeof image === 'string') {
    return image ? baseUrl(image) : dummyUser;
  } else if (size == 'large') {
    return image && image.large && image.large !== ``
      ? baseUrl(image.large)
      : image && image.original && image.original !== ``
      ? baseUrl(image.original)
      : null;
  } else if (size === 'medium') {
    return image && image.medium && image.medium !== ``
      ? baseUrl(image.medium)
      : image && image.original && image.original !== ``
      ? baseUrl(image.original)
      : null;
  } else {
    return image && image.small && image.small !== ``
      ? baseUrl(image.small)
      : image && image.original && image.original !== ``
      ? baseUrl(image.original)
      : dummyUser;
  }
}
