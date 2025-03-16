 export const BASE_URL = 'http://localhost:3001';

export const API_URL = {
    singUp: BASE_URL+'/user/sign-up',
    singIn: BASE_URL+'/user/sign-in',
    addTag: BASE_URL+'/tag/add',
    getTags: BASE_URL+'/tag/list',
    getAllTagList: BASE_URL+'/user/tag-list-all',
    deleteTag: BASE_URL+'/tag/delete',
    updateTag: BASE_URL+'/tag/update',
    addTodo: BASE_URL+'/todo/add',
    getTodo: BASE_URL+'/user/todo-list',
    deleteTodo: BASE_URL+'/todo/delete',
    updateTodo: BASE_URL+'/todo/update',
};