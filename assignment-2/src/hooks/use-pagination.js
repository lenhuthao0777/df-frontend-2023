const usePagination = () => {
  const pagination = (data = [], page, limit) => {
    const trimStart = (page - 1) * limit;
    const trimEnd = trimStart + limit;
    const result = data.slice(trimStart || 0, trimEnd || data.length);
    const totalPage = Math.ceil(data.length / limit);
    return {
      data: result,
      totalPage,
      page
    };
  };

  return { pagination };
};

export default usePagination;
