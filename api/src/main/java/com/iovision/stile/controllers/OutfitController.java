package com.iovision.stile.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.OutfitGroup;
import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.projection.OutfitGroupProjection;
import com.iovision.stile.entities.projection.OutfitProjection;
import com.iovision.stile.services.payload.response.MessageResponse;
import com.iovision.stile.services.OutfitService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/outfits")
public class OutfitController {
	@Autowired
	OutfitService outfitService;

	/*
	 * @GetMapping(value = {"/all" }) public Set<Outfit> findOutfits() { return
	 * outfitService.findOutfitsByUser(); }
	 * 
	 * @PostMapping(value="/add/{topId}/{bottomId}/{footwearId}") public void
	 * addOutfit(@PathVariable Integer topId, @PathVariable Integer
	 * bottomId, @PathVariable Integer footwearId) {
	 * outfitService.addOutfit(topId,bottomId,footwearId); }
	 * 
	 * @PostMapping(value="/remove/{id}") public void addOutfit(@PathVariable Long
	 * id) { outfitService.removeOutfit(id); }
	 */

	@GetMapping(value = { "/getNotJoinedWardrobesByUser" })
	public Set<Wardrobe> getNotJoinedWardrobesByUser() {
		return outfitService.getNotJoinedWardrobesByUser();

	}

	@GetMapping(value = { "/getWardrobesUsedInOutfitsByUser/{wardrobeId}" })
	public Boolean getWardrobesUsedInOutfitsByUser(@PathVariable Long wardrobeId) {
		return outfitService.getWardrobesUsedInOutfitsByUser(wardrobeId);

	}

	@GetMapping(value = { "/getAllUsersOutfits" })
	public List<OutfitGroup> getAllUsersOutfits() {
		return outfitService.getAllUsersOutfits();

	}

	@GetMapping(value = { "/getOutfitsByUser" })
	public List<OutfitGroupProjection> getOutfitsByUser() {
		return outfitService.getOutfitsByUser();

	}

	@GetMapping(value = { "/getOutfitItemsById/{id}" })
	public List<OutfitProjection> getOutfitItemsById(@PathVariable Long id) {
		return outfitService.getOutfitItemsById(id);

	}

	@GetMapping(value = { "/findOutfitsByUserId" })
	public Set<OutfitGroup> findOutfitsByUserId() {
		return outfitService.findOutfitsByUserId();

	}

	@PostMapping(value = "/add")
	public void addOutfit(@RequestBody Object[] Items) {
		outfitService.addOutfit(Items);
	}

	@PostMapping(value = "/deleteOutfit")
	public void deleteOutfit(@RequestBody Long id) {
		outfitService.deleteOutfit(id);
	}

	@PostMapping(value = "/modifyOutfitName/{id}/{name}")
	public ResponseEntity<?> modifyOutfitName(@PathVariable Long id, @PathVariable String name) {
		outfitService.modifyOutfitName(name, id);
		return ResponseEntity.ok(new MessageResponse("outfit s name changed successfully!"));
	}

	@PostMapping(value = "/modifyOutfitItems/{outfitId}")
	public ResponseEntity<?> modifyOutfitItems(@PathVariable Long outfitId, @RequestBody Object[] Items) {
		outfitService.modifyOutfitItems(Items, outfitId);
		return ResponseEntity.ok(new MessageResponse("outfit s items changed successfully!"));
	}

}
