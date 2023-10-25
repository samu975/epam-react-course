import React, { ReactNode } from "react";
import Button from "../../../../common/Button/Button";

interface CourseCardProps {
  title?: string;
  description?: string;
  authors?: ReactNode;
  duration?: string;
  createdAt?: string;
}

const CourseCard = ({
  title,
  description,
  authors,
  duration,
  createdAt,
}: CourseCardProps) => {
  return (
    <>
      <section className="courses p-4 flex gap-4 border border-solid border-blue-300 mx-4 borer my-6 rounded-lg">
        <div className="flex flex-col flex-1">
          <h2 className="font-bold text-2xl my-4 ml-4">{title}</h2>
          <p className="px-4 w-10/12">{description}</p>
        </div>
        <div className="flex flex-2 flex-col justify-center px-4 items-center">
          <div className="my-4">
            <p>
              <strong>Authors: </strong>
              {authors}
            </p>
            <p>
              <strong>Duration: </strong>
              {duration}
            </p>
            <p>
              <strong>Created at: </strong>
              {createdAt}
            </p>
          </div>
          <Button
            buttonText="Show course"
            onClick={() => {}}
            className="bg-cyan-500 text-white p-2 rounded-md"
          />
        </div>
      </section>
    </>
  );
};

export default CourseCard;
