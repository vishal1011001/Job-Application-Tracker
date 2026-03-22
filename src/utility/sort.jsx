const sortByValue = (isAscending, jobs, field) => {
  return [...jobs].sort((a,b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return isAscending ? valueA - valueB : valueB - valueA;
    }

    const comparison = valueA.localeCompare(valueB);
    return isAscending ? comparison : -comparison;
  });
};

export {sortByValue};