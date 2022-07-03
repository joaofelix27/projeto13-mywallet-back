import registerSchema from "../schemas/registerSchema.js";

function validateRegister (req,res,next) {

    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.sendStatus(422)
    }

    next ()
}

export default validateRegister;