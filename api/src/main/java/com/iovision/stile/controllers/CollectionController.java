package com.iovision.stile.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.Collection;
import com.iovision.stile.entities.CollectionGroup;
import com.iovision.stile.services.payload.response.MessageResponse;
import com.iovision.stile.services.CollectionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class CollectionController {

	@Autowired
	private CollectionService CollectionService;

	@GetMapping(value = "/getCollectionGroupByUser")
	public Set<CollectionGroup> getCollectionGroupByUser() {
		return CollectionService.getCollectionGroupByUser();
	}

	@PostMapping(value = "/addItemToCollection/{id}/{clothId}")
	public ResponseEntity<?> addItemToCollection(@PathVariable Long id, @PathVariable Integer clothId) {
		CollectionService.addItemToCollection(id, clothId);
		return ResponseEntity.ok(new MessageResponse("item added successfully!"));
	}

	@PostMapping(value = "/addCollectionGroupWithItem/{name}/{clothId}")
	public ResponseEntity<?> addCollectionGroupWithItem(@PathVariable String name, @PathVariable Integer clothId) {
		CollectionService.addCollectionGroupWithItem(name, clothId);
		return ResponseEntity.ok(new MessageResponse("item added successfully!"));
	}

	@GetMapping(value = "/checkItemExist/{clothId}")
	public Set<Collection> checkItemExist(@PathVariable Integer clothId) {
		Set<Collection> aa = CollectionService.checkItemExist(clothId);
		return aa;
	}

	@PostMapping(value = "/deleteItemFromCollection/{clothId}")
	public ResponseEntity<?> deleteItemFromCollection(@PathVariable Integer clothId) {
		CollectionService.deleteItemFromCollection(clothId);
		return ResponseEntity.ok(new MessageResponse("item removed !"));
	}

	@PostMapping(value = "/deleteCollectionGroup/{id}/{name}")
	public ResponseEntity<?> deleteCollectionGroup(@PathVariable Long id, @PathVariable String name) {
		CollectionService.deleteCollectionGroup(id, name);
		return ResponseEntity.ok(new MessageResponse("group removed !"));
	}

	@PostMapping(value = "/modifyCollectionGroupName/{id}/{oldName}/{newName}")
	public ResponseEntity<?> modifyCollectionGroupName(@PathVariable Long id, @PathVariable String oldName,
			@PathVariable String newName) {
		CollectionService.modifyCollectionGroupName(id, oldName, newName);
		return ResponseEntity.ok(new MessageResponse("group name modified !"));
	}

	@PostMapping(value = "/addCollectionGroup/{name}")
	public ResponseEntity<?> addCollectionGroup(@PathVariable String name) {
		CollectionService.addCollectionGroup(name);
		return ResponseEntity.ok(new MessageResponse("collection group added !"));
	}

	@PostMapping(value = "/changeItemCollection/{id}/{collectionId}")
	public ResponseEntity<?> changeItemCollection(@PathVariable Long id, @PathVariable Long collectionId) {
		CollectionService.changeItemCollection(id, collectionId);
		return ResponseEntity.ok(new MessageResponse("item group changed !"));
	}

	@PostMapping(value = "/changeItemToNewCollection/{name}/{collectionId}")
	public ResponseEntity<?> changeItemToNewCollection(@PathVariable String name, @PathVariable Long collectionId) {
		CollectionService.changeItemToNewCollection(name, collectionId);
		return ResponseEntity.ok(new MessageResponse("item added to new collection group !"));
	}

	/*
	 * @GetMapping(value="/setItem/{userId}/{clothId}") public void
	 * setItem(@PathVariable User userId, @PathVariable Cloth clothId){
	 * CollectionService.setItem(userId,clothId); }
	 */
	/*
	 * @PostMapping(value = "/collection/{id}") public ResponseEntity<?>
	 * addToCollections(@PathVariable Integer id) {
	 * CollectionService.addToCollections(id); return ResponseEntity.ok(new
	 * MessageResponse("Collection added successfully!")); }
	 * 
	 * @PostMapping(value= "/collection/remove/{id}") ResponseEntity<?>
	 * removeFromCollections(@PathVariable Integer id) {
	 * CollectionService.removeFromCollections(id); return ResponseEntity.ok(new
	 * MessageResponse("Collection removed successfully!"));
	 * 
	 * }
	 * 
	 * @PostMapping(value= "/collection/status/{id}") boolean
	 * checkFavoriteStatus(@PathVariable Integer id) { return
	 * CollectionService.checkCollectionsStatus(id);
	 * 
	 * }
	 * 
	 * @GetMapping(value="/collection/allByUser") Set<Cloth> findFavoritesByUser(){
	 * return CollectionService.findCollectionByUser(); }
	 */
}
