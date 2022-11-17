package com.iovision.stile.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Image;
import com.iovision.stile.repositories.ImageRepository;

@Service
public class ImageService {
	@Autowired
	ImageRepository imageRepository;

	public Set<Image> findImages() {
		return imageRepository.findImages();
	}

}