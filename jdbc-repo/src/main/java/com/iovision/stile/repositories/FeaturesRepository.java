package com.iovision.stile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Features;

public interface FeaturesRepository  extends JpaRepository<Features, Long> {

}
