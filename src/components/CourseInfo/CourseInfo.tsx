import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import { mockedCoursesList } from "../../helpers/mocks/mocks";
import { CourseInfoInterface } from "../../interfaces/index.interface";

const CourseIngo = () => {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState<CourseInfoInterface>(
    {} as CourseInfoInterface
  );

  const { id, title, description, creationDate, duration, authors } =
    courseInfo;

  const getCourseInfo = useCallback(() => {
    const course = mockedCoursesList.find((course) => course.id === courseId);
    if (course) {
      setCourseInfo(course);
    }
  }, [courseId]);

  useEffect(() => {
    getCourseInfo();
  }, [getCourseInfo]);

  return (
    <>
      <Header />
      <section className="flex flex-col items-center justify-center px-8 py-8 gap-6">
        <Link to={"/courses"} className="self-start flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back to courses
        </Link>
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex gap-12 mt-12">
          <div className="px-10">
            <p>{description}</p>
          </div>
          <div className="px-2">
            <ul className="flex flex-col gap-2">
              <li>
                <strong>Id: </strong>
                {id}
              </li>
              <li>
                <strong>Duration: </strong>
                {duration}
              </li>
              <li>
                <strong>Created at: </strong>
                {creationDate}
              </li>
              <li>
                <strong>Authors: </strong>
                {authors}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseIngo;
