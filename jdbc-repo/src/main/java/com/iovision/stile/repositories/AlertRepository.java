package com.iovision.stile.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.iovision.stile.entities.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> {
	@Query("select a from Alert a order by a.date desc")
	ArrayList<Alert> getAlerts();

}
