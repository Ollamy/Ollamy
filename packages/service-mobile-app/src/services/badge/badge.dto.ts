export interface BadgeModel {
  id: string;
  name: string;
  description: string;
  order: number;
  image_name: string;
  color: string;
}

export interface GetBadgeResponse {
  badges: BadgeModel[];
}
