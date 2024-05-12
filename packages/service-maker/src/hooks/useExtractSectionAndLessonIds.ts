const useExtractSectionAndLessonIds = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const sectionId = queryParams.get('sectionId');
  const lessonId = queryParams.get('lessonId');

  return { sectionId, lessonId };
};

export default useExtractSectionAndLessonIds;
