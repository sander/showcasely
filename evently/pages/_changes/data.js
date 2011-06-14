function(data) {
  return {
    pages : data.rows.map(function(r) {
      return {
        id: r.key,
        title: r.value
      };
    })
  }
};
