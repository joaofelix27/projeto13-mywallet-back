import loginSchema from "../schemas/loginSchema.js"; 

function validateLogin (req,res,next) {

      const { error } = loginSchema.validate(req.body);
    
      if (error) {
        return res.sendStatus(422);
      }
      next ()

}

export default validateLogin;

