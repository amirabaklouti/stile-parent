package com.iovision.stile.entities.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


import com.iovision.stile.entities.OutfitGroup;


@Projection(
		  name = "OutfitGroupProjection", 
		  types = { OutfitGroup.class }) 
public interface OutfitGroupProjection {
	
	@Value("#{target.id}")
	Long getId();
	
	@Value("#{target.name}")
	String getName();
	
	@Value("#{target.outfitImg}")
	String getOutfitImg();


}
