"use server";

import getCollection, { LINKS_COLLECTION } from "@/lib/db";

function isValidUrl(input: string): boolean {
    try {
        const url = new URL(input);
        return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
    } catch {
        return false;
    }
}

export default async function createShortLink(
    url: string,
    alias: string,
): Promise<{ alias?: string; error?: string }> {
    if (!isValidUrl(url)) {
        return { error: "Please enter a valid URL." };
    }

    // Only allow characters that are safe in a URL path.
    if (!/^[a-zA-Z0-9_-]+$/.test(alias)) {
        return { error: "Alias may only contain letters, numbers, dashes, and underscores." };
    }

    const linksCollection = await getCollection(LINKS_COLLECTION);

    const existing = await linksCollection.findOne({ alias: alias });
    if (existing) {
        return { error: "That alias is already taken." };
    }

    await linksCollection.insertOne({ alias: alias, url: url });

    return { alias: alias };
}
