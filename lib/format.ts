export const fmt = (n: number) => new Intl.NumberFormat("fr-BE").format(n);

export const fmtDate = (d: string) =>
  d
    ? new Date(d).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" })
    : "Date à venir";

/** Convertit un lien YouTube classique en lien « embed ». */
export function toEmbed(url: string): string {
  if (!url) return url;
  if (/youtube\.com\/watch\?v=/.test(url)) return url.replace("watch?v=", "embed/").split("&")[0];
  if (/youtu\.be\//.test(url)) return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1].split("?")[0];
  if (/vimeo\.com\/(\d+)/.test(url) && !url.includes("player.vimeo"))
    return "https://player.vimeo.com/video/" + url.match(/vimeo\.com\/(\d+)/)![1];
  return url;
}
