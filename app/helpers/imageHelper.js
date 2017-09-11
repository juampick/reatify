import {IMAGE_COVER, IMAGE_THUMBNAIL} from '../resources/constants';

/**
 * Function based on the image type, returns the image you need.
 * Usually 1st image: 600x600, 2nd: 300x300, 3rd: 64x64
 * @param imagesArray
 * @param type
 */
export function getImage(imagesArray, type = IMAGE_THUMBNAIL) {
  switch (type){
    case IMAGE_COVER:{ //We need the bigger image:
      if (imagesArray[0]){ //First image is the bigger one
        return imagesArray[0];
      }
      return null;
    }
    case IMAGE_THUMBNAIL:{
      if (imagesArray[1]){
        return imagesArray[1];
      } else if (imagesArray[0]){
        return imagesArray[0];
      }
      return null;
    }
    default: {
      if (imagesArray[0]) {
        return imagesArray[0];
      }
      return null;
    }
  }



}
