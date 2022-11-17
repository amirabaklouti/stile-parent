package com.iovision.stile.repositories;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.OutfitGroup;
import com.iovision.stile.entities.projection.OutfitGroupProjection;



public interface OutfitsGroupRepository  extends JpaRepository<OutfitGroup, Long> {

	
	// @Query(value="select g from outfitgroup g inner join outfits on g.id = outfits.outfit_group_id and g.user_id= :userId",nativeQuery=true)
	// Set<OutfitGroup> findOutfitsByUserId(Long userId);

	 @Query("select g from OutfitGroup g left join fetch g.outfits where g.user.id= :userId")
	 Set<OutfitGroup> findOutfitsByUserId(Long userId);

	@Transactional
	@Modifying 
	@Query("delete from OutfitGroup w where w.user.id= :userId AND w.id= :id ")
	void deleteOutfit(@Param("userId") Long userId, @Param("id") Long id);
	
	@Transactional
	@Modifying 
	@Query(value="UPDATE  outfitgroup SET name= :newname where outfitgroup.id =:id",nativeQuery=true)
	void modifyOutfitName(@Param("newname") String newname, @Param("id") Long id);

	@Query("select g from OutfitGroup g where g.user.id= :userId")
	List<OutfitGroupProjection> getOutfitsByUser(@Param("userId") Long userId);
}
