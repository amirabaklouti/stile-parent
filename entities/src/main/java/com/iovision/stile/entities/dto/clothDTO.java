package com.iovision.stile.entities.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "database")
public class clothDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Field(type = FieldType.Search_As_You_Type , name = "name" ,maxShingleSize = 3)
	private String name;
	
	@Field(type = FieldType.Search_As_You_Type , name = "brandname" ,maxShingleSize = 3)
	private String brandname;
	
	@Field(type = FieldType.Search_As_You_Type , name = "categoryname" ,maxShingleSize = 3)
	private String categoryname;
	
	@Field(type = FieldType.Search_As_You_Type , name = "colorname" ,maxShingleSize = 2)
	private String colorname;
	
	@Field(type = FieldType.Search_As_You_Type , name = "shopname" ,maxShingleSize = 2)
	private String shopname;
	
	@Field(type = FieldType.Float , name = "price")
	private float price;
	
	@Field(type = FieldType.Float , name = "reviewcount")
	private float reviewCount;
	
	@Field(type = FieldType.Float , name = "totalstars")
	private float totalStars;
	
	
	@Field(name = "img_uri")
	private String imgUri;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBrandname() {
		return brandname;
	}

	public void setBrandname(String brandname) {
		this.brandname = brandname;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}

	public String getColorname() {
		return colorname;
	}

	public void setColorname(String colorname) {
		this.colorname = colorname;
	}

	public String getShopname() {
		return shopname;
	}

	public void setShopname(String shopname) {
		this.shopname = shopname;
	}

	public String getImgUri() {
		return imgUri;
	}

	public void setImgUri(String imgUri) {
		this.imgUri = imgUri;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getReviewCount() {
		return reviewCount;
	}

	public void setReviewCount(float reviewCount) {
		this.reviewCount = reviewCount;
	}

	public float getTotalStars() {
		return totalStars;
	}

	public void setTotalStars(float totalStars) {
		this.totalStars = totalStars;
	}

	public clothDTO() {
		super();
	}
	
	
	
	
}
