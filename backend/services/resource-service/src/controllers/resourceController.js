import asyncHandler from "../utils/asyncHandler.js";
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../services/resourceService.js";

export const create = asyncHandler(async (req, res) => {
  const resource = await createResource(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Resource created successfully",
    data: resource,
  });
});

export const findAll = asyncHandler(async (req, res) => {
  const result = await getResources(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const findOne = asyncHandler(async (req, res) => {
  const resource = await getResourceById(req.params.id);

  res.status(200).json({
    success: true,
    data: resource,
  });
});

export const update = asyncHandler(async (req, res) => {
  const resource = await updateResource(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Resource updated successfully",
    data: resource,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteResource(req.params.id);

  res.status(200).json({
    success: true,
    message: "Resource deleted successfully",
  });
});
