package com.iovision.stile.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Field;

@Entity
@Table(name = "cloth", schema="public")
public class Cloth implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String name;
	
	
	private float price;
	private float reviewCount;
	private float totalStars;
	private Integer discount;
	private Integer quantity;
	
	

	@ManyToOne
	@JoinColumn(name="brand_id", nullable=false)
	private Brand brand;
	
	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private Category category;
	
	
	@ManyToOne
	@JoinColumn(name="color_id", nullable=false)
	@Field(name = "color")
	private Color color;
	
	
	@ManyToOne
	@JoinColumn(name="shop_id", nullable=false)
	@Field(name = "shop")
	private Shop shop;
	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

	private String imgUri;
	
	@ManyToMany(mappedBy = "favoriteClothes")
    Set<User> users;
	@ManyToMany
	@JoinTable(
			  name = "cloth_feature", 
			  joinColumns = @JoinColumn(name = "cloth_id"), 
			  inverseJoinColumns = @JoinColumn(name = "special_feature_id"))
    Set<SpecialFeature> specialFeatures;
	
	
	public Set<SpecialFeature> getSpecialFeatures() {
		return specialFeatures;
	}

	public void setSpecialFeatures(Set<SpecialFeature> specialFeatures) {
		this.specialFeatures = specialFeatures;
	}

	public Cloth() {
		// TODO Auto-generated constructor stub
	}

	public Cloth(Integer i) {
		this.id=i;
	}

	public Integer getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}
	
	@Column(name="review_count")
	public float getReviewCount() {
		return this.reviewCount;
	}
	@Column(name="total_stars")
	public float getTotalStars() {
		return this.totalStars;
	}
	public Category getCategory() {
		return this.category;
	}
	public Brand getBrand() {
		return this.brand;
	}

	public float getPrice() {
		return this.price;
	}
	@Column(name="img_uri")
	public String getImgUri() {
		return imgUri;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public void setReviewCount(float reviewCount) {
		this.reviewCount = reviewCount;
	}

	public void setTotalStars(float totalStars) {
		this.totalStars = totalStars;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public void setImgUri(String imgUri) {
		this.imgUri = imgUri;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Cloth(String name) {
		super();
		this.name = name;
	}
		
	
	
}
