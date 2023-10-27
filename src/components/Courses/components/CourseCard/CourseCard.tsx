import React from 'react';
import Button from '../../../../common/Button/Button';

interface Author {
	id: string;
	name: string;
}

interface CourseCardProps {
	title: string;
	description: string;
	authors: Author[];
	duration: number;
	createdAt: string;
}

const showAuthors = (authors: string[]): JSX.Element[] => {
	return authors.map((author, index) => (
		<span key={author}>
			{author}
			{index < authors.length - 1 ? ', ' : ''}
		</span>
	));
};

const getDurationInHours = (duration: number): string => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
};

const getCreationDate = (creationDate: string): string => {
	const date = new Date(creationDate);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};

const CourseCard = ({
  title,
  description,
  authors,
  duration,
  createdAt,
  id,
}: CourseCardInterface) => {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate(`${id}`);
            }}
            className="bg-cyan-500 text-white p-2 rounded-md"
          />
        </div>
      </section>
    </>
  );
};

export default CourseCard;
