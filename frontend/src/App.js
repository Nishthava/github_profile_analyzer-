import React , {useState }from "react";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import { fetchUser, fetchRepos } from "./services/githubApi";
import LanguageChart from "./components/LanguageChart";
import CompareBar from "./components/CompareBar";

function App() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("stars");
  const [compareProfile, setCompareProfile] = useState(null);
  const [compareRepos, setCompareRepos] = useState([]);
  const topRepo = Array.isArray(repos) && repos.length>0 ? repos.reduce((max, repo) => 
    repo.stargazers_count > max.stargazers_count ? repo : max, repos[0]) : null;
  const totalStars = Array.isArray(repos) && repos.length>0 ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) :0;
  const developerScore =(profile?.followers || 0) +(repos?.length || 0) +totalStars;
  const compareTotalStars = Array.isArray(compareRepos)
  ? compareRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  : 0;
  const compareScore =(compareProfile?.followers || 0) +(compareRepos?.length || 0) +compareTotalStars;
  const handleSearch = async (username) => {
      if (!username) {
        alert("Please enter a GitHub username");
        return;
      };
      setLoading(true);
      const userData = await fetchUser(username);
      console.log("USER DATA:", userData);
     if (userData.message === "Not Found") {
       setError("User not found");
       setProfile(null);
       setRepos([]);
       return;
     }
    setError(null);
    setProfile(userData);
    const repoData = await fetchRepos(username);
    setRepos(repoData);
     if (userData.message === "Not Found") {
     setError("User not found");
     setProfile(null);
     setRepos([]);
     return;
    }
    setLoading(false);
  };
  const handleCompare = async (username) => {

    if (!username) return;

    const userData = await fetchUser(username);

    if (userData.error) {
     setError(userData.error);
     setProfile(null);
     setRepos([]);
     return;
}

   setCompareProfile(userData);

   const repoData = await fetchRepos(username);
   setCompareRepos(repoData);
  };

  const getSortedRepos=() =>{
    let sorted=[...repos]
    if (sortType === "stars") {
      sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      sorted.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortType === "date") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return sorted;
  }
  

  return (
    <div className="container">
      <h1>GitHub Profile Analyzer</h1>
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        <CompareBar onCompare={handleCompare} />
      </div>
      {error && <h2 style={{color:"red"}}>{error}</h2>}
      {loading && <h2>Loading GitHub data...</h2>}
      {profile && (
        <div>
         <h2 className="highlight">Developer Score: {developerScore}</h2>
         <div className="card profile-card">
           <img src={profile.avatar_url} width="150" alt="profile"  />

           <h2>{profile.name}</h2>

           <p>Followers: {profile.followers}</p>

           <p>Public Repos: {profile.public_repos}</p>

          </div>
        </div>

      )}
      {repos.length > 0 && (
       <div>

         <h2>🏆 Top Repository</h2>

         <h3>{topRepo.name}</h3>

         <p>⭐ Stars: {topRepo.stargazers_count}</p>

        <p>🍴 Forks: {topRepo.forks_count}</p>

       </div>
      )}
      {profile && compareProfile && (
       <div>

         <h2>Comparison</h2>

         <div style={{ display: "flex", gap: "50px" }}>

           <div>
             <h3>{profile.name}</h3>
             <p>Followers: {profile.followers}</p>
             <p>Repos: {repos.length}</p>
             <p>Score: {developerScore}</p>
           </div>

            <div>
              <h3>{compareProfile.name}</h3>
              <p>Followers: {compareProfile.followers}</p>
              <p>Repos: {compareRepos.length}</p>
             <p>Score: {compareScore}</p>
           </div>

          </div>

        </div>
     )}
     <div className="dropdown-wrapper">
      <select className="dropdown" onChange={(e) => setSortType(e.target.value)}>
       <option value="stars">Sort by Stars</option>
       <option value="forks">Sort by Forks</option>
       <option value="date">Sort by Date</option>

      </select>
      {repos.length > 0 && <RepoList repos={getSortedRepos()} />}
      {repos.length > 0 && <LanguageChart repos={repos} />}

    </div>
    </div>
  );
}

export default App;