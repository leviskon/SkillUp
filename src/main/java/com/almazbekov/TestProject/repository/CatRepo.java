package com.almazbekov.TestProject.repository;

import com.almazbekov.TestProject.entity.Cat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatRepo extends JpaRepository <Cat, Integer> {

}
