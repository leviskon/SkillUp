package com.almazbekov.TestProject.controllers;

import com.almazbekov.TestProject.DTO.CatDTO;
import com.almazbekov.TestProject.entity.Cat;
import com.almazbekov.TestProject.repository.CatRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "main_methods")
@Slf4j
@RestController
@RequiredArgsConstructor
public class MainController {

    private final CatRepo catRepo;

    @PostMapping("/api/add")
    public void addCat(@RequestBody CatDTO catDTO) {
        log.info(
                "New row: " + catRepo.save
                        (Cat.builder()
                                .age(catDTO.getAge())
                                .name(catDTO.getName())
                                .weight(catDTO.getWeight())
                                .build())
        );
    }

    @Operation(
            summary = "Кладёт котика нового котика в базу",
            description = "Получает DTO кота и с помощью builder собирает и сохраняет сущность в базу"
    )

    @SneakyThrows
    @GetMapping("/api/all")
    public List<Cat> getAll() {
        return catRepo.findAll();
    }

    @GetMapping("/api")
    public Cat getCat(@RequestParam int id) {
        log.info("Received GET request for cat with id: {}", id);
        return catRepo.findById(id).orElseThrow();
    }

    @DeleteMapping("/api")
    public void deleteCat(@RequestParam int id) {
        catRepo.deleteById(id);
    }

    @PutMapping("/api")
    public String updateCat(@RequestBody Cat cat) {
        if (!catRepo.existsById(cat.getId())) {
            return "Cat not found";
        }
        return catRepo.save(cat).toString();
    }
}
