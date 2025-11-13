import Image from "next/image";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Share your startup, <br/> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Your Ideas Now.</p>
        <SearchForm query={query}/>
      </section>

    </>
  );
}
