package com.iovision.stile.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "category")
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	private String imgUri;
	@Transient
	private Long count;
	@OneToMany(mappedBy="category")
    private Set<Cloth> clothes;

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Category() {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer category_id) {
		this.id = category_id;
	}

	public void setName(String category_name) {
		this.name = category_name;
	}
	@Column(name="img_uri")
	public void setImgUri(String imgUri) {
		this.imgUri = imgUri;
	}

	public String getName() {
		return this.name;
	}
	public String getImgUri() {
		return imgUri;
	}

}
