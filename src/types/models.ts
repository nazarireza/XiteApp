export interface Genre {
  id: number;
  name: string;
}

export interface Video {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre: number;
    image_url: string;
  }

export interface GetVideosViewModel {
  genres: Array<Genre>;
  videos: Array<Video>;
}
