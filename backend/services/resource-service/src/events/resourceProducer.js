import {publishEvent} from "../config/kafka.js";

export const publishResourceCreated = async (resource) => {
  await publishEvent("resource.created", {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    status: resource.status,
    createdAt: resource.createdAt,
  });
};

export const publishResourceUpdated = async (resource) => {
  await publishEvent("resource.updated", {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    status: resource.status,
    updatedAt: resource.updatedAt,
  });
};

export const publishResourceDeleted = async (resource) => {
  await publishEvent("resource.deleted", {
    id: resource.id,
    name: resource.name,
    deletedAt: new Date(),
  });
};
