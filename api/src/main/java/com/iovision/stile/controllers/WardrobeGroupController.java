package com.iovision.stile.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iovision.stile.entities.Wardrobe;
import com.iovision.stile.entities.WardrobeGroup;
import com.iovision.stile.services.payload.response.MessageResponse;
import com.iovision.stile.repositories.WardrobeGroupeRepository;
import com.iovision.stile.repositories.WardrobeRepository;
import com.iovision.stile.services.WardrobeGroupService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/wardrobeGroups")
public class WardrobeGroupController {

	@Autowired
	WardrobeGroupService wardrobeService;

	@Autowired
	WardrobeRepository WardrobeRepo;

	@Autowired
	WardrobeGroupeRepository WardrobeGroupeRepo;

	@PostMapping(value = "/add/{name}")
	public ResponseEntity<?> addWardrobeGroup(@PathVariable String name) {
		wardrobeService.addWardrobeGroup(name);
		return ResponseEntity.ok(new MessageResponse("WardrobeGroup added successfully!"));
	}

	@GetMapping(value = "/check")
	public ResponseEntity<Set<WardrobeGroup>> getkWardrobeGroup() {
		Set<WardrobeGroup> list = wardrobeService.getkWardrobeGroup();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping(value = "/deleteGroup/{groupId}")
	public ResponseEntity<?> deleteWardrobeGroupById(@PathVariable Long groupId) {
		wardrobeService.deleteWardrobeGroupById(groupId);
		return ResponseEntity.ok(new MessageResponse("WardrobeGroup deleted successfully!"));
	}

	@PostMapping(value = "/deleteClothFromGroup/{id}")
	public void deleteClothFromGroup(@PathVariable Integer id) {
		wardrobeService.deleteClothesFromGroup(id);
	}

	@PostMapping(value = "/deleteClothFromGroupUsedOutfits/{id}")
	public void deleteClothFromGroupUsedOutfits(@PathVariable Integer id) {
		wardrobeService.deleteClothFromGroupUsedOutfits(id);
	}

	@PostMapping(value = "/modifyGroupName/{oldName}/{newName}")
	public void modifyGroupName(@PathVariable String oldName, @PathVariable String newName) {
		wardrobeService.modifyGroupName(oldName, newName);
	}

	/*
	 * @PostMapping(value= "/remove/{name}") ResponseEntity<?>
	 * removeFromFavorites(@PathVariable String name) {
	 * WardrobeGroupService.removeWardrobeGroup(name); return ResponseEntity.ok(new
	 * MessageResponse("WardrobeGroup removed successfully!"));
	 * 
	 * }
	 */

	/*
	 * @PostMapping(value = "/wardrobe/{parent}/{imgUri}/{imgName}") public
	 * ResponseEntity<?> addImageWardrobeGroup(@PathVariable Long
	 * parent,@PathVariable String imgUri,@PathVariable String imgName) {
	 * wardrobeService.addImageWardrobeGroup(parent,imgUri,imgName); return
	 * ResponseEntity.ok(new MessageResponse("image added successfully!")); }
	 */

	@PostMapping("/upload")
	public void uplaodImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("groupeid") Long groupeid)
			throws IOException {
		this.wardrobeService.saveWardrobeByGallery(file, groupeid);
	}

	@PostMapping("/uploadWardrobe")
	public void uploadWardrobe(@RequestParam("base64") String base64, @RequestParam("type") String type,
			@RequestParam("groupeid") Long groupeid, @RequestParam("name") String name,
			@RequestParam("category") String category, @RequestParam("size") String size,
			@RequestParam("color") String color, @RequestParam("tissue") String tissue,
			@RequestParam("brand") String brand, @RequestParam("features") String features) throws IOException {
		this.wardrobeService.uploadWardrobe(base64, type, groupeid, name, category, size, color, tissue, brand,
				features);
	}

	@PostMapping("/editWardrobe")
	public void editWardrobe(@RequestParam("wardrobeId") Integer wardrobeId, @RequestParam("groupeid") Long groupeid,
			@RequestParam("name") String name, @RequestParam("category") String category,
			@RequestParam("size") String size, @RequestParam("color") String color,
			@RequestParam("tissue") String tissue, @RequestParam("brand") String brand,
			@RequestParam("features") String features) throws IOException {
		this.wardrobeService.editWardrobe(wardrobeId, groupeid, name, category, size, color, tissue, brand, features);
	}

	@PostMapping("/uploadByCamera")
	public void uplaodImage(@RequestParam("base64") String base64, @RequestParam("type") String type,
			@RequestParam("groupeid") Long groupeid) throws IOException {
		this.wardrobeService.saveWardrobeByCamera(base64, type, groupeid);
	}
	/*
	 * @GetMapping(path = { "/get/{imageName}" }) public ImageModel
	 * getImage(@PathVariable("imageName") String imageName) throws IOException {
	 * 
	 * final Optional<ImageModel> retrievedImage =
	 * imageRepository.findByName(imageName); ImageModel img = new
	 * ImageModel(retrievedImage.get().getName(), retrievedImage.get().getType(),
	 * decompressBytes(retrievedImage.get().getPicByte())); return img; }
	 */

	@GetMapping(value = "/ClothesByGroup/{wardrobe_group_id}")
	public List<Wardrobe> getClothesByGroup(@PathVariable Long id) {
		return wardrobeService.getClothesByGroup(id);

	}

	public static String compressBytes(byte[] data, String type) {
		String encodedString = "data:" + type + ";base64," + Base64.getEncoder().encodeToString(data);
		return encodedString;
	}

	/*
	 * public static byte[] compressBytes(byte[] data) { Deflater deflater = new
	 * Deflater(); deflater.setInput(data); deflater.finish();
	 * 
	 * ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	 * byte[] buffer = new byte[1024]; while (!deflater.finished()) { int count =
	 * deflater.deflate(buffer); outputStream.write(buffer, 0, count); } try {
	 * outputStream.close(); } catch (IOException e) { }
	 * System.out.println("Compressed Image Byte Size - " +
	 * outputStream.toByteArray().length);
	 * 
	 * return outputStream.toByteArray(); }
	 */
	/*
	 * uncompress the image bytes before returning it to the angular application
	 * public static byte[] decompressBytes(byte[] data) { Inflater inflater = new
	 * Inflater(); inflater.setInput(data); ByteArrayOutputStream outputStream = new
	 * ByteArrayOutputStream(data.length); byte[] buffer = new byte[1024]; try {
	 * while (!inflater.finished()) { int count = inflater.inflate(buffer);
	 * outputStream.write(buffer, 0, count); } outputStream.close(); } catch
	 * (IOException ioe) { } catch (DataFormatException e) { } return
	 * outputStream.toByteArray(); }
	 */

}
