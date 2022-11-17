package com.iovision.stile.entities.dto;

import javax.persistence.Entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import com.iovision.stile.entities.WardrobeGroup;

@Projection(
		  name = "WardrobeGroupDTO", 
		  types = { WardrobeGroup.class }) 
public interface WardrobeGroupDTO {
   
	
   @Value("#{target.id}")
   Long getId();
   
   @Value("#{target.group_name}")
   String getGroupName();

	
}
