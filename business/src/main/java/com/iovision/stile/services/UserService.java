package com.iovision.stile.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartException;

import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.projection.UserImgProjection;
import com.iovision.stile.entities.projection.UserProjection;
import com.iovision.stile.repositories.ClothRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	ClothRepository clothRepository;

	// Set<Cloth> findFavoriteClothes(){
	// return userRepository.findFavoriteClothes();
	// };
	public void addToFavorites(Integer id) {
		com.iovision.stile.services.security.services.UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(c.getUsername()).get();
		Set<Cloth> clothes = clothRepository.findByUsers(user);
		clothes.add(new Cloth(id));
		user.setFavoriteClothes(clothes);
		// userService.findFavoriteClothes().add(clothRepository.findById(id));
		userRepository.save(user);
		System.out.println(c);
	}

	public void removeFromFavorites(Integer id) {
		com.iovision.stile.services.security.services.UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(c.getUsername()).get();
		Set<Cloth> clothes = clothRepository.findByUsers(user);
		clothes.remove(clothRepository.findById(id));
		user.setFavoriteClothes(clothes);
		userRepository.save(user);

	}

	public boolean checkFavoriteStatus(Integer id) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(c.getUsername()).get();
		Set<Cloth> clothes = clothRepository.findByUsers(user);
		return clothes.contains(clothRepository.findById(id));

	}

	public boolean checkUserFirstLogin(Long Id) {
		// UserDetailsImpl c = (UserDetailsImpl)
		// SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(Id).get();
		Boolean check = userRepository.checkFirstLogin(user.getId());
		return check;
	}

	public void firstLoginSeen() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(c.getUsername()).get();
		user.setFirstLogin(true);
		userRepository.save(user);
	}

	public void setUser(String phone, String email, String birthDate, String gender, String imgUri)
			throws ParseException, MultipartException {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findById(c.getId()).get();

		if (!imgUri.equals("undefined")) {
			user.setProfileImg(imgUri);
		}

		if (!phone.equals(null)) {
			if (user.getPhone() != phone) {
				user.setPhone(phone);
			}
		}

		if (!email.equals(null)) {
			if (user.getEmail() != email) {
				user.setEmail(email);
			}
		}
		if (!birthDate.equals(null) || !birthDate.equals("Invalid date")) {
			Date date = new SimpleDateFormat("dd/MM/yyyy").parse(birthDate);
			user.setBirthDate(date);
		}
		if (!gender.equals(null)) {
			if (user.getSexe() != gender) {
				user.setSexe(gender);
			}
		}

		userRepository.save(user);
	}

	public UserImgProjection getUserImg() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userRepository.findUserImgByIdProjection(c.getId()).get();
	}

	public UserProjection getUser() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userRepository.findByIdProjection(c.getId()).get();

	}

}
