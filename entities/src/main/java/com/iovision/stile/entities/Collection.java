package com.iovision.stile.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "collection", schema="public")
public class Collection {

	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Integer id;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="user_id", nullable=false)
	User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name="collectionGroup_id")
	CollectionGroup collectionGroup;

	@ManyToOne
	@JoinColumn(name="cloth_id", nullable=false)
	Cloth cloth;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public CollectionGroup getCollectionGroup() {
		return collectionGroup;
	}

	public void setCollectionGroup(CollectionGroup collectionGroup) {
		this.collectionGroup = collectionGroup;
	}

	public Cloth getCloth() {
		return cloth;
	}

	public void setCloth(Cloth cloth) {
		this.cloth = cloth;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	 //  @OneToMany(mappedBy="collections",fetch = FetchType.LAZY)
	//    private Set<Cloth> collections;
	
	
	
}
