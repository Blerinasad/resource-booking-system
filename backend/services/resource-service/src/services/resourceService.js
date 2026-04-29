import { Op } from "sequelize";
import Resource from "../models/resourceModel.js";
import ApiError from "../utils/ApiError.js";
import {
  publishResourceCreated,
  publishResourceUpdated,
  publishResourceDeleted,
} from "../events/resourceProducer.js";

export const createResource = async (data, userId) => {
  const resource = await Resource.create({
    name: data.name,
    type: data.type,
    capacity: data.capacity ?? null,
    location: data.location,
    status: data.status || "available",
    description: data.description || null,
    createdBy: userId,
  });

  await publishResourceCreated(resource);

  return resource;
};

export const getResources = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};

  if (query.type) where.type = query.type;
  if (query.status) where.status = query.status;

  if (query.location) {
    where.location = { [Op.like]: `%${query.location}%` };
  }

  if (query.search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${query.search}%` } },
      { location: { [Op.like]: `%${query.search}%` } },
      { description: { [Op.like]: `%${query.search}%` } },
    ];
  }

  const { rows, count } = await Resource.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    resources: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const getResourceById = async (id) => {
  const resource = await Resource.findByPk(id);

  if (!resource) {
    throw new ApiError(404, "Resource not found.");
  }

  return resource;
};

export const updateResource = async (id, data) => {
  const resource = await getResourceById(id);

  await resource.update({
    name: data.name ?? resource.name,
    type: data.type ?? resource.type,
    capacity: data.capacity ?? resource.capacity,
    location: data.location ?? resource.location,
    status: data.status ?? resource.status,
    description: data.description ?? resource.description,
  });

  await publishResourceUpdated(resource);

  return resource;
};

export const deleteResource = async (id) => {
  const resource = await getResourceById(id);

  await publishResourceDeleted(resource);
  await resource.destroy();

  return true;
};
