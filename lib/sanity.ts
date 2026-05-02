import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "wijsap5p", // Sanity panelinde veya sanity.cli.ts dosyasında yazar
  dataset: "production",
  apiVersion: "2024-05-01",
  useCdn: false, // Veriyi anlık çekmek için şimdilik false kalsın
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}