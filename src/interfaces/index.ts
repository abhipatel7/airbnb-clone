export interface IExploreData {
  img: string;
  location: string;
  distance: string;
}

export interface ICardData {
  img: string;
  title: string;
}

export interface ISearchResult {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}

export interface IViewPort {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
