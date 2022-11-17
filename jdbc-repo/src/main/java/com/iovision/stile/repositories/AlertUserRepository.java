package com.iovision.stile.repositories;

import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.iovision.stile.entities.AlertUser;
import com.iovision.stile.entities.AlertUserId;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.dto.AlertUserDto;

public interface AlertUserRepository extends JpaRepository<AlertUser, AlertUserId> {
	@Query("select a from AlertUser a left join fetch a.alert al where a.user=:user order by a.read, al.date desc ")
	Collection<AlertUserDto> getAlertsByUser(@Param("user") User user);

	@Transactional
	@Modifying
	@Query("update AlertUser a set a.read=true where a.id in :id")
	void updateAlertStatus(@Param("id") List<AlertUserId> id);
}
