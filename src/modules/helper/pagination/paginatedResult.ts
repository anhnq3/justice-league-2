export const paginatedResult = (model, page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);
  // Start Index it's a start pge
  const startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  if (!limit) endIndex = model.length;
  const resultModel = model.slice(startIndex, endIndex);
  const result = {
    pages: Math.ceil(model.length / limit),
    next: null,
    index: { page, limit },
    previous: null,
    result: resultModel,
  };
  if (startIndex > 0)
    result.previous = {
      page: new Number(page - 1),
      limit: new Number(limit),
    };
  if (endIndex < model.length)
    result.next = {
      page: new Number(page + 1),
      limit: new Number(limit),
    };
  return result;
};
