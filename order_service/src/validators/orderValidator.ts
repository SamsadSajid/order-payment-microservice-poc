import { Joi } from "celebrate";

export default Joi.object().keys({
    id: Joi.string()
        .required()
        .alphanum(),
    userName: Joi.string()
        .required()
        .alphanum(),
    order: Joi.array().required()
});
