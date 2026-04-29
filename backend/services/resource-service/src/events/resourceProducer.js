import kafkaClient from "../config/kafka.js";

export const publishResourceCreated = async (resource) => {
  await kafkaClient.publish("resource.created", {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    status: resource.status,
    createdAt: resource.createdAt,
  });
};

export const publishResourceUpdated = async (resource) => {
  await kafkaClient.publish("resource.updated", {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    status: resource.status,
    updatedAt: resource.updatedAt,
  });
};

export const publishResourceDeleted = async (resource) => {
  await kafkaClient.publish("resource.deleted", {
    id: resource.id,
    name: resource.name,
    deletedAt: new Date(),
  });
};
