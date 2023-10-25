import React, { useState, useEffect } from "react";
import CourseCard from "./components/CourseCard/CourseCard";
import {
  mockedCoursesList,
  mockedAuthorsList,
} from "../../helpers/mocks/mocks";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState(mockedCoursesList);

  const navigate = useNavigate();
  const getAuthorNames = (authorIds: string[]) => {
    return mockedAuthorsList
      .filter((author) => authorIds.includes(author.id))
      .map((author) => author.name);
  };

  const showAuthors = (authors: string[]) => {
    return authors.map((author, index) => (
      <span key={index}>
        {author}
        {index < authors.length - 1 ? ", " : ""}
      </span>
    ));
  };

  const getDurationInHours = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
  };

  const getCreationDate = (creationDate: string): string => {
    const date = new Date(creationDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    const storedCourses = localStorage.getItem("course");
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses([...mockedCoursesList, parsedCourses]);
    }
  }, []);

  console.log(courses);
  return (
    <>
      <section className="p-4 w-full flex justify-between">
        <div>
          <Input
            id="searchInput"
            className="border-solid border border-gray-400 w-72 p-2 text-sm"
            type="text"
          />
          <Button
            buttonText="Search"
            onClick={() => {}}
            className="py-2 px-8 ml-4 rounded-md bg-blue-700 text-white"
          />
        </div>
        <div>
          <Button
            buttonText="Add new course"
            onClick={() => {
              navigate("add-new-course");
            }}
            className="py-2 px-8 rounded-md bg-cyan-500 text-white"
          />
        </div>
      </section>
      <div>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            authors={showAuthors(getAuthorNames(course.authors))}
            duration={getDurationInHours(course.duration)}
            createdAt={getCreationDate(course.creationDate)}
          />
        ))}
      </div>
    </>
  );
};

export default Courses;
