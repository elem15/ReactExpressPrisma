import { Employee } from '@prisma/client';
import { api } from './api';

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/employees/remove/${id}`,
        method: 'DELETE',
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/update`,
        method: 'PUT',
        body: employee,
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/create`,
        method: 'POST',
        body: employee,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
} = employeesApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    addEmployee,
  },
} = employeesApi;
