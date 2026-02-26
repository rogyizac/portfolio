type ProfileModule = {
  frontmatter: Record<string, any>;
  Content: any;
};

type ProfileEntry = {
  slug: string;
  frontmatter: Record<string, any>;
  Content: any;
};

const modules = import.meta.glob("../content/profiles/*.md", { eager: true });

export const allProfiles: ProfileEntry[] = Object.entries(modules).map(
  ([path, mod]) => {
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";
    const profile = mod as ProfileModule;
    return {
      slug,
      frontmatter: profile.frontmatter ?? {},
      Content: profile.Content,
    };
  }
);

export function getProfile(slug: string): ProfileEntry {
  const profile = allProfiles.find((entry) => entry.slug === slug);
  if (!profile) {
    throw new Error(`Profile not found: ${slug}`);
  }
  return profile;
}

export function getPublicProfiles(): ProfileEntry[] {
  return allProfiles.filter((entry) => entry.slug !== "main");
}
