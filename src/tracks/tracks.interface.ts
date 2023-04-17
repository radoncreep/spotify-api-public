type ExtUrlsProp = {
    external_urls: {
        spotify: string
    }
}

type TrackArtistProp = {
    external_urls: ExtUrlsProp;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string
}

type TrackImageProp = {
    height: number;
    url: string;
    width: number;
}

type AlbumType = {
    album_type: "single";
    artists: TrackArtistProp;
    available_markets: Array<string>;
    external_urls: ExtUrlsProp;
    href: string;
    id: string;
    images: Array<TrackImageProp>;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: "album" | "single" | string;
    uri: string;
}

export interface ITrack {
    album: AlbumType;
    artists: Array<TrackArtistProp>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean,
    external_ids: {
        isrc: string;
    };
    external_urls: ExtUrlsProp;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string | "track";
    uri: string;
}