package com.iovision.stile.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "wardrobe")
public class Wardrobe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Integer id;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name="wardrobeGroup_id")
	WardrobeGroup wardrobeGroup;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "color")
	private String color;
	

	@Column(name = "brand")
	private String brand;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "size")
	private String size;
	

	@Column(name = "itemName")
	private String itemName;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "fabric")
	private String fabric;
	
	@Column(name = "imgUri")
	private String imgUri;

    @OneToMany(mappedBy = "wardrobe")
    private Set<Features> features;
	
	@OneToMany(mappedBy="wardrobe")
    private Set<Outfits> outfits;
	
	

	
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	

	public String getFabric() {
		return fabric;
	}

	public void setFabric(String fabric) {
		this.fabric = fabric;
	}

	public Set<Features> getFeatures() {
		return features;
	}

	public void setFeatures(Set<Features> features) {
		this.features = features;
	}

	public WardrobeGroup getWardrobeGroup() {
		return wardrobeGroup;
	}

	public void setWardrobeGroup(WardrobeGroup wardrobeGroup) {
		this.wardrobeGroup = wardrobeGroup;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/*public String getPicByte() {
		return imgUri;
	}

	public void setPicByte(String picByte) {
		this.imgUri = picByte;
	}*/

	public Wardrobe(WardrobeGroup wardrobeGroup, String name, String itemName, String type, String imgUri) {
		super();
		this.wardrobeGroup = wardrobeGroup;
		this.name = name;
		this.itemName = itemName;
		this.type = type;
		this.imgUri = imgUri;
	}
	
	public Wardrobe(WardrobeGroup wardrobeGroup, String type, String imgUri) {
		super();
		this.wardrobeGroup = wardrobeGroup;
		this.type = type;
		this.imgUri = imgUri;
	}
	
	public Wardrobe(String type, String imgUri) {
		this.type = type;
		this.imgUri = imgUri;
	}

	public Wardrobe() {
		super();
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getImgUri() {
		return imgUri;
	}

	public void setImgUri(String imgUri) {
		this.imgUri = imgUri;
	}

	public Wardrobe(WardrobeGroup wardrobeGroup, String name, String color, String brand, String category, String size,
			String fabric, String type, String imgUri) {
		super();
		this.wardrobeGroup = wardrobeGroup;
		this.name = name;
		this.color = color;
		this.brand = brand;
		this.category = category;
		this.size = size;
		this.fabric = fabric;
		this.type = type;
		this.imgUri = imgUri;
	}


	
	
	
	
	

	
	
	
}
