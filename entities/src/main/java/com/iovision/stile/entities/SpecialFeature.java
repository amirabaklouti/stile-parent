package com.iovision.stile.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "special_feature")
public class SpecialFeature implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	private String imgUri;
	@ManyToMany(mappedBy = "specialFeatures")
    Set<Cloth> clothesWithFeatures;
	public SpecialFeature() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
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

	public void setImgUri(String imgUri) {
		this.imgUri = imgUri;
	}


}