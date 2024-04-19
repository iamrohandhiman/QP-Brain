//sort based on preference
export const sort_cluster = (prepCluster) => {
  let sortPrepCluster = prepCluster.sort((a, b) => b.preference - a.preference);
  return sortPrepCluster;
}