export interface Search {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieSearch {
    Search: Search[];
    totalResults: string;
    Response: string;
    Error: string;
}

export interface NotFound {
    Response: string;
    Error: string;
}