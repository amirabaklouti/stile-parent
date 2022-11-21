package com.iovision.stile.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String email;
	
	@JsonIgnore
	private String password;
	
	@OneToMany(mappedBy="user")
    private Set<Outfits> outfits;
	
	
	
	@OneToMany(mappedBy="user")
    private Set<Collection> Collection;
	
	
	@OneToMany(mappedBy="user")
    private Set<WardrobeGroup> wardrobegroup;
	
	@Column(name = "Sexe")
	private String Sexe;
	
	@OneToMany(mappedBy="user")
    private Set<CollectionGroup> collectiongroup;
	
	
	@OneToMany(mappedBy="user")
    private Set<AlertUser> alerts;
	
	@ManyToMany
	@JoinTable(
			  name = "favorite", 
			  joinColumns = @JoinColumn(name = "user_id"), 
			  inverseJoinColumns = @JoinColumn(name = "cloth_id"))
    Set<Cloth> favoriteClothes;

	@Column(name = "profileImg")
	private String profileImg;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "birthDate")
	private Date birthDate;
	

	
	private Boolean firstLogin ;
	private Boolean firstWardrobe;
	private Boolean firstCollection;
	private Boolean firstOutfit;
	
	
	public Set<Collection> getCollection() {
		return Collection;
	}

	public void setCollection(Set<Collection> collection) {
		Collection = collection;
	}

	public Set<AlertUser> getAlerts() {
		return alerts;
	}

	public void setAlerts(Set<AlertUser> alerts) {
		this.alerts = alerts;
	}



	public Boolean getFirstLogin() {
		return firstLogin;
	}

	public void setFirstLogin(Boolean firstLogin) {
		this.firstLogin = firstLogin;
	}

	public Boolean getFirstWardrobe() {
		return firstWardrobe;
	}

	public void setFirstWardrobe(Boolean firstWardrobe) {
		this.firstWardrobe = firstWardrobe;
	}

	public Boolean getFirstCollection() {
		return firstCollection;
	}

	public void setFirstCollection(Boolean firstCollection) {
		this.firstCollection = firstCollection;
	}

	public Boolean getFirstOutfit() {
		return firstOutfit;
	}

	public void setFirstOutfit(Boolean firstOutfit) {
		this.firstOutfit = firstOutfit;
	}

	public Set<Cloth> getFavoriteClothes() {
		return favoriteClothes;
	}

	public Set<Cloth> getFavorites() {
		return favoriteClothes;
	}

	public void setFavoriteClothes(Set<Cloth> favorites) {
		this.favoriteClothes = favorites;
	}

	public User() {
	}

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Outfits> getOutfits() {
		return outfits;
	}

	public void setOutfits(Set<Outfits> outfits) {
		this.outfits = outfits;
	}



	public Set<WardrobeGroup> getWardrobegroup() {
		return wardrobegroup;
	}

	public void setWardrobegroup(Set<WardrobeGroup> wardrobegroup) {
		this.wardrobegroup = wardrobegroup;
	}

	public Set<CollectionGroup> getCollectiongroup() {
		return collectiongroup;
	}

	public void setCollectiongroup(Set<CollectionGroup> collectiongroup) {
		this.collectiongroup = collectiongroup;
	}

	public String getProfileImg() {
		return profileImg;
	}

	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getSexe() {
		return Sexe;
	}

	public void setSexe(String sexe) {
		Sexe = sexe;
	}

	
}