import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && defined(slug.current)] | order(_createdAt desc) {
        _createdAt,
        _id, 
        author -> {
        _id, image, bio
        },
        category,
        description,
        image,
        title, 
        views,
        slug
}`
);
