package com.iovision.stile.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Color;
import com.iovision.stile.repositories.ColorRepository;

@Service
public class ColorService {
	@Autowired
	ColorRepository colorRepository;

	public Set<Color> findColors() {
		return colorRepository.findColors();
	}

}
