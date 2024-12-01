import React, { useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, message, DatePicker } from "antd";
import moment from "moment";

const MovieForm = ({ visible, onClose, onRefresh, movie }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (movie) {
      form.setFieldsValue({
        ...movie,
        releaseDate: moment(movie.releaseDate.toISOString()), // Initialize releaseDate with moment
      });
    } else {
      form.resetFields(); // Reset the form if no movie is selected
    }
  }, [movie, form]);

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    const payload = {
      ...values,
      id: movie?.id || 0,
      releaseDate: values.releaseDate ? values.releaseDate.toISOString() : null
    };

    try {
      if (movie) {
        // Update an existing movie
        console.log("Editing movie:", payload);
        await axios.put(`https://localhost:7232/api/Movie/${movie.id}`, payload);
        message.success("Update Complete");
      } else {
        // Add a new movie
        console.log("Adding new movie:", payload);
        await axios.post("https://localhost:7232/api/Movie", payload);
        message.success("Added");
      }
      form.resetFields();
      onClose(); // Close the modal
      onRefresh(); // Refresh the movie list
    } catch (error) {
      message.error("Issue found");
      console.log("error is:-", error)
    }
  };

  return (
    <Modal
      title={movie ? "Edit Movie" : "Add Movie"}
      visible={visible}
      onCancel={onClose}
      onOk={() => form.submit()} // Trigger form submission when OK is clicked
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="genre"
          label="Genre"
          rules={[{ required: true, message: "Please enter the genre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;
