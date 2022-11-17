package com.iovision.stile.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.User;
import com.iovision.stile.entities.projection.ClothNameProjection;

public interface ClothRepository extends JpaRepository<Cloth, Long> {

	@Query("select c from Cloth c where id= :id")
	Optional<Cloth> getCollectionById(@Param("id") Integer id);

	@Query("select c from Cloth c")
	Set<Cloth> getClothes();

	Cloth findById(Integer id);

	Set<Cloth> findByPriceBetween(float min, float max);

	@Query("select c from Cloth c left join c.color o where o.name in :colors")
	Set<Cloth> findByColor(ArrayList<String> colors);

	@Query("select c from Cloth c left join c.brand b where b.name in :brands")
	Set<Cloth> findClothesByBrand(ArrayList<String> brands);

	@Query("select c from Cloth c left join c.category ct where ct.id = :id")
	Set<Cloth> findClothesByCategory(Integer id);

	@Query("select c from Cloth c left join c.brand b left join c.color o left join c.category cat where cat.name like %:word% or lower(c.name) like %:word% or b.name like %:word% or o.name like %:word% ")
	Page<Cloth> searchClothes(String word, Pageable pageable);

	@Query("select c from Cloth c left join c.brand b left join c.color o left join c.category cat where cat.name like %:word% or lower(c.name) like %:word% or b.name like %:word% or o.name like %:word% ")
	Page<Cloth> searchClothesBywords(String word, Pageable pageable);

	@Query("SELECT cat.name, count(c) FROM Cloth c left join c.category cat group by cat.name")
	List<Object[]> findCountClothByCategory();

	Set<Cloth> findByUsers(User user);

	@Query("select c from Cloth c where c in (select c from Cloth c left join c.brand b where b.name in :brands) and c in (select c from Cloth c left join c.color o where o.name in :colors) and c in ( select c from Cloth c where price between :min and :max )")
	Set<Cloth> filterClothes(ArrayList<String> brands, ArrayList<String> colors,
			float min, float max);

	@Query("select c from Cloth c left join c.category t left join c.color o where t.name like %:cat% and o.name= :color")
	Set<Cloth> imageSearch(String cat, String color);

	@Query("SELECT c FROM Cloth c WHERE lower(c.name) LIKE lower(concat('%',concat(:search, '%')))")
	Page<ClothNameProjection> findByNameContainingIgnoreCase(String search, Pageable pageable);

	// Set<Cloth> getClothesByCategoryId(Long id);

}
