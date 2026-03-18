import React from "react";

function RepoList({ repos }) {

  return (
    <div>

      <h2>Repositories</h2>

      {repos.map((repo) => (

        <div key={repo.id} className="repo-item">
          <a href={repo.html_url} target="_blank" rel="noreferrer">
          <h3>{repo.name}</h3>
          </a>
          <p>⭐ Stars: {repo.stargazers_count}</p>

          <p>🍴 Forks: {repo.forks_count}</p>

          <p>💻 Language: {repo.language}</p>

        </div>

      ))}

    </div>
  );
}

export default RepoList;