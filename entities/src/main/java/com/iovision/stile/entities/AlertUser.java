package com.iovision.stile.entities;

import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "alert_user", schema="public")
public class AlertUser implements Serializable{
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	AlertUserId id;
	boolean read;
	@ManyToOne
    @JoinColumn(name = "alert_id", insertable=false, updatable=false)
    Alert alert;
	@ManyToOne
    @JoinColumn(name = "user_id", insertable=false, updatable=false)
    User user;
	public AlertUserId getId() {
		return id;
	}
	public void setId(AlertUserId id) {
		this.id = id;
	}
	public boolean isRead() {
		return read;
	}
	public void setRead(boolean read) {
		this.read = read;
	}
	public Alert getAlert() {
		return alert;
	}
	public void setAlert(Alert alert) {
		this.alert = alert;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	

}
