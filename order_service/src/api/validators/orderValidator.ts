import { Joi } from "celebrate";

export default Joi.object().keys({
    _id: Joi.string()
        .required()
        .alphanum(),
    userName: Joi.string()
        .required()
        .alphanum(),
    order: Joi.array().required()
});
