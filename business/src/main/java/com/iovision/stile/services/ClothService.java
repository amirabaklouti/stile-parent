package com.iovision.stile.services;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.iovision.stile.repositories.ClothRepository;
import com.iovision.stile.repositories.UserRepository;
import com.iovision.stile.services.security.services.UserDetailsImpl;
import com.iovision.stile.entities.Cloth;
import com.iovision.stile.entities.User;

@Service
public class ClothService {
	@Autowired 
	UserRepository userRepository;
	@Autowired
	ClothRepository clothRepository;
	@Autowired
	UserService userService;
	
	public Set<Cloth> getClothes() {
		return clothRepository.getClothes();
	}
	public Page<Cloth> searchClothes(String word,Integer size, Integer page){
		Pageable pageable = PageRequest.of(page, size);
		return clothRepository.searchClothes(word,pageable);
	}
	public Cloth findById(Integer id) {
		return clothRepository.findById(id);
	}
	public Set<Cloth> findByColor(ArrayList<String> color){
		return clothRepository.findByColor(color);
	}
	public Set<Cloth> findByPriceBetween(float min, float max){
		return clothRepository.findByPriceBetween(min, max);
	}
	public Set<Cloth> findClothesByBrand(ArrayList<String> brands){
		return clothRepository.findClothesByBrand(brands);
	}
	public Set<Cloth> findClothesByCategory(Integer category){
		return clothRepository.findClothesByCategory(category);
	}
    public Cloth save(Cloth cloth) {
        return clothRepository.save(cloth);
    }
    public Map<String, Long> findCountClothesByCategory(){
    	Map<String, Long> map = new HashMap<String, Long>();
    	List<Object[]> countResult = clothRepository.findCountClothByCategory();
    	countResult.stream().forEach(c -> { 
    		map.put((String)c[0],(Long)c[1]);
    		
    	});
    	return map;
    }
    public Set<Cloth> findFavoritesByUser(){
    	UserDetailsImpl c = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	User user = userRepository.findByUsername(c.getUsername()).get();
    	return clothRepository.findByUsers(user);
    }
    public ArrayList<Object> getClothIndex(Integer id) {
    	ArrayList<Object> obj = new ArrayList<Object>() ;
    	Set<Cloth> clothes = clothRepository.getClothes();
    	Cloth cloth = clothRepository.findById(id);
    	Integer index= new ArrayList<>(clothes).indexOf(cloth);
    	obj.add(index);
    	obj.add(clothes);
    	return obj;
    }
    public Set<Cloth> filterClothes(ArrayList<String> brands, ArrayList<String> colors, float min, float max , boolean discount){
    	Set<Cloth> clothes=clothRepository.filterClothes(brands,colors,min,max);
    	Set<Cloth> onDiscount = new HashSet<Cloth>();
    	if(discount==true) {
    		clothes.forEach(e -> {
    			if((e.getDiscount()!=null)&&(e.getDiscount()!=0)) {
    				onDiscount.add(e);
    			}
    		});
    	clothes=onDiscount;
    	}
    	return clothes;
    }

	public Set<Cloth> imageSearch(String cat, String color){
		return clothRepository.imageSearch(cat, color);
	}
	public Set<Cloth> getClothesByCategoryId(Integer id) {
		return clothRepository.findClothesByCategory(id);
	}
	public void searchClothesBywords(List<?> items) {
		 List<?> i = items;
		 
	}

}
