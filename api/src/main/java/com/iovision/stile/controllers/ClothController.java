package com.iovision.stile.controllers;

import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.projection.ClothNameProjection;
import com.iovision.stile.repositories.ClothRepository;
import com.iovision.stile.services.ClothService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/clothes")
public class ClothController {

	@Autowired
	private ClothRepository ClothRep;

	@Autowired
	private ClothService clothService;

	@GetMapping(value = "")
	Set<Cloth> getClothes() {
		return clothService.getClothes();
	}

	@GetMapping(value = "/id/{id}")
	Cloth findById(@PathVariable Integer id) {
		return clothService.findById(id);
	}

	@GetMapping(value = "/category/{category}")
	Set<Cloth> findClothesByCategory(@PathVariable Integer category) {
		return clothService.findClothesByCategory(category);
	}

	@GetMapping(value = "/searching/{search}/{size}/{page}")
	public Page<ClothNameProjection> searchingClothes(@PathVariable String search, @PathVariable Integer size,
			@PathVariable Integer page) {

		Pageable pageable = PageRequest.of(page, size);
		return this.ClothRep.findByNameContainingIgnoreCase(search, pageable);
	}

	@GetMapping(value = "/word/{word}/{size}/{page}")
	Page<Cloth> searchClothes(@PathVariable String word, @PathVariable Integer size, @PathVariable Integer page) {

		return clothService.searchClothes(word, size, page);
	}

	// @GetMapping(value ="/searchClothesBywords")
	// void searchClothesBywords(@RequestBody Set<String> items){

	// return clothService.searchClothes(items);
	// }

	@GetMapping(value = "/filter/brands/{brands}")
	public Set<Cloth> findClothesByBrand(@PathVariable ArrayList<String> brands) {
		return clothService.findClothesByBrand(brands);
	}

	@GetMapping(value = "/filter/price/{min},{max}")
	Set<Cloth> findByPriceBetween(@PathVariable float min, @PathVariable float max) {
		return clothService.findByPriceBetween(min, max);
	}

	@GetMapping(value = "/filter/color/{color}")
	Set<Cloth> findByColor(@PathVariable ArrayList<String> color) {
		return clothService.findByColor(color);
	}

	@GetMapping(value = "/count")
	Map<String, Long> findCountClothesByCategory() {
		return clothService.findCountClothesByCategory();
	}

	@GetMapping(value = "/favorites")
	Set<Cloth> findFavoritesByUser() {
		return clothService.findFavoritesByUser();
	}

	@GetMapping(value = "/index/{id}")
	ArrayList<Object> getClothIndex(@PathVariable Integer id) {
		return clothService.getClothIndex(id);
	}

	@GetMapping(value = "/combinedFilter/{brands}/{colors}/{min}/{max}/{discount}")
	Set<Cloth> filterClothes(@PathVariable ArrayList<String> brands, @PathVariable ArrayList<String> colors,
			@PathVariable float min, @PathVariable float max, @PathVariable boolean discount) {
		return clothService.filterClothes(brands, colors, min, max, discount);
	}

	@GetMapping(value = "/image/{cat}/{color}")
	Set<Cloth> imageSearch(@PathVariable String cat, @PathVariable String color) {
		return clothService.imageSearch(cat, color);
	}

	@GetMapping(value = "/getClothesByCategoryId/{id}")
	Set<Cloth> getClothesByCategoryId(@PathVariable Integer id) {
		return clothService.getClothesByCategoryId(id);
	}

}
