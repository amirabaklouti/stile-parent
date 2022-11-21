package com.iovision.stile.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "outfitgroup")
public class OutfitGroup {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
	User user;

	   @OneToMany(mappedBy="outfitGroup",fetch = FetchType.LAZY)
	   @OnDelete(action = OnDeleteAction.CASCADE)
	   private Set<Outfits> outfits;
	
	   
		private String name ;
		
		@JoinColumn(name="outfit_img")
		private String outfitImg ;
		
		
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

	public Set<Outfits> getOutfits() {
		return outfits;
	}

	public void setOutfits(Set<Outfits> outfits) {
		this.outfits = outfits;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public String getOutfitImg() {
		return outfitImg;
	}

	public void setOutfitImg(String outfitImg) {
		this.outfitImg = outfitImg;
	}

	public OutfitGroup(User user, Set<Outfits> outfits, String name,String outfitImg) {
		super();
		this.outfitImg = outfitImg;
		this.user = user;
		this.outfits = outfits;
		this.name = name;
	}

	public OutfitGroup() {
		super();
	}
	
	
	
	
	
}
