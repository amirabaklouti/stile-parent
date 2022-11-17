package com.iovision.stile.controllers;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.Category;
import com.iovision.stile.services.CategoryService;
import com.iovision.stile.services.ClothService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ClothService clothService;

	@GetMapping(value = { "", "/" })
	public List<Category> getCategories() {
		Set<Category> categories = categoryService.getCategories();
		Map<String, Long> countList = clothService.findCountClothesByCategory();
		List<Category> list = categories.stream().map(category -> {
			category.setCount(countList.get(category.getName()));
			return category;
		}).collect(Collectors.toList());
		return list;
	}

	@GetMapping(value = { "/search/{word}" })
	public Set<Category> searchCategories(@PathVariable String word) {
		return categoryService.searchCategory(word);
	}
}
