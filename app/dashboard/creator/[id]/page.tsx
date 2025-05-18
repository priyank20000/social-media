import { mockUsers } from "@/lib/mock-data";
import { CreatorPageClient } from "./client";

export function generateStaticParams() {
  return mockUsers.map((user) => ({
    id: user.id,
  }));
}

export default function CreatorPage({ params }: { params: { id: string } }) {
  return <CreatorPageClient id={params.id} />;
}