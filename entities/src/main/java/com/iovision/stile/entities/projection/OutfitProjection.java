package com.iovision.stile.entities.projection;

import org.springframework.data.rest.core.config.Projection;

import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.Outfits;
import com.iovision.stile.entities.Wardrobe;

@Projection(
		  name = "OutfitProjection", 
		  types = { Outfits.class }) 
public interface OutfitProjection {
	
	Long getId();
	
	Cloth getCloth();

	Wardrobe getWardrobe();

}
