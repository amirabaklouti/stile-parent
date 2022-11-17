package com.iovision.stile.entities.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "csv")
public class searchDataDto{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Field(type = FieldType.Text ,name = "gender")
	private String gender;

	@Field(type = FieldType.Text ,name = "masterCategory")
	private String masterCategory;
	
	@Field(type = FieldType.Text ,name = "subCategory")
	private String subCategory;
	
	@Field(type = FieldType.Text ,name = "articleType")
	private String articleType;
	
	@Field(type = FieldType.Text ,name = "baseColour")
	private String baseColour;

	@Field(type = FieldType.Text ,name = "season")
	private String season;
	
	@Field(type = FieldType.Text ,name = "year")
	private String year;
	
	@Field(type = FieldType.Text ,name = "usage")
	private String usage;
	
	@Field(type = FieldType.Text ,name = "productDisplayName")
	private String productDisplayName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMasterCategory() {
		return masterCategory;
	}

	public void setMasterCategory(String masterCategory) {
		this.masterCategory = masterCategory;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getArticleType() {
		return articleType;
	}

	public void setArticleType(String articleType) {
		this.articleType = articleType;
	}

	public String getBaseColour() {
		return baseColour;
	}

	public void setBaseColour(String baseColour) {
		this.baseColour = baseColour;
	}

	public String getSeason() {
		return season;
	}

	public void setSeason(String season) {
		this.season = season;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

	public String getProductDisplayName() {
		return productDisplayName;
	}

	public void setProductDisplayName(String productDisplayName) {
		this.productDisplayName = productDisplayName;
	}
	


	
	
	
}
