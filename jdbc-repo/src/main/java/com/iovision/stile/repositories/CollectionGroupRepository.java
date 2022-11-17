package com.iovision.stile.repositories;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.CollectionGroup;

public interface CollectionGroupRepository extends JpaRepository<CollectionGroup, Long> {

	@Query("select c from CollectionGroup c where c.id= :id")
	Optional<CollectionGroup> findById(@Param("id") Long id);

	@Query("select c from CollectionGroup c where user.id= :id")
	Set<CollectionGroup> getCollectionGroupByUser(Long id);

	@Transactional
	@Modifying
	@Query("delete from CollectionGroup where id= :id  AND collectionName=:name AND user.id= :user")
	void deleteItemFromCollection(@Param("id") Long id, @Param("name") String name, @Param("user") Long user);

	@Transactional
	@Modifying
	@Query(value = "UPDATE collectiongroup  SET collection_name = :newname where user_id = :userId and collectiongroup.id = :groupId ", nativeQuery = true)
	void modifyCollectionGroupName(@Param("newname") String newname, @Param("userId") Long userId, @Param("groupId") Long groupId);
	// AND collectiongroup.collection_name = oldname
	// ,@Param("oldname") String oldname

}
