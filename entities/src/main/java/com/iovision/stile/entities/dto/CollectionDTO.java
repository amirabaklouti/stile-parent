package com.iovision.stile.entities.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;





public class CollectionDTO {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	Integer cloth;
	
	Long collectionGroup;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCloth() {
		return cloth;
	}

	public void setCloth(Integer cloth) {
		this.cloth = cloth;
	}

	public Long getCollectionGroup() {
		return collectionGroup;
	}

	public void setCollectionGroup(Long collectionGroup) {
		this.collectionGroup = collectionGroup;
	}

	public CollectionDTO(Integer cloth, Long collectionGroup) {
		super();
		this.cloth = cloth;
		this.collectionGroup = collectionGroup;
	}

	public CollectionDTO() {
		super();
	}
	
	
	
	
}
