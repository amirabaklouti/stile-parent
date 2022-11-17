package com.iovision.stile.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.iovision.stile.entities.Image;
import com.iovision.stile.services.ImageService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/images")
public class ImageController {
	@Autowired
	ImageService imageService;

	@GetMapping(value = { "", "/" })
	public Set<Image> findImages() {
		return imageService.findImages();
	}

}
