package com.iovision.stile.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.iovision.stile.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	@Query("select c from Category c")
	Set<Category> getCategories();

	List<Category> findByNameStartingWith(String character);

	Set<Category> findById(Integer id);

	Set<Category> findByName(String name);

	@Query("select c from Category c where lower(c.name) like %:word% ")
	Set<Category> searchCategory(String word);
}
