import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllProjects() {
  const projectsDirectory = path.join(contentDirectory, 'projects');

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || name.replace(/\.md$/, ''),
        content,
        ...data,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return allProjectsData;
}

export function getProjectBySlug(slug) {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  const projects = getAllProjects();
  return projects.filter((project) => project.featured);
}

export function getProjectsByTechnology(technology) {
  const projects = getAllProjects();
  return projects.filter(
    (project) => project.technologies && project.technologies.includes(technology)
  );
}

export function getProjectsByStatus(status) {
  const projects = getAllProjects();
  return projects.filter((project) => project.status === status);
}

export function filterProjects(projects, filters) {
  if (!filters || filters.length === 0) {
    return projects;
  }

  return projects.filter((project) => {
    return filters.every((filter) => {
      if (filter.type === 'technology') {
        return project.technologies && project.technologies.includes(filter.value);
      }
      if (filter.type === 'status') {
        return project.status === filter.value;
      }
      return true;
    });
  });
}

export function getAllTechnologies() {
  const projects = getAllProjects();
  const technologies = new Set();

  projects.forEach((project) => {
    if (project.technologies) {
      project.technologies.forEach((tech) => technologies.add(tech));
    }
  });

  return Array.from(technologies).sort();
}
