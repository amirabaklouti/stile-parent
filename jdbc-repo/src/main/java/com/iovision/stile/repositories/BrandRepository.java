package com.iovision.stile.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
	@Query("select b from Brand b")
	Set<Brand> getBrands();

	Set<Brand> findById(Integer id);

	Set<Brand> findByName(String name);

}
