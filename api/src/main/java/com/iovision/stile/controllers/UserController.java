package com.iovision.stile.controllers;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iovision.stile.entities.projection.UserImgProjection;
import com.iovision.stile.entities.projection.UserProjection;
import com.iovision.stile.services.payload.response.MessageResponse;
import com.iovision.stile.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping(value = "/favorites/{id}")
	public ResponseEntity<?> addToFavorites(@PathVariable Integer id) {
		userService.addToFavorites(id);
		return ResponseEntity.ok(new MessageResponse("favorite added successfully!"));
	}

	@PostMapping(value = "/favorites/remove/{id}")
	ResponseEntity<?> removeFromFavorites(@PathVariable Integer id) {
		userService.removeFromFavorites(id);
		return ResponseEntity.ok(new MessageResponse("favorite removed successfully!"));

	}

	@PostMapping(value = "/favorites/status/{id}")
	boolean checkFavoriteStatus(@PathVariable Integer id) {
		return userService.checkFavoriteStatus(id);

	}

	@GetMapping(value = "/checkUserFirstLogin/{id}")
	boolean checkUserFirstLogin(@PathVariable Long id) {
		return userService.checkUserFirstLogin(id);

	}

	@GetMapping(value = "/firstLoginSeen")
	boolean firstLoginSeen() {
		this.userService.firstLoginSeen();
		return true;
	}

	@GetMapping(value = "/getUser")
	UserProjection getUser() {
		return this.userService.getUser();
	}

	@GetMapping(value = "/getUserImg")
	UserImgProjection getUserImg() {
		return this.userService.getUserImg();
	}

	@PostMapping(value = "/setUser/")
	ResponseEntity<?> setUser(@RequestParam("phone") String phone, @RequestParam("email") String email,
			@RequestParam("birthDate") String birthDate, @RequestParam("gender") String gender,
			@RequestParam("imgUri") String imgUri) throws ParseException {
		userService.setUser(phone, email, birthDate, gender, imgUri);
		return ResponseEntity.ok(new MessageResponse("profile updated successfully!"));

	}

}
