import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "genai",
        label: "GenAI",
        path: "content/genai",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Project Description",
            required: true,
          },
          {
            name: "screenshots",
            label: "Screenshots",
            type: "image",
            list: true
          },
          {
            name: "techStack",
            label: "Tech Stack",
            type: "string",
            list: true,
            required: true
          },
          {
            name: "owners",
            label: "Owners",
            type: "string",
            list: true
          },
          { name: "startDate", label: "Start Date", type: "datetime" },
          { name: "endDate", label: "End Date", type: "datetime" },
          { name: "deployLink", label: "Deployment Link", type: "string" },
          { name: "repoLink", label: "Repo Link", type: "string", required: true }
        ]
      },
      {
        name: "datascience",
        label: "Data Science",
        path: "content/datascience",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Project Description",
            required: true,
          },
          {
            name: "screenshots",
            label: "Screenshots",
            type: "image",
            list: true
          },
          {
            name: "techStack",
            label: "Tech Stack",
            type: "string",
            list: true,
            required: true
          },
          {
            name: "owners",
            label: "Owners",
            type: "string",
            list: true
          },
          { name: "startDate", label: "Start Date", type: "datetime" },
          { name: "endDate", label: "End Date", type: "datetime" },
          { name: "deployLink", label: "Deployment Link", type: "string" },
          { name: "repoLink", label: "Repo Link", type: "string", required: true }
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
