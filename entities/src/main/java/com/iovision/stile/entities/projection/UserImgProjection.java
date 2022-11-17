package com.iovision.stile.entities.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.iovision.stile.entities.User;

@Projection(
		  name = "UserImgProjection", 
		  types = { User.class }) 
public interface UserImgProjection {

	   @Value("#{target.username}")
	   String getUsername();
	   
	   @Value("#{target.profileImg}")	
	   String getProfileImg();
}
