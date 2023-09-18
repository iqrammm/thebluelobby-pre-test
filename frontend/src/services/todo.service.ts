import axios from "axios";
import { ApiResponseTodoList, CreateTodoInput, TodoStatus } from "../types/todo";
import { HttpMethod } from "types";
import config from "config";

axios.defaults.baseURL = config.apiUrl;

export const getTodos = async (
  take: number,
  page: number,
  status: TodoStatus | null
): Promise<ApiResponseTodoList> => {
  return axios({
    method: HttpMethod.GET,
    url: "/todos",
    params: {
      take,
      page,
      ...(status && { status })
    }
  }).then((result) => result.data);
};

export const createTodo = async (data: CreateTodoInput) => {
  return axios({
    method: HttpMethod.POST,
    url: "/todos",
    data
  }).then((result) => result.data);
};

export const updateTodo = async (data: CreateTodoInput, id?: string) => {
  return axios({
    method: HttpMethod.PATCH,
    url: `/todos/${id}`,
    data
  }).then((result) => result.data);
};

export const updateTodoStatus = async (id: string, todoStatus: TodoStatus) => {
  return axios({
    method: HttpMethod.PATCH,
    url: `/todos/status/${id}`,
    data: {
      status: todoStatus
    }
  }).then((result) => result.data);
};

export const deleteTodo = async (id: string) => {
  return axios({
    method: HttpMethod.DELETE,
    url: `/todos/${id}`
  }).then((result) => result.data);
};
