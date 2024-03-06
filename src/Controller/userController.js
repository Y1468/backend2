import { prisma } from "../Prisma"

class UserController{
    async CreateUser(req,res){
   
        try {
    
         const {name,email}=req.body
         let user=await prisma.user.findUnique({where:{email}})
    
         if (user) {
            return res.json({error:"Ja existe um usuario com este email"})
         }
         user=await prisma.user.create({
            data:{
                name,
                email,
            },
        })
         return res.json(user)

        } catch (error) {
            return res.json({error})
        }
    }

    async findAllUser(req,res){
      //Listando usuarios
        try {

          const user=await prisma.user.findMany()
          return res.json(user)

        } catch (error) {
          return res.json({error})
        }
    }

    async findAllUserList(req,res){
        //Listando um unico usuario
          try {
            const {id}=req.params
            const user=await prisma.user.findUnique({where:{id:Number(id)}})
            return res.json(user)
  
          } catch (error) {
            return res.json({error})
          }
      }

      async updateUser(req,res){
        try {
          const {id}=req.params
          const {name,email}=req.body

          let user=await prisma.user.findUnique({where:{id:Number(id)}})

          if (!user) {
            return res.json({error:'Não foi possivel emcontra esse usuario'})
          }

          user=await prisma.user.update({
            where:{id: Number(id)},
            data:{name,email}
          })

          return res.json(user)

        } catch (error) {
          return res.json({error})
        }
      }

      async userDelite(req,res){
         try {
            const {id}=req.params

            let user=await prisma.user.findUnique({where:{id: Number(id)}})

            if (!user) {
              return res.json({error:'Não foi possivel emcontra esse usuario'})
            }

            await prisma.user.delete({where:{id:Number(id)}})
            return res.json({message:'Usuario deletado com sucesso'})

         } catch (error) {
            return res.json({error})
         }
      }
    
}

export {UserController}
