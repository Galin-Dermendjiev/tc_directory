import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {

  const query = (await searchParams).query
  const posts = [{
    _createdAt: new Date(),
    views: 22,
    author:{_id: 1, name: "Steven"},
    _id: 1,
    description: "this is a description",
    image: "https://imgs.search.brave.com/TQyJbk0dzyAEIEb3ohg8qRUkhHZQg0UgomXNeGnTeBE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVzbGFvcmFjbGUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI1LzA5L09wdGlt/dXMtZ2VuZXJhdGlv/bnMtY29sb3JzMS0y/LTJfNS0xMDI0eDUz/Ny5qcGc",
    category: "Robots",
    title: "Optimus robot"
  }]

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Share your startup, <br/> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Your Ideas Now.</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">{query ? `Search results for: ${query}` : 'All Startups'}</p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?(
            posts.map((post: StartupCardType) => (<StartupCard key={post?._id} post={post}/>))
          ) : (<p className="no-results">No Startups Found</p>)}
        </ul>
      </section>
    </>
  );
}
