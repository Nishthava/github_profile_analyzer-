import React, { useState } from "react";

function CompareBar({ onCompare }) {

  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompare(username);
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter second username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">Compare</button>

    </form>
  );
}

export default CompareBar;