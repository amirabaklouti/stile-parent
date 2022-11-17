import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders()
  }

  import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

  httpOptions.headers.append('Access-Control-Allow-Origin', '*');
  httpOptions.headers.append('Content-Type', 'application/json');
@Injectable({
providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient:HttpClient) { }


  
  searchingClothes(searchTerm,page): Observable<[]> {
    const size = 6
    return this.httpClient.get<[]>(API_PATH+'/clothes/searching/'+searchTerm+'/'+size+'/'+page, httpOptions)
 //  .get<[]>('http://localhost:8080/api/clothes/searching?search=(name:*'+searchTerm+'*) OR brand.name:*'+searchTerm+'* OR category.name:*'+searchTerm+'* OR shop.name:*'+searchTerm+'* OR specialFeatures.name:*'+searchTerm+'*',httpOptions)
 //.get<[]>('http://localhost:8080/api/clothes/searching?search=(name:*'+searchTerm+'*) OR (brand.name:*'+searchTerm+'*) OR (category.name:*'+searchTerm+'*) OR shop.name:*'+searchTerm+'*) OR specialFeatures.name:*'+searchTerm+'*)',httpOptions)
  }

  
  getMatch(searchTerm){
    return this.httpClient.get<[]>(API_PATH+'/search/getMatchs/'+searchTerm, httpOptions)
}
  getSuggestion(searchTerm){
    return this.httpClient.get<[]>(API_PATH+'/search/suggest/'+searchTerm, httpOptions)
  
  }

}
