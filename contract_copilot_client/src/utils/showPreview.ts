export const showPreview = (content: string, previewLength: number = 10) => {
  const preview =
    content.length > previewLength
      ? content.slice(0, previewLength) + "..."
      : content;

  return preview;
};
