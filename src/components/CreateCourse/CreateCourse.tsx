import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { mockedAuthorsList } from "../../helpers/mocks/mocks";
import TextArea from "../../common/TextArea/TextArea";
import { useNavigate } from "react-router-dom";

interface Author {
  id: string;
  name: string;
}

const CreateCourse = () => {
  const navigate = useNavigate();

  const [duration, setDuration] = useState(0);
  const [authorList, setAuthorList] = useState<string[]>([]);
  const [authorIdList, setAuthorIdList] = useState<string[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");
  const [authorsMocked, setAuthorsMocked] =
    useState<Author[]>(mockedAuthorsList);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const onClickAddAuthor = () => {
    if (
      authorsMocked.some(
        (author) => author.name.toLowerCase() === newAuthorName.toLowerCase()
      )
    ) {
      alert("This author already exists");
      return;
    }

    const newAuthor: Author = {
      id: generateRandomId().toString(),
      name: newAuthorName,
    };
    setAuthorsMocked([...authorsMocked, newAuthor]);
  };

  const getDurationInHours = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")} hours`;
  };

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value));
  };

  const getDateNow = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const validateForm = () => {
    if (
      !courseTitle.trim() ||
      authorList.length === 0 ||
      duration <= 0 ||
      !courseDescription.trim()
    ) {
      alert(
        "Please fill in all the fields and make sure the duration is greater than 0"
      );
    } else {
      const course = {
        title: courseTitle,
        authors: authorIdList,
        duration,
        description: courseDescription,
        creationDate: getDateNow(),
        id: generateRandomId().toString(),
      };

      localStorage.setItem("course", JSON.stringify(course));
      alert("Course saved successfully!");
      navigate("/");
    }
  };

  const showAuthors = () => {
    return authorsMocked.map((author) => {
      return (
        <div className="flex justify-between w-full gap-20 my-2">
          <div>
            <h3>{author.name}</h3>
          </div>
          <div>
            <Button
              buttonText="Add author"
              onClick={() => {
                if (!authorList.includes(author.name)) {
                  setAuthorList([...authorList, author.name]);
                  setAuthorIdList([...authorIdList, author.id]);
                }
              }}
              className="bg-green-500 py-2 px-6 rounded-md text-white"
            />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className="my-6 mx-8">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Input
                id="addCourseTitle"
                type="text"
                label="Title"
                placeHolder="Enter title..."
                className="border-solid border border-gray-400 w-72 p-2 text-sm my-2 rounded-md"
                minLength={2}
                onChange={(event) => {
                  setCourseTitle(event.target.value);
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <Button
                buttonText="Create course"
                onClick={() => {
                  validateForm();
                }}
                className="bg-green-500 py-2 px-6 rounded-md text-white"
              />
            </div>
          </div>
          <TextArea
            className="border-solid border border-gray-400 w-full h-24 p-2 text-sm mt-2 rounded-md"
            id="addCourseDescription"
            label="Description"
            placeHolder="Enter description..."
            minLegth={2}
            onchange={(event) => {
              setCourseDescription(event.target.value);
            }}
          />
        </div>
      </section>
      <section className="my-6 mx-8">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center justify-around">
            <div className="flex flex-col ">
              <Input
                id="CreateCourseAuthor"
                type="text"
                label="Author name"
                placeHolder="Enter author name..."
                className="border border-solid border-gray-400 w-96 p-2 text-sm my-2 rounded-md"
                minLength={2}
                onChange={(event) => {
                  setNewAuthorName(event.target.value);
                }}
              />
              <Button
                buttonText="Create author"
                onClick={() => {
                  onClickAddAuthor();
                }}
                className="border border-solid p-2 bg-cyan-500 w-32 text-white rounded-md"
              />
            </div>
            <div className="flex flex-col mt-6">
              <Input
                type="number"
                id="CreateCourseDuration"
                className="border border-solid border-gray-400 w-96 p-2 text-sm my-2 rounded-md"
                label="Duration"
                placeHolder="Enter duration in minutes..."
                onChange={onChangeDuration}
              />
              <h4>
                Duration:{" "}
                <span className="font-bold">
                  {getDurationInHours(duration)}
                </span>
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-center w-full mb-6 font-bold">Authors</h4>
            {showAuthors()}
            <h4 className="w-full text-center mt-6 font-bold">
              {" "}
              Course author
            </h4>
            {authorList.length > 0 ? (
              authorList.map((author) => {
                return <h4>{author}</h4>;
              })
            ) : (
              <h4 className="w-full text-center mt-4">Author list is empty</h4>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateCourse;
