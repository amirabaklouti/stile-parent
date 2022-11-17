package com.iovision.stile.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Brand;
import com.iovision.stile.repositories.BrandRepository;

@Service
public class BrandService {
	@Autowired
	BrandRepository brandRepository;
	public Set<Brand> getBrands() {
		return brandRepository.getBrands();
	}
}
