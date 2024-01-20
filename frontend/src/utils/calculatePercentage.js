export const calculatePercentage = (content) => {
  const totalTopics = content?.reduce((acc, curr) => {
    return [...acc, ...curr.topics];
  }, []);

  const markedAsDoneTopics = totalTopics.reduce(
    (acc, curr) => (curr.markAsDone ? acc + 1 : acc),
    0
  );

  return ((markedAsDoneTopics / totalTopics.length) * 100).toFixed(0);
};
