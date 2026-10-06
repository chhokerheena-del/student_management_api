const express = require("express");
const router = express.Router();

let students = require("../data/students");

router.get("/", (req, res) => {
    res.status(200).json(students);
});

router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

router.post("/", (req, res) => {
    let { name, course, marks } = req.body;

    if (!name || !course || marks === undefined) {
        return res.status(400).json({
            message: "Name, course and marks are required"
        });
    }

    let newStudent = {
        id: students.length + 1,
        name: name,
        course: course,
        marks: marks
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    let { name, course, marks } = req.body;

    if (!name || !course || marks === undefined) {
        return res.status(400).json({
            message: "Name, course and marks are required"
        });
    }

    student.name = name;
    student.course = course;
    student.marks = marks;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});

router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    let deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;