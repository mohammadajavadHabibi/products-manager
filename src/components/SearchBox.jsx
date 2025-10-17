import React from "react";

function SearchBox({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="جست‌وجو بر اساس نام یا شناسه محصول..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBox;
