package com.iovision.stile.repositories;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Collection;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {

	
	@Query("select c from Collection c left join fetch c.collectionGroup g where c.cloth.id= :clothId AND g.user.id= :userId")
	Set<Collection>  checkItemExist(Integer clothId , Long userId);
	
	
	@Transactional
	@Modifying 
	@Query(value="delete  from Collection  where collection.cloth_id= :clothId AND collection.user_id= :userId ",nativeQuery=true)
	void deleteItemFromCollection(@Param("clothId") Integer clothId,@Param("userId") Long userId);


		@Transactional
	@Modifying 
	@Query(value="UPDATE collection SET collection_group_id = :id where user_id = :userId and id = :collectionId",nativeQuery=true)
	void changeItemCollection(Long id, Long userId,Long collectionId);


	
	
}
