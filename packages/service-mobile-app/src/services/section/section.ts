import { api } from 'src/services/api';
import { LessonResponse } from 'src/services/lesson/lesson.dto';
import { SectionResponse } from 'src/services/section/section.dto';

export const sectionApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSectionLessons: build.query<LessonResponse[], string>({
			query: (id) => ({
				url: `/section/lessons/${id}`,
				method: 'GET',
			}),
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
