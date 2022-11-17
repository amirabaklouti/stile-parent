package com.iovision.stile.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Category;
import com.iovision.stile.repositories.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;
	public Set<Category> getCategories() {
		return categoryRepository.getCategories();
	}
	public Set<Category> searchCategory(String word){
		return categoryRepository.searchCategory(word);
	}
}
