package com.iovision.stile.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.iovision.stile.entities.Brand;
import com.iovision.stile.services.BrandService;

@CrossOrigin(origins = "*")
@RestController
public class BrandController {
	@Autowired
	private BrandService brandService;

	@RequestMapping("/api/brands")
	@GetMapping(value = { "", "/" })
	public Set<Brand> getBrands() {
		return brandService.getBrands();
	}
}
