package com.iovision.stile.repositories;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.CollectionGroup;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.projection.UserImgProjection;
import com.iovision.stile.entities.projection.UserProjection;


public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	
	Optional<User> findById(Long id);
	
	
	@Query("select u from User u where u.id = :id")
	Optional<UserProjection> findByIdProjection(Long id);
	
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);

	
	
	@Query("select count(firstLogin) > 0 from User where id = :id")
	Boolean checkFirstLogin(Long id);

	@Query("select u from User u where u.id = :id")
	Optional<UserImgProjection> findUserImgByIdProjection(Long id);
	
//	@Query("select c from collectionGroup c  where user.id=:user")
//	Set<CollectionGroup> findCollectionByUser(@Param(value = "user") User user);
	// left join fetch c.collection
}
