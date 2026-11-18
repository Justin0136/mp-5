import ShortenForm from "@/components/ShortenForm";

export default function Home() {
  return (
      <main className="page">
        <div className="card">
          <h1>URL Shortener</h1>
          <ShortenForm />
        </div>
      </main>
  );
}