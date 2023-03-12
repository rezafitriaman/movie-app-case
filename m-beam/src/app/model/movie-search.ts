import { Observable } from "rxjs";
import { MovieDetailSearch } from "./movie-detail-search";
import { Search } from "./search";

export interface MovieSearch {
    Search: Search[];
    totalResults: string;
    Response: string;
    Error: string;
}

export interface MovieSearchPlot { 
    Search: Observable<MovieDetailSearch[]>; 
    totalResults: string; 
    Response: string; 
    Error: string
}