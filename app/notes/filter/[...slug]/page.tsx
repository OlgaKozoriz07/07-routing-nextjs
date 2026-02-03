import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

interface NotesByCategoryProps {
  params: { slug: string[] };
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

const NotesByCategory = async ({ params, searchParams }: NotesByCategoryProps) => {
  const slug = params.slug ?? [];
  const first = (slug[0] ?? "").toLowerCase();
  const tag = first === "all" ? undefined : slug[0];

  const { page, query } = await searchParams;

  const pageNumber = Math.max(1, Number(page) || 1);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", pageNumber, query, tag],
    queryFn: () => fetchNotes(pageNumber, query, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;