package com.iovision.stile.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.iovision.stile.entities.Color;
import com.iovision.stile.services.ColorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/colors")
public class ColorController {
	@Autowired
	ColorService colorService;

	@GetMapping(value = { "", "/" })
	public Set<Color> findColors() {
		return colorService.findColors();
	}

}
