package com.iovision.stile.entities.projection;

import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.iovision.stile.entities.AlertUser;
import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.Collection;
import com.iovision.stile.entities.CollectionGroup;
import com.iovision.stile.entities.Outfits;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.WardrobeGroup;

@Projection(
		  name = "UserProjection", 
		  types = { User.class }) 
public interface UserProjection {

	
	   @Value("#{target.id}")
	   Long getId();
	   
	   @Value("#{target.username}")
	   String getUsername();

	   @Value("#{target.email}")	
	   String getEmail();

	   @Value("#{target.profileImg}")	
	   String getProfileImg();
	   
	   @Value("#{target.phone}")	 
	   String getPhone();
	   
	   @Value("#{target.birthDate}")	
	   Date getBirthDate();

	   @Value("#{target.Sexe}")	
	   String getSexe();

		 


}
