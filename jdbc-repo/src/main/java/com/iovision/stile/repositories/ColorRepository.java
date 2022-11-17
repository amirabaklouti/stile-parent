package com.iovision.stile.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {
	@Query("select c from Color c")
	Set<Color> findColors();
}
