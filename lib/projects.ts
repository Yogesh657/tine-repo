import { client } from '../tina/__generated__/client';

export interface Project {
  id: string
  title: string
  description: string
  descriptionJa: string
  image: string
  link: string
  number: string
}

export interface Category {
  slug: string
  name: string
}

const queryMap: Record<string, any> = {
    "genai": client.queries.genai,
    "datascience": client.queries.datascience
};

export const CATEGORIES: Record<string, Category> = {
  genai: {
    slug: "genai",
    name: "GenAI",
  },
  datascience: {
    slug: "datascience",
    name: "Data Science"
  },
}

export async function getAllProjectTitlesByCategory(category: string) {
  const normalized = category.toLowerCase();

  const queryMap: Record<string, any> = {
    genai: client.queries.genaiConnection,
    datascience: client.queries.datascienceConnection,
  };

  const query = queryMap[normalized];
  if (!query) {
    return [];
  }

  const { data } = await query();
  const edges = data?.[`${normalized}Connection`]?.edges;

  if (!edges) return [];

  return edges.map((edge: any, index: number) => ({
    id: edge?.node?._sys?.filename || "",
    title: edge?.node?.title || "",
    number: index + 1,
  }));
}


export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug.toLowerCase()]
}

export async function getProjectById(category: string, id: string) {
  try {
    const query = queryMap[category];
    if (!query) return null;

    const response = await query({
      relativePath: `${id}.md`
    });

    const projectData = response.data[category];
    if (!projectData) return null;

    return {
      id: projectData._sys?.filename || "",
      title: projectData.title || "",
      description: projectData.description,
      images: projectData.screenshots || [],
      deployLink: projectData.deployLink || "",
      repoLink: projectData.repoLink || "",
      techStack: projectData.techStack || [],
      owners: projectData.owners || [],
      startDate: projectData.startDate || "",
      endDate: projectData.endDate || ""
    };

  } catch (err) {
    console.error("Project not found:", err);
    return null;
  }
}
