import { api } from 'src/services/api';
import type { LessonResponse } from 'src/services/lesson/lesson.dto';
import type { SectionResponse } from 'src/services/section/section.dto';

export const sectionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSectionLessons: build.query<LessonResponse[], string>({
      query: (id) => ({
        url: `/section/lessons/${id}`,
        method: 'GET',
      }),
      forceRefetch: () => true,
      providesTags: (result, _error, id) => (result ? [{ type: 'Section', id }] : [{ type: 'Section', id: 'LIST' }]),
    }),
    getSectionById: build.query<SectionResponse, string>({
      query: (id) => ({
        url: `/section/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'Section', id: result.id }] : [{ type: 'Section', id: 'LIST' }]),
    }),
  }),
});

export const { useGetSectionLessonsQuery, useGetSectionByIdQuery } = sectionApi;
