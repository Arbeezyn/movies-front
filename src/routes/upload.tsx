import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  poster: FileList;
  movie: FileList;
  description: string;
  age: number;
}

export const Route = createFileRoute("/upload")({
  component: Upload,
});

function Upload() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("age", data.age.toString());
    formData.append("poster", data.poster[0]);
    formData.append("movie", data.movie[0]);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")} />
        <input type="text" {...register("description")} />
        <input type="number" {...register("age")} />
        <input type="file" accept="image/*" {...register("poster")} />
        <input type="file" accept="video/*" {...register("movie")} />
        <input type="submit" />
      </form>
    </>
  );
}
