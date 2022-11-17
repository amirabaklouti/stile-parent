package com.iovision.stile.repositories;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.WardrobeGroup;




public interface WardrobeGroupeRepository  extends JpaRepository<WardrobeGroup, Long>{

	
	@Query("select DISTINCT w from WardrobeGroup w left join fetch w.wardrobes i left join fetch i.features where w.user.id= :userId")
	Set<WardrobeGroup> getkWardrobeGroup(Long userId);

	
	@Transactional
	@Modifying 
	@Query("delete from WardrobeGroup w where w.id= :id")
	void deleteWardrobeGroupById(@Param("id") Long id);
	
	
	@Transactional
	@Modifying 
	@Query(value="UPDATE wardrobegroup  SET group_name = :newname where user_id = :user and group_name = :name",nativeQuery=true)
	void modifyGroupName(@Param("user")  Long user, @Param("name") String name, @Param("newname") String newname);

}
