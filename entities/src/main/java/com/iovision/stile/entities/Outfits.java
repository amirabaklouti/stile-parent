package com.iovision.stile.entities;

import java.io.Serializable;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;




@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "outfits")
public class Outfits implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JsonIgnore
    @JoinColumn(name = "outfitGroup_id")
	OutfitGroup outfitGroup;

	
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="user_id", nullable=false)
	User user;
	
	@ManyToOne
    @JoinColumn(name = "cloth_id", referencedColumnName = "id")
	Cloth cloth;
	
	@ManyToOne
    @JoinColumn(name = "wardrobe_id", referencedColumnName = "id")
	Wardrobe wardrobe;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Cloth getCloth() {
		return cloth;
	}

	public void setCloth(Cloth cloth) {
		this.cloth = cloth;
	}

	public Wardrobe getWardrobe() {
		return wardrobe;
	}

	public void setWardrobe(Wardrobe wardrobe) {
		this.wardrobe = wardrobe;
	}

	public Outfits(User user, Cloth cloth, Wardrobe wardrobe) {
		super();
		
		this.user = user;
		this.cloth = cloth;
		this.wardrobe = wardrobe;
	}

	public Outfits() {
		super();
	}

	public OutfitGroup getOutfitGroup() {
		return outfitGroup;
	}

	public void setOutfitGroup(OutfitGroup outfitGroup) {
		this.outfitGroup = outfitGroup;
	}


	


}
