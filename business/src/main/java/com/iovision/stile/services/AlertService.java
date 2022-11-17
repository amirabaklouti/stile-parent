package com.iovision.stile.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.iovision.stile.entities.Alert;
import com.iovision.stile.entities.AlertUser;
import com.iovision.stile.entities.AlertUserId;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.dto.AlertUserDto;
import com.iovision.stile.repositories.AlertRepository;
import com.iovision.stile.repositories.AlertUserRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;

@Service
public class AlertService {
	@Autowired
	AlertRepository alertRepository;
	@Autowired
	AlertUserRepository alertUserRepository;
	@Autowired
	UserRepository userRepository;
	public void sendNotification() {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	User user = userRepository.findByUsername(c.getUsername()).get();
		ArrayList<String> alertMsgs= new ArrayList<String>();
		alertMsgs.add("Enjoying your shopping experience? Use the code STILESALE for a 50% off on your next purchase from any of our partners!");
		alertMsgs.add("Notice! Sale is starting on the 1st of June!");
		alertMsgs.add("Loving the spring breeze? it's the perfect time for Channel's spring dresses.");
		alertMsgs.add("Zara has launched a new shirts collection. Check it out!");
		alertMsgs.add("Near any Lacoste shop? Huge sales up until Friday!");
		alertMsgs.add("Not sure what to pair your new skirt with? Start creating outfits now!");
		alertMsgs.add("BIG NEWS! The prada shoes on your wishlist are back to stock!");
		int rnd = new Random().nextInt(alertMsgs.size());
		Alert alert = new Alert();
		alert.setMsg(alertMsgs.get(rnd));
		alert.setDate(new Date());
		alertRepository.save(alert);
		AlertUser alertUser = new AlertUser();
		AlertUserId id= new AlertUserId();
		id.setAlertId(alert.getId());
		id.setUserId(user.getId());
		alertUser.setId(id);
		alertUser.setRead(false);
		alertUserRepository.save(alertUser);
		System.out.println("alert sent");
	}
	
	public Collection<AlertUserDto> getAlertsByUser(){
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	User user = userRepository.findByUsername(c.getUsername()).get();
		return alertUserRepository.getAlertsByUser(user);
	}
	
	public void updateAlertStatus(List<Long> alertId) {
		UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	User user = userRepository.findByUsername(c.getUsername()).get();
    	List<AlertUserId> list = alertId.stream().map(alert -> {
    		AlertUserId alertUserId=new AlertUserId();
        	alertUserId.setAlertId(alert);
        	alertUserId.setUserId(user.getId());
        	return alertUserId;
    	}).collect(Collectors.toList());
    
    	alertUserRepository.updateAlertStatus(list);
	}
}
