import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cloth } from '../model/cloth';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;
const AI_PATH= environment.AiPath;

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Credentials' : 'true' ,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})
};

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {





  constructor(private httpClient:HttpClient) { }

  getClothesByGroupId(wardrobe_group_id: any) {
    return this.httpClient
    .get(API_PATH+'/wardrobeGroups/ClothesByGroup/'+wardrobe_group_id,httpOptions)

  }

  
  /*deleteClothFromAi(img){
    return this.httpClient.post(AI_PATH,img,httpOptions)
  }*/

  sendFile(file) {
    const httpOptions2 = {
      headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'responseType' : 'text',
      'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT',
    })
    };
    return  this.httpClient.post(AI_PATH+'/detect',file,{ observe: 'response' }).toPromise()
     
  }

  deleteClothFromGroup(id){
    return this.httpClient
    .post(API_PATH+'/wardrobeGroups/deleteClothFromGroup/'+id,httpOptions)
    .toPromise();
  }

  deleteClothFromGroupUsedOutfits(id) {
    return this.httpClient
    .post(API_PATH+'/wardrobeGroups/deleteClothFromGroupUsedOutfits/'+id,httpOptions)
    .toPromise();
  }



  sendImage(uploadImageData) 
    {
    return this.httpClient.post(API_PATH+'/wardrobeGroups/upload',uploadImageData,{ observe: 'response' })
     }

     uploadByCamera(uploadImageData) 
     {
     return this.httpClient.post(API_PATH+'/wardrobeGroups/uploadByCamera',uploadImageData,{ observe: 'response' })
      }

      editWardrobe(uploadImageData) {
        return this.httpClient.post(API_PATH+'/wardrobeGroups/editWardrobe',uploadImageData,{ observe: 'response' })
      }


     uploadWardrobe(uploadImageData) 
     {
     return this.httpClient.post(API_PATH+'/wardrobeGroups/uploadWardrobe',uploadImageData,{ observe: 'response' })
      }



  addImageWardrobeGroup(parent,imgUri,imgName){
  return this.httpClient
  .post<any[]>(API_PATH+'/wardrobe/'+parent+'/'+imgUri+'/'+imgName,httpOptions)
  .toPromise();
}

  modifyGroupName(oldName,newName) {
    return this.httpClient
    .post(API_PATH+'/wardrobeGroups/modifyGroupName/'+oldName+'/'+newName ,null, httpOptions);
  }

  checkGroupes() {
    return this.httpClient
    .get(API_PATH+'/wardrobeGroups/check',httpOptions)

  }

  deleteGroupe(groupId) {
    return this.httpClient
    .post(API_PATH+'/wardrobeGroups/deleteGroup/'+groupId,httpOptions)
    .toPromise();
  }
  
  addGroupWardrobe(groupName): Promise<Object>{
    return this.httpClient
      .post(API_PATH+'/wardrobeGroups/add/'+groupName,httpOptions)
      .toPromise();
  }

  removeFromCollection(id){
    return this.httpClient
      .post<Object>(API_PATH+'/wardrobeGroups/remove/'+"aaa",httpOptions)
   
  }




}
