"use client";

import { useState } from "react";
import createShortLink from "@/app/actions/createShortLink";

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    return (
        <form
            className="shorten-form"
            onSubmit={(event) => {
                event.preventDefault();
                setError("");
                setShortUrl("");

                createShortLink(url, alias)
                    .then((result) => {
                        if (result.error) {
                            setError(result.error);
                        } else {
                            setShortUrl(`${window.location.origin}/r/${result.alias}`);
                        }
                    })
                    .catch(() => setError("Could not save link."));
            }}
        >
            <label htmlFor="url">URL</label>
            <input
                id="url"
                type="text"
                value={url}
                placeholder="https://example.com"
                onChange={(event) => setUrl(event.target.value)}
                required
            />

            <label htmlFor="alias">Alias</label>
            <input
                id="alias"
                type="text"
                value={alias}
                placeholder="my-link"
                onChange={(event) => setAlias(event.target.value)}
                required
            />

            <button type="submit">Shorten</button>

            {error && <p className="error">{error}</p>}
            {shortUrl && (
                <p className="result">
                    Your short URL: <a href={shortUrl}>{shortUrl}</a>
                </p>
            )}
        </form>
    );
}