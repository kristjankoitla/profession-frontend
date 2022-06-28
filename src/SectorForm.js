import { useEffect, useState } from "react";

export default function SectorForm() {
  const [sectors, setSectors] = useState([]);

  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/workers", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        sectorId: sector,
        agreeToTerms: terms
      })
    })
  };

  useEffect(() => {
    fetch("http://localhost:8080/sectors")
      .then((response) => response.json())
      .then((data) => setSectors(data));
  }, []);

  return (
    <div>
      Please enter your name and pick the Sectors you are currently involved in.
      <form onSubmit={handleSubmit}>
        Name:
        <textarea value={name} onChange={(v) => setName(v.target.value)} />
        <br />
        <br />
        Sectors:
        <select value={sector} onChange={(v) => setSector(v.target.value)}>
          <option value="">None</option>
          {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <br />
        <br />
        <input
          type="checkbox"
          checked={terms}
          onChange={() => setTerms(!terms)}
        />
        Agree to terms
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
