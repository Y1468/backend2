import { prisma } from "../Prisma"

class AdcionePostController{
    
    async createPost(req,res){

        const {title,published}=req.body;
        const {id}=req.params;

        try {
            const user=await prisma.user.findUnique({where:{id:Number(id)}})

            if (!user) {
              return res.json({message:'Usuario inesistaente'})
            }

            const post=await prisma.post.create({
                 data:{
                    title,
                    published,
                    authorId:user.id
                 }  
            })
            
            return res.json(post)

        } catch (error) {
            return res.json({message:error.message})
        }
  }

   async listPost(req,res){
      try {

        const posts=await prisma.post.findMany()
        return res.json(posts)

      } catch (error) {
        return res.json({error})
      }

   }

   async updatePost(req,res){

        const {id}=req.params
        const {title}=req.body

       try {
         const post=await prisma.post.findUnique({where:{id:Number(id)}})

         if (!post) {
            return res.json({message:'post inesistente'})
         }

         await prisma.post.update({
            where:{id:Number(id)},
            data:{title}
         })
          return res.json({message:'Post atualizado'})
       } catch (error) {
          return res.json({error:error.message})
       }
   }

       async deletPost(req,res){

           try {
            const {id}=req.params
            const postar=await prisma.post.findUnique({where:{id:Number(id)}})

            if (!postar) {
             return res.json({error:'Post não emcontrado'})
            }

             await prisma.post.delete({where:{id:Number(id)}})

             return res.json({message:'post deletado com sucesso'})

           } catch (error) {
              return res.json({error})
           }
       }
}
  
  export {AdcionePostController}