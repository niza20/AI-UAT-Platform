import api from "./api";

export async function getLatestProject() {

    const projects = await api.get("/projects");

    if (projects.data.length === 0)
        return null;

    const latest =
        projects.data[projects.data.length - 1];

    const res = await api.get(
        `/projects/${latest.project_id}`
    );

    return res.data;
}