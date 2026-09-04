// Deterministic "initials" avatar — no network call, no bundled image files.
// Same name+seed always produces the same picture (color + initials), so it
// behaves like a real per-row image without depending on pravatar.cc or a
// backend field that doesn't exist yet.

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#dc2626', '#d97706', '#16a34a', '#0891b2'];

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function getInitials(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');
}

// Returns a data: URI — pass it straight to <img src={...}>.
export function initialsAvatar(name, seed = name) {
    const initials = getInitials(name) || '?';
    const color = AVATAR_COLORS[hashString(seed) % AVATAR_COLORS.length];

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect width="64" height="64" rx="32" fill="${color}" />
        <text x="32" y="33" text-anchor="middle" dominant-baseline="central"
              font-family="system-ui, sans-serif" font-size="24" fill="white" font-weight="600">${initials}</text>
    </svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
