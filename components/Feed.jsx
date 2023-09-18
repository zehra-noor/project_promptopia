"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    setSearchText(tag);
  };

  useEffect(() => {
    const search = async (e) => {
      try {
        const response = await fetch(`/api/search/${searchText}`);
        const data = await response.json();
        if (data) setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchText !== "") search();
    else fetchPosts();
  }, [searchText]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
