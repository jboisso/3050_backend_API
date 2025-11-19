import "./App.css";

import { useEffect, useState } from "react";

export function App() {
  const [data, setData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [metalink, setMetalink] = useState("");

  const layers = data?.layers || [];

  useEffect(() => {
    fetch("https://api3.geo.admin.ch/rest/services/api/MapServer")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  useEffect(() => {
    fetch(metalink)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => setMetadata(res))
      .catch((err) => console.error("Fetch failed:", err));
  }, [metalink]);

  return (
    <div>
      <p>Ich bin ein Text</p>
      <p>{metadata.layers?.[0]?.fullName}</p>
      <ol>
        {Object.entries(metadata.layers?.[0] || {}).map(([key, value], idx) => (
          <li key={idx}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ol>
      <p>{metalink}</p>
      <ol>
        {layers.map((layer, idx) => (
          <li key={idx}>
            <div
              onClick={() => {
                setMetalink(
                  `https://api3.geo.admin.ch/rest/services/api/MapServer?searchText=${layer.idGeoCat}`
                );
              }}
            >
              {layer.fullName}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
