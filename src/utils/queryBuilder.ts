type QueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  excludeFields?: string[];
};

export const buildQueryOptions = (params: QueryParams) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    excludeFields = ["_id", "__v"],
  } = params;

  // pagination
  const skip = (page - 1) * limit;

  // sorting
  const sort: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  // projection
  const projection: Record<string, number> = {};
  excludeFields.forEach((field) => {
    projection[field] = 0;
  });

  return {
    skip,
    limit,
    sort,
    projection,
    page,
  };
};
