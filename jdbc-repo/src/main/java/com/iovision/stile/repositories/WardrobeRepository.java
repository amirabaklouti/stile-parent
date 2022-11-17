package com.iovision.stile.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.WardrobeGroup;
import com.iovision.stile.entities.dto.WardrobeDTO;



public interface WardrobeRepository extends JpaRepository<Wardrobe, Long> {

	void save(WardrobeDTO w);

	@Query("select w from Wardrobe w where w.id = :id")
	Optional<Wardrobe> findById(@Param("id") Integer integer);
	
	@Query("select w from Wardrobe w left join fetch w.wardrobeGroup g where g.id = :id")
	List<Wardrobe> getClothesByGroup(@Param("id") Long id);

	@Transactional
	@Modifying 
	@Query("delete from Wardrobe w where w.id= :id")
	void deleteClothesFromGroup(@Param("id") Integer id);

	
	@Transactional
	@Modifying 
	@Query("UPDATE Wardrobe SET name= :name ,wardrobeGroup= :wg ,color= :color ,brand= :brand, category= :category,size= :size ,fabric= :tissue where id= :wardrobeId")
	void updateWardrobe(Integer wardrobeId, WardrobeGroup wg, String name, String color, String brand, String category,
			String size, String tissue);

	@Transactional
	@Modifying 
	@Query("UPDATE Wardrobe SET wardrobeGroup=null where id= :id")
	void deleteClothFromGroupUsedOutfits(Integer id);


}
