const useExtractSectionId = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const sectionId = queryParams.get('sectionId');

  return { sectionId };
};

export default useExtractSectionId;
