const filterItems = (items, searchTerm, fieldsToSearch = [], filters = {}) => {
  return items.filter((item) => {
    const matchesSearch = fieldsToSearch.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (value === "") return true;

      const field = item[key];

      if (typeof field === "object" && field !== null && "nombre" in field) {
        return field.nombre === value;
      }

      return field === value;
    });

    return matchesSearch && matchesFilters;
  });
};

export default filterItems;
