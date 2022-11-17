package com.iovision.stile.entities.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.iovision.stile.entities.Cloth;



@Projection(
		  name = "ClothNameProjection", 
		  types = { Cloth.class }) 

public interface ClothNameProjection {
	
	
	@Value("#{target.name}")
	String getName();


}
