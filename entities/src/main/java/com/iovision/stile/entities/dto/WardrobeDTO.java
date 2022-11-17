package com.iovision.stile.entities.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.iovision.stile.entities.WardrobeGroup;

public class WardrobeDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Long  parentId;
	
	private String name;
	
	private String itemName;

	private String type;
	
	private byte[] picByte;


	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
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

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}

	public WardrobeDTO(Long parentId, String name, String itemName, String type, byte[] picByte) {
		this.parentId = parentId;
		this.name = name;
		this.itemName = itemName;
		this.type = type;
		this.picByte = picByte;
	}
	


	
}
