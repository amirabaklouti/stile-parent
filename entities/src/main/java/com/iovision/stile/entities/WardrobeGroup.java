package com.iovision.stile.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
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
@Embeddable
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "wardrobegroup")
public class WardrobeGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="user_id", nullable=false)
	User user;
	
	//@OneToMany(mappedBy="wardrobeGroup")
   // private Set<Wardrobe> Wardrobes;
	
	   @OneToMany(mappedBy="wardrobeGroup",fetch = FetchType.LAZY ,cascade=CascadeType.REMOVE)
	   @OnDelete(action = OnDeleteAction.CASCADE)
	    private Set<Wardrobe> wardrobes;
	
	   
	private String groupName;
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	public String getGroupName() {
		return groupName;
	}


	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}


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








	/*public Set<Wardrobe> getWardrobe() {
		return Wardrobes;
	}


	public void setWardrobe(Set<Wardrobe> wardrobe) {
		Wardrobes = wardrobe;
	}
*/



	public WardrobeGroup() {
		super();
	
	}


	public Set<Wardrobe> getWardrobes() {
		return wardrobes;
	}


	public void setWardrobes(Set<Wardrobe> wardrobes) {
		this.wardrobes = wardrobes;
	}


	
	
	
	
}
