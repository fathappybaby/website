/**
 * Film grid renderer — facade pattern with inline data.
 *
 * Films are declared inline below so the page works from file:// (just
 * double-click index.html) without needing a local HTTP server.
 *
 * To add, remove, or reorder a film: edit the VIDEOS array.
 * Order in the array = order on the page (top-to-bottom, left-to-right).
 */
const VIDEOS = [
    { title: "Junk Haulers",                     youtubeId: "mEnn8HIKH_A", trailerUrl: "https://www.youtube.com/watch?v=6BDx9pTJbZ0" },
    { title: "Dust and Reckoning",               youtubeId: "TeC0Sqw5HUQ", trailerUrl: "https://www.youtube.com/watch?v=CHEjWrB-SO4" },
    { title: "Lord of the Undead Directors Cut", youtubeId: "wOD4a1AsMAw", trailerUrl: "https://www.youtube.com/watch?v=X4nUmIhjxzk" },
    { title: "Ghost In Orion 9",                 youtubeId: "ULyuZ7eTPqA", trailerUrl: "https://www.youtube.com/watch?v=QTH0Lu-qfOY" },
    { title: "Lost And Found",                   youtubeId: "yN339ushFe0", trailerUrl: "https://www.youtube.com/watch?v=zVykxSv9UXQ" },
    { title: "Killing Dragons: A cookbook",      youtubeId: "L2UykahVvFo", trailerUrl: "https://www.youtube.com/watch?v=4gRHxJ_O7cY" },
    { title: "Rubber Head",                      youtubeId: "nJDrCf0tXFk", trailerUrl: "https://www.youtube.com/watch?v=jLpdTSHSNsc" },
    { title: "Unicorn Warrior",                  youtubeId: "NvP6vjMp8QA", trailerUrl: "https://www.youtube.com/watch?v=O2pujGARjnw" }
];

(function () {
    const container = document.getElementById("films");
    if (!container) return;

    const playSvg = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z"/></svg>`;

    for (const { title, youtubeId, trailerUrl } of VIDEOS) {
        container.appendChild(renderTile(title, youtubeId, trailerUrl, playSvg));
    }

    function renderTile(title, youtubeId, trailerUrl, playSvg) {
        const safeTitle = escapeHtml(title);
        const trailerLink = trailerUrl
            ? `<a class="film-trailer-link"
                  href="${escapeHtml(trailerUrl)}"
                  target="_blank"
                  rel="noopener">Trailer &nearr;</a>`
            : "";
        const tile = document.createElement("article");
        tile.className = "film-tile";
        tile.innerHTML = `
            <div class="film-player"
                 role="button"
                 tabindex="0"
                 aria-label="Play ${safeTitle}">
                <img src="https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg"
                     alt=""
                     loading="lazy">
                <div class="play-button">${playSvg}</div>
            </div>
            <h2 class="film-title">${safeTitle}${trailerLink}</h2>
        `;

        // Not every video has a maxres thumbnail — fall back to hqdefault.
        const img = tile.querySelector("img");
        img.addEventListener("error", () => {
            img.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
        }, { once: true });

        const player = tile.querySelector(".film-player");
        let activated = false;
        const activate = () => {
            if (activated) return;
            activated = true;
            player.innerHTML = `
                <iframe
                    src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0"
                    title="${safeTitle}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"></iframe>
            `;
            player.removeAttribute("role");
            player.removeAttribute("tabindex");
            player.style.cursor = "default";
        };

        player.addEventListener("click", activate);
        player.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
            }
        });

        return tile;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c]));
    }
})();
