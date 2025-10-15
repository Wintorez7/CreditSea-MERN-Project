const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function uploadXml(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API}/api/reports/upload`, { method: "POST", body: formData });
  return res.json();
}

export async function getReports() {
  const res = await fetch(`${API}/api/reports`);
  return res.json();
}

export async function getReport(id) {
  const res = await fetch(`${API}/api/reports/${id}`);
  return res.json();
}
