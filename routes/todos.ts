import {Router} from 'express';
import {Todo} from '../models/todo'

const router = Router();

const todos: Todo[] = []
type RequestBody = { text: string};
type RequestParams = {todoId: string}

router.get('/', (req, res, next) => {
     res.status(200).json({ todos: todos });
});


router.post('/todo', (req, res, next)=>{
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo)
    res.status(200).json({message: " Added to Todo", todo:newTodo , todos:todos})
})

router.delete('/todo/:todoId',(req, res, next)=>{
    const params = req.params as RequestParams
    
    todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({message: " Todo deleted Succesfully", todos:todos})
})

router.put('/todo/:todoId',(req, res, next)=>{
    const body = req.body as RequestBody;
    const params = req.body as RequestParams;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex( (todo) => todo.id === todoId);
    if( todoIndex >=0){
        todos[todoIndex] = {id:todos[todoIndex].id, text: body.text};
        res.status(201).json({message: "Todo Updated", todos: todos})
    }
    res.status(404).json({message: " Could not find any todo items"})
})





export default router;