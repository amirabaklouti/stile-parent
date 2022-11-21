package com.iovision.stile.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "brand")
public class Brand implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	@OneToMany(mappedBy="brand")
    private Set<Cloth> clothes;

	public Brand() {
		// TODO Auto-generated constructor stub
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return this.id;
	}
	public String getName() {
		return this.name;
	}

}
