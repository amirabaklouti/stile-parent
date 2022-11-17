package com.iovision.stile.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.dto.clothDTO;
import com.iovision.stile.services.ElasticSearchService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/search")
public class ElasticSearchController {

	@Autowired
	private ElasticSearchService elasticSearchService;

	@GetMapping(value = "/getMatchs/{word}")
	public Iterable<clothDTO> searchingClothes(@PathVariable String word) {
		return elasticSearchService.processSearch(word);

	}

	@GetMapping(value = "/suggest/{word}")
	public List<String> suggest(@PathVariable String word) throws IOException {
		return elasticSearchService.fetchSuggestions(word);
	}
}
