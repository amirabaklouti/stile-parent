package com.iovision.stile.repositories;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Outfits;
import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.projection.OutfitProjection;


public interface OutfitRepository extends JpaRepository<Outfits, Long> {

	
//	@Query("select o from Outfit o left join o.user u where u.id=:id")
//	Set<Outfits> findOutfitsByUser(@Param(value = "id") Long id);
	
	
	@Query("select o.wardrobe from Outfits o where o.user.id=:id AND o.wardrobe.wardrobeGroup IS NULL")
	Set<Wardrobe> getNotJoinedWardrobesByUser(Long id);

	@Query("SELECT CASE WHEN COUNT(o.wardrobe ) > 0 THEN true ELSE false END from Outfits o where o.user.id= :id AND o.id= :wardrobeId")
	Boolean getWardrobesUsedInOutfitsByUser(@Param("id") Long id, @Param("wardrobeId") Long wardrobeId);
	 
	@Transactional
	@Modifying 
	@Query("delete from Outfits w where w.outfitGroup.id= :outfitId")
	void deleteOutfitItems(@Param("outfitId") Long outfitId);

	@Query("select o from Outfits o where o.outfitGroup.id= :id")
	List<OutfitProjection> getOutfitItemsById(@Param("id") Long id);
}