export interface CarrouselMakerInterface {
  title: string;
  startPoint?: number;
  image: ImageInterface[];
}

interface ImageInterface {
  subtitle: string;
  imagePathArray?: string;
}
