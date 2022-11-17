package com.iovision.stile.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
	@Query("select i from Image i")
	Set<Image> findImages();
}
