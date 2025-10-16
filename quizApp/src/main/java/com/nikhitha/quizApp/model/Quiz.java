package com.nikhitha.quizApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @ManyToMany
    
    private List<Question> questions;
    // private String category;
    // private int numQ;

    // public Quiz(int id, String title, String category, int numQ) {
    //     this.id = id;
    //     this.title = title;
    //     this.category = category;
    //     this.numQ = numQ;
    // }

    // public int getId() {
    //     return id;
    // }

    // public void setId(int id) {
    //     this.id = id;
    // }

    // public String getTitle() {
    //     return title;
    // }

    // public void setTitle(String title) {
    //     this.title = title;
    // }

    // public String getCategory() {
    //     return category;
    // }

    // public void setCategory(String category) {
    //     this.category = category;
    // }

    // public int getNumQ() {
    //     return numQ;
    // }

    // public void setNumQ(int numQ) {
    //     this.numQ = numQ;
    // }

}
