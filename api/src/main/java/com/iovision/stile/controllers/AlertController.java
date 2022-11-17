package com.iovision.stile.controllers;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.dto.AlertUserDto;
import com.iovision.stile.services.AlertService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/alerts")
public class AlertController {
	@Autowired
	AlertService alertService;

	@GetMapping(value = { "" })
	public Collection<AlertUserDto> getAlertsByUser() {
		return alertService.getAlertsByUser();
	}

	@GetMapping(value = { "/notif" })
	public void sendNotification() {
		alertService.sendNotification();
	}

	@PostMapping("/update/{alertId}")
	public void updateAlertStatus(@PathVariable List<Long> alertId) {
		alertService.updateAlertStatus(alertId);
	}

}
