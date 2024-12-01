import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Tooltip, Button, Modal, message } from "antd";
import axios from "axios";
import MovieForm from "./movieForm";
import {PlusCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://localhost:7232/api/Movie');
      setMovies(response.data);
    } catch (err) {
      message.error("Failed to fetch");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action is permanent",
      onOk: async () => {
        try {
          await axios.delete(`https://localhost:7232/api/Movie/${id}`);
          message.success("Deleted successfully");
          fetchMovies();
        } catch {
          message.error("failed to delete");
        }
      },
    });
  };

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentMovie(null);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ fontWeight: "bold" }}>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (genre) => (
        <Tag color={getGenreColor(genre)}>{genre.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (date) => (
        <span>{moment(date).format("MMMM DD, YYYY")}</span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Space size="middle">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button icon={<PlusCircleOutlined />} type="primary" ghost onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table columns={columns} dataSource={movies} rowKey="id" pagination={{ pageSize: 5 }}
      bordered style={{ marginTop: "20px" }} />
      <MovieForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onRefresh={fetchMovies}
        movie={currentMovie}
      />
    </div>
  );
};


const getGenreColor = (genre) => {
    switch (genre.toLowerCase()) {
      case "action":
        return "volcano";
      case "drama":
        return "geekblue";
      case "comedy":
        return "green";
      case "horror":
        return "magenta";
      default:
        return "gold";
    }
  };

export default MovieList;
