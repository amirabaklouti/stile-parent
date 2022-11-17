import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild ,OnDestroy } from '@angular/core';
import { AlertController, IonAccordion, IonAccordionGroup, ModalController } from '@ionic/angular';
import { CollectionService } from '../_services/collection.service';
import { ToastController } from '@ionic/angular';
import { Components, ViewController } from '@ionic/core';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit , OnDestroy {
  collection =[]
  collectionCategory =[]
  selectedPath = '';
  values: string[] 
  items = []
  isModalOpen = false;
  isModifyModalOpen = false;
  inputCollections
  collectionGroup=[]
  detectedGroup
  modify=false
  itemToDelete
  itemToModify
  addGroupModal =false
  //@ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  checkDismiss = false;
  message:string;

  
  groupName
  newGroupName

  returnActive = 0
  back = false

  constructor(private router : Router , private alertController :AlertController,private toastController :ToastController,private modalctrl :ModalController,private collectionService : CollectionService ,private render:Renderer2) {

  }
  ngOnDestroy(): void {
  }


  async getCollection() {
  await this.collectionService.getCollectionGroupByUser().subscribe((data:any)=> {
    this.collectionGroup = []
    for(let i = 0;i<data.length;i++) { 
      this.collectionGroup = [...this.collectionGroup, data[i]]; 
    }
    localStorage.setItem('collection',JSON.stringify(this.collectionGroup))
  });
  
  }
 /* ngAfterContentChecked(){
    console.log("aaaa")
  }*/
  getCategoryItem(category){
    this.items=[]
    for (let i = 0; i < this.collection.length; i++){
      if(this.collection[i].category.name===category){
        if(this.items.includes(this.collection[i].category.name)){}
        else{
          this.items.push(this.collection[i]) 
        }
      console.log( this.items)  
      }
    }
  }


  ionViewWillEnter(){
      this.collection =[]
      if(localStorage.getItem('collections')){
        this.collectionGroup = JSON.parse(localStorage.getItem('collections'))
      }else{
        this.getCollection();
      }
    }

  ngOnInit() {
   /* if(this.back == true){
      this.returnActive = 1
    }else{
      this.returnActive = 0
    }*/
}



receiveMessage($event) {
  this.message = $event
}

/*toggleAccordion = (ev: any) => {
  const nativeEl = this.accordionGroup;
  if (nativeEl.value ===  ev.detail.value) {
    nativeEl.value = undefined;
  } else {
    nativeEl.value =  ev.detail.value;;
  }
};*/

  async dismiss(){
this.modalctrl.dismiss().then(async () => {
  await this.getCollection();
  });
}


deleteGroup(id,name){
  this.presentWillDelete(id,name)
}

async presentWillDelete(id,name){
  let alert = await this.alertController.create({
    message: 'are you sure to delete ' + name + ' ?',
    mode:"ios",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: () => {
          this.collectionService.deleteCollectionGroup(id,name).toPromise().then(async () => {
            await this.getCollection();
            });
        }
        
    }
    ]  
  });
  alert.present();
}

modifyChange(group){
  this.detectedGroup=group
  this.modify=true
}
closeModifyChange(){
  this.modify=false
}
modifyGroupName(id,oldName,newName){
 this.collectionService.modifyCollectionGroupName(id,oldName,newName).toPromise().then(async () => {
  await this.getCollection();
  });
this.modalGroupNamechanged(oldName,newName);
this.modify=false
this.newGroupName = ''

}
async modalGroupNamechanged(oldName,newName){
  const toast = await this.toastController.create({
    message: oldName+' is changed to ' + newName  ,
    duration: 2000,
    mode :"ios",
  });
  toast.present();

}

showModal(){
  this.addGroupModal=true
}
closeAddChange(){
  this.addGroupModal=false
}
setOpen(isOpen: boolean,id) {
  if (isOpen=true) {
    this.isModalOpen = isOpen;

  }
  
   this.itemToDelete = this.collectionGroup.find(t=>t.id == id);
}
deleteCloth(id,name){
  this.itemWillDelete(id,name)
  
  //  const clothToDeleteFromGroup = new FormData();
  //  clothToDeleteFromGroup.append("clothToDeleteFromGroup",id.name);
  //  this.wardrobeService.deleteClothFromGroup(item.id);
  }
  
  async itemWillDelete(id,name){
    let alert = await this.alertController.create({
      message: 'are you sure to delete ' + name + ' ?',
      mode:"ios",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
             var el = document.getElementById(id);
             el.remove();
            this.collectionService.deleteItemFromCollection(id).toPromise().then(async () => {
              await this.getCollection();
              });
          }
          
      }
      ]  
    });
    alert.present();
  }

dismissModal(){
  this.isModalOpen =false
  this.modalctrl.dismiss().then(async () => {
    await this.getCollection();
    });
}

  async addGroup(name){
 await this.collectionService.addCollectionGroup(name).toPromise().then(async () => {
  await this.getCollection();
  });
  this.addGroupModal = false
  this.groupName = ''
}


setModifyOpen(id) {
 let isOpen: boolean
  if (isOpen=true) {
    this.isModifyModalOpen = isOpen;
  }
  this.itemToModify = this.collectionGroup.find(t=>t.id == id);
 
}

  dismissModifyModal(){
    this.isModifyModalOpen =false
    this.modalctrl.dismiss().then(async () => {
      await this.getCollection();
      });
  }

  async OpenModifyModal(collection,collectionId){
   
    this.createCollectionInputs();
    let alert =  this.alertController.create({
      message: 'Your item is in '+ collection.collectionName + " . would you change its collection ?" ,
      mode:"ios",
      inputs:  this.inputCollections,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {  
            if(data!==-1){
              this.collectionService.changeItemCollection(data,collectionId).subscribe()
  
           }
           if(data == -1){
            this.addNewCollection(collectionId);
          
           } 
  
        }
      }
      ]
      
    });
     (await alert).present(); 
  }

  createCollectionInputs() {
    const theNewInputs = [];
     for (let i = 0; i < this.collectionGroup.length; i++) {
       
      if(this.itemToModify.id !== this.collectionGroup[i].id){
       theNewInputs.push(
         {
           type: 'radio',
           label: this.collectionGroup[i].collectionName,
           value: this.collectionGroup[i].id,
         }
       );
     }}
     theNewInputs.push(
       {
         type: 'radio',
         label: '+ Add new Collection ',
         value: -1,
       });
     this.inputCollections =  theNewInputs;
   }


   async addNewCollection(collectionId){
   
    const alert = await this.alertController.create({
    message: 'Please enter your Collection Name',
    mode:'ios',
    inputs: [
      {
        name: 'name',
        placeholder: 'Collection name...',
        type: 'textarea',

      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data) => {
          this.collectionService.changeItemToNewCollection(data.name,collectionId).subscribe()

        }
      }
      ]
  });
   await alert.present();
}



}