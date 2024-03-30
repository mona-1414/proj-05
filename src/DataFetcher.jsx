import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const responseData = await response.json();
        setData(responseData);
        setTotalItems(responseData.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value === '') {
      // If the search query is empty, reset the filteredData to the original data
      setFilteredData(data);
    } else {
      // Filter data based on the search query
      const filtered = data.filter((catData) =>
        catData.url.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <h1>Cats Fetcher (Pt. 2)</h1>
      <input
        type="text"
        placeholder="Search for cats..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={() => fetchData()}>Fetch Data</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <strong>Total Items:</strong> {totalItems}
          </div>
          <div>
            <strong>Search Results:</strong> {filteredData.length}
          </div>
          {filteredData.map((catData, index) => (
            <div key={index}>
              <img
                src={catData.url}
                alt={`Cat Image ${index + 1}`}
                width="300"
                height="200"
              />
              <div>
                <strong>ID:</strong> {catData.id}
              </div>
              <div>
                <strong>URL:</strong> {catData.url}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataFetcher;
