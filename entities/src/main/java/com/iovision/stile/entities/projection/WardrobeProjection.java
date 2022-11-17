package com.iovision.stile.entities.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.WardrobeGroup;

@Projection(
		  name = "WardrobeProjection", 
		  types = { Wardrobe.class }) 
public interface WardrobeProjection {

@Value("#{target.id}")
Long getId();
	   
@Value("#{target.name}")
	 String getName();

@Value("#{target.item_name}")
String getItemName();

@Value("#{target.type}")
String getType();

@Value("#{target.img_uri}")
   String getPicByte();


@Value("#{target.wardrobe_group_id}")
Long getWardrobeGroup();



}
