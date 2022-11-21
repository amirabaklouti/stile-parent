package com.iovision.stile.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "image")
public class Image implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String input;
	private String detected;
	@ManyToMany
	@JoinTable(
			  name = "output", 
			  joinColumns = @JoinColumn(name = "image_id"), 
			  inverseJoinColumns = @JoinColumn(name = "result_id"))
		private Set<Result> output;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getInput() {
		return input;
	}
	public void setInput(String input) {
		this.input = input;
	}
	public String getDetected() {
		return detected;
	}
	public void setDetected(String detected) {
		this.detected = detected;
	}
	public Set<Result> getOutput() {
		return output;
	}
	public void setOutput(Set<Result> output) {
		this.output = output;
	}
}
