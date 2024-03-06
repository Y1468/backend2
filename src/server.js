import { route } from './route'
const exp=require('express')

const app=exp()
app.use(exp.json())
app.use(route)

app.listen(3333,()=>console.log('Servidor online'))