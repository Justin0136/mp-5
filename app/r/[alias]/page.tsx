import { notFound, redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "@/lib/db";

export default async function RedirectPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const link = await linksCollection.findOne({ alias: alias });

    if (!link) {
        notFound();
    }

    redirect(link.url);
}
